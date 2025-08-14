import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

export default function Edit({ admission, patients, rooms }) {
    const form = useForm({
        patient_id: admission.patient_id,
        admission_date: admission.admission_date,
        discharge_date: admission.discharge_date || '',
        room_id: admission.room_id,
        notes: admission.notes || '',
    });

    const submit = (e) => {
        e.preventDefault();
        form.put(route('admissions.update', admission.id));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight">Edit Admission</h2>}>
            <Head title="Edit Admission" />
            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="space-y-6 bg-white shadow rounded-lg p-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Patient</label>
                        <Dropdown
                            value={form.data.patient_id}
                            options={patients.map(p => ({ label: p.name, value: p.id }))}
                            onChange={(e) => form.setData('patient_id', e.value)}
                            placeholder="Select a Patient"
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Admission Date</label>
                        <input
                            type="datetime-local"
                            value={form.data.admission_date}
                            onChange={(e) => form.setData('admission_date', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Discharge Date</label>
                        <input
                            type="datetime-local"
                            value={form.data.discharge_date}
                            onChange={(e) => form.setData('discharge_date', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Room</label>
                        <Dropdown
                            value={form.data.room_id}
                            options={rooms.map(r => ({ label: r.name, value: r.id }))}
                            onChange={(e) => form.setData('room_id', e.value)}
                            placeholder="Select a Room"
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                            value={form.data.notes}
                            onChange={(e) => form.setData('notes', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            rows={3}
                        />
                    </div>
                    <div>
                        <Button type="submit" label="Update" className="p-button-primary" disabled={form.processing} />
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
