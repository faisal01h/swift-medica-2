import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import PatientInfo from '@/Components/PatientInfo';

export default function Create({ rooms }) {
    const { t } = useTranslation();
    const form = useForm({ 
        patient_id: null, 
        admission_date: new Date().toISOString().slice(0, 16), // today
        discharge_date: '', 
        room_id: null, 
        notes: '',
        visit_type: null,
        type: null
    });
    const [showPatientDialog, setShowPatientDialog] = useState(false);
    // State for patients dropdown lazy loading
    const [patientOptions, setPatientOptions] = useState([]);
    const [totalPatients, setTotalPatients] = useState(0);
    const [lazyParams, setLazyParams] = useState({ first: 0, rows: 20, filter: '' });
    // Find the currently selected patient
    const selectedPatient = patientOptions.find(p => p.id === form.data.patient_id);
    const newPatientForm = useForm({ name: '', email: '', phone: '', date_of_birth: '', identity_number: '', gender: null, address: '' });

    // Load patients from server (page = first/rows + 1)
    const loadPatientsLazy = (event) => {
        const { first, rows } = event;
        const page = first / rows + 1;
        setLazyParams((prev) => ({ ...prev, first, rows }));
        axios.get(route('patients.fetch'), { params: { page, filter: lazyParams.filter } })
            .then(res => {
                const list = res.data.data.map(p => ({ label: p.name, value: p.id }));
                setPatientOptions(first === 0 ? list : [...patientOptions, ...list]);
                setTotalPatients(res.data.total);
            });
    };
    // Handle filter input
    const onPatientFilter = (e) => {
        const filter = e.filter;
        setLazyParams({ first: 0, rows: lazyParams.rows, filter });
        axios.get(route('patients.fetch'), { params: { page: 1, filter } })
            .then(res => {
                const list = res.data.data.map(p => ({ label: p.name, value: p.id }));
                setPatientOptions(list);
                setTotalPatients(res.data.total);
            });
    };

    // Initial load
    useEffect(() => {
        loadPatientsLazy(lazyParams);
    }, []);

    const submit = e => {
        e.preventDefault();
        form.post(route('admissions.store'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight">{t('admission.newAdmission')}</h2>}>
            <Head title={t('admission.newAdmission')} />
            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="space-y-6 bg-white shadow rounded-lg p-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('admission.patient')}</label>
                        <div className="flex items-center space-x-2">
                            <Dropdown
                                filter
                                filterBy="label"
                                value={form.data.patient_id}
                                options={patientOptions}
                                onChange={e => form.setData('patient_id', e.value)}
                                placeholder={t('admission.selectPatient')}
                                className="w-full"
                                onFilter={onPatientFilter}
                                virtualScrollerOptions={{
                                    lazy: true,
                                    itemSize: 40,
                                    onLazyLoad: loadPatientsLazy,
                                    showLoader: true,
                                    totalrecords: totalPatients
                                }}
                            />
                            <Button type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center w-56" onClick={() => setShowPatientDialog(true)}>
                                <AiOutlinePlusCircle className="mr-2" />{t('admission.addNewPatient')}
                            </Button>
                        </div>
                        {/* display patient error */}
                        {form.errors.patient_id && <div className="text-red-600 text-sm mt-1">{form.errors.patient_id}</div>}
                        {selectedPatient && (
                            <PatientInfo patient={selectedPatient} />
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('admission.admissionType')}</label>
                        <Dropdown
                            value={form.data.type}
                            options={[
                                { label: t('admission.sick'), value: 'sick' },
                                { label: t('admission.wellness'), value: 'wellness' },
                            ]}
                            onChange={e => form.setData('type', e.value)}
                            placeholder={t('admission.selectType')}
                            className="w-full"
                        />
                        {form.errors.type && <div className="text-red-600 text-sm mt-1">{form.errors.type}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('admission.admissionVisitType')}</label>
                        <Dropdown
                            value={form.data.visit_type}
                            options={[
                                { label: t('admission.outpatient'), value: 'outpatient' },
                                { label: t('admission.inpatient'), value: 'inpatient' },
                            ]}
                            onChange={e => form.setData('visit_type', e.value)}
                            placeholder={t('admission.selectVisitType')}
                            className="w-full"
                        />
                        {form.errors.visit_type && <div className="text-red-600 text-sm mt-1">{form.errors.visit_type}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('admission.admissionDate')}</label>
                        <input
                            type="datetime-local"
                            value={form.data.admission_date}
                            onChange={e => form.setData('admission_date', e.target.value)}
                            className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${form.errors.admission_date ? 'border-red-600' : ''}`} />
                        {form.errors.admission_date && <div className="text-red-600 text-sm mt-1">{form.errors.admission_date}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('admission.dischargeDate')}</label>
                        <input
                            type="datetime-local"
                            value={form.data.discharge_date}
                            onChange={e => form.setData('discharge_date', e.target.value)}
                            className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${form.errors.discharge_date ? 'border-red-600' : ''}`} />
                        {form.errors.discharge_date && <div className="text-red-600 text-sm mt-1">{form.errors.discharge_date}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('admission.room')}</label>
                        <Dropdown
                            filter
                            value={form.data.room_id}
                            options={rooms.map(r => ({ label: r.name, value: r.id }))}
                            onChange={e => form.setData('room_id', e.value)}
                            placeholder={t('admission.selectRoom')}
                            className="w-full" />
                        {form.errors.room_id && <div className="text-red-600 text-sm mt-1">{form.errors.room_id}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('admission.notes')}</label>
                        <textarea
                            value={form.data.notes}
                            onChange={e => form.setData('notes', e.target.value)}
                            className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${form.errors.notes ? 'border-red-600' : ''}`}
                            rows={3} />
                        {form.errors.notes && <div className="text-red-600 text-sm mt-1">{form.errors.notes}</div>}
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" className="p-button-primary" disabled={form.processing}>
                            {t('admission.create')}
                        </Button>
                    </div>
                </form>
                <Dialog header={t('admission.newPatient')} visible={showPatientDialog} style={{ width: '450px' }} onHide={() => setShowPatientDialog(false)}>
                    <form 
                        onSubmit={e => {
                            e.preventDefault();
                            newPatientForm.post(route('patients.store'), {
                                onSuccess: () => {
                                    setShowPatientDialog(false);
                                    router.reload();
                                }
                            });
                        }} 
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('patient.name')}</label>
                            <InputText value={newPatientForm.data.name} onChange={e => newPatientForm.setData('name', e.target.value)} className="w-full" />
                            {newPatientForm.errors.name && <div className="text-red-600 text-sm mt-1">{newPatientForm.errors.name}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('patient.gender')}</label>
                            <Dropdown
                                filter
                                value={newPatientForm.data.gender}
                                options={[
                                    { label: t('patient.male'), value: 'male' },
                                    { label: t('patient.female'), value: 'female' }
                                ]}
                                onChange={e => newPatientForm.setData('gender', e.value)}
                                placeholder={t('patient.selectGender')}
                                className="w-full" />
                            {newPatientForm.errors.gender && <div className="text-red-600 text-sm mt-1">{newPatientForm.errors.gender}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('patient.email')}</label>
                            <InputText value={newPatientForm.data.email} onChange={e => newPatientForm.setData('email', e.target.value)} className="w-full" />
                            {newPatientForm.errors.email && <div className="text-red-600 text-sm mt-1">{newPatientForm.errors.email}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('patient.phone')}</label>
                            <InputText value={newPatientForm.data.phone} onChange={e => newPatientForm.setData('phone', e.target.value)} className="w-full" />
                            {newPatientForm.errors.phone && <div className="text-red-600 text-sm mt-1">{newPatientForm.errors.phone}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('patient.dateOfBirth')}</label>
                            <input type="date" value={newPatientForm.data.date_of_birth} onChange={e => newPatientForm.setData('date_of_birth', e.target.value)} className="w-full border border-gray-300 rounded p-1" />
                            {newPatientForm.errors.date_of_birth && <div className="text-red-600 text-sm mt-1">{newPatientForm.errors.date_of_birth}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('patient.identityNumber')}</label>
                            <InputText value={newPatientForm.data.identity_number} onChange={e => newPatientForm.setData('identity_number', e.target.value)} className="w-full" />
                            {newPatientForm.errors.identity_number && <div className="text-red-600 text-sm mt-1">{newPatientForm.errors.identity_number}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('patient.address')}</label>
                            <InputText value={newPatientForm.data.address} onChange={e => newPatientForm.setData('address', e.target.value)} className="w-full" />
                            {newPatientForm.errors.address && <div className="text-red-600 text-sm mt-1">{newPatientForm.errors.address}</div>}
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" className="p-button-primary" disabled={newPatientForm.processing}>
                                {t('save')}
                            </Button>
                        </div>
                    </form>
                </Dialog>
            </div>
        </AuthenticatedLayout>
    );
}
