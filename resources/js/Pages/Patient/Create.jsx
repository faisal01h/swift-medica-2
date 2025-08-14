import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { useTranslation } from 'react-i18next';

export default function Create() {
    const { t } = useTranslation();
    const form = useForm({
        name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        identity_number: '',
        gender: '',
        address: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
    });

    const submit = (e) => {
        e.preventDefault();
        router.post(route('patients.store'), form.data);
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight">{t('newPatient')}</h2>}>
            <Head title={t('newPatient')} />
            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="space-y-6 bg-white shadow rounded-lg p-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('patient.name')}</label>
                            <InputText
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('patient.email')}</label>
                            <InputText
                                value={form.data.email}
                                onChange={(e) => form.setData('email', e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('patient.phone')}</label>
                            <InputText
                                value={form.data.phone}
                                onChange={(e) => form.setData('phone', e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('patient.dateOfBirth')}</label>
                            <input
                                type="date"
                                value={form.data.date_of_birth}
                                onChange={(e) => form.setData('date_of_birth', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('patient.identityNumber')}</label>
                            <InputText
                                value={form.data.identity_number}
                                onChange={(e) => form.setData('identity_number', e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('patient.gender')}</label>
                            <Dropdown
                                value={form.data.gender}
                                options={[
                                    { label: t('patient.male'), value: 'male' },
                                    { label: t('patient.female'), value: 'female' }
                                ]}
                                onChange={(e) => form.setData('gender', e.value)}
                                placeholder={t('patient.selectGender')}
                                className="w-full"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">{t('patient.address')}</label>
                            <InputTextarea
                                value={form.data.address}
                                onChange={(e) => form.setData('address', e.target.value)}
                                className="w-full"
                                rows={2}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('patient.emergencyContactName')}</label>
                            <InputText
                                value={form.data.emergency_contact_name}
                                onChange={(e) => form.setData('emergency_contact_name', e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('patient.emergencyContactPhone')}</label>
                            <InputText
                                value={form.data.emergency_contact_phone}
                                onChange={(e) => form.setData('emergency_contact_phone', e.target.value)}
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            label={t('save')}
                            className="p-button-primary"
                            disabled={form.processing}
                        />
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
