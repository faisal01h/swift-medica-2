import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { AiOutlinePlus, AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LiveIndicator from '@/Components/LiveIndicator';

export default function Index() {
    const [admissions, setAdmissions] = useState([]);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        // Fetch initial list
        axios.get(route('admissions.fetch')).then(response => {
            setAdmissions(response.data);
        });
        // Track Pusher connection state
        const pusher = window.Echo.connector.pusher;
        const onConnected = () => setConnected(true);
        const onDisconnected = () => setConnected(false);
        pusher.connection.bind('connected', onConnected);
        pusher.connection.bind('disconnected', onDisconnected);
        setConnected(pusher.connection.state === 'connected');

        // Subscribe to real-time events
        const channel = window.Echo.channel('admissions');
        // handle creation without duplicates
        channel.listen('AdmissionCreated', e => {
            setAdmissions(prev => prev.some(a => a.id === e.admission.id) ? prev : [...prev, e.admission]);
        }).listen('AdmissionUpdated', e => {
            setAdmissions(prev => prev.map(a => a.id === e.admission.id ? e.admission : a));
        }).listen('AdmissionDeleted', e => {
            setAdmissions(prev => prev.filter(a => a.id !== e.admissionId));
        });
        // Cleanup on unmount
        return () => {
            channel.stopListening('AdmissionCreated')
                   .stopListening('AdmissionUpdated')
                   .stopListening('AdmissionDeleted');
            window.Echo.leave('admissions');
            pusher.connection.unbind('connected', onConnected);
            pusher.connection.unbind('disconnected', onDisconnected);
        };
    }, []);

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight">Admissions</h2>}>
            <Head title="Admissions" />
            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-end mb-4">
                    <Button className="p-button-success flex items-center bg-emerald-600 hover:bg-emerald-700" onClick={() => router.get(route('admissions.create'))}>
                        <AiOutlinePlus className="h-5 w-5 mr-2" />
                        New Admission
                    </Button>
                </div>
                <LiveIndicator connected={connected} />
                <DataTable value={admissions} className="p-datatable-sm mt-5">
                    <Column field="id" header="ID" sortable />
                    <Column field="patient.name" header="Patient" sortable />
                    <Column field="admission_date" header="Admission Date" sortable />
                    <Column field="discharge_date" header="Discharge Date" sortable />
                    <Column field="room.name" header="Room" sortable />
                    <Column field="notes" header="Notes" />
                    <Column header="Actions" body={(rowData) => (
                        <div className="flex space-x-2">
                            <Button className="p-button-text text-blue-600 hover:text-blue-900" onClick={() => router.get(route('admissions.show', rowData.id))}>
                                <AiOutlineEye size={20} />
                            </Button>
                            <Button className="p-button-text text-indigo-600 hover:text-indigo-900" onClick={() => router.get(route('admissions.edit', rowData.id))}>
                                <AiOutlineEdit size={20} />
                            </Button>
                            <Button className="p-button-text text-red-600 hover:text-red-900" onClick={() => router.delete(route('admissions.destroy', rowData.id))}>
                                <AiOutlineDelete size={20} />
                            </Button>
                        </div>
                    )} />
                </DataTable>
            </div>
        </AuthenticatedLayout>
    );
}
