import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Show({ admission }) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight">Admission Details</h2>}>
            <Head title="Admission Details" />
            <div className="py-6 px-4 sm:px-6 lg:px-8 bg-white shadow rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-lg font-medium">Patient</h3>
                        <p>{admission.patient.name}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Admission Date</h3>
                        <p>{admission.admission_date}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Discharge Date</h3>
                        <p>{admission.discharge_date || '-'}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Room</h3>
                        <p>{admission.room.name}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-medium">Notes</h3>
                    <p>{admission.notes || '-'}</p>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-medium">Doctors</h3>
                    <ul className="list-disc list-inside">
                        {admission.doctors.map(doc => (
                            <li key={doc.id}>{doc.name}: {doc.pivot.notes}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
