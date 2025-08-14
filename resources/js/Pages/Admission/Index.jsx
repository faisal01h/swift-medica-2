import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { AiOutlinePlus, AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

export default function Index({ admissions }) {
    const { data, links } = admissions;
    const prevLink = links?.find(link => link.label === 'Previous') || '#';
    const nextLink = links?.find(link => link.label === 'Next') || '#';

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
                <DataTable value={data} className="p-datatable-sm">
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
                <div className="flex justify-between mt-4">
                    <Button label="Previous" disabled={!prevLink.url} onClick={() => prevLink.url && router.get(prevLink.url)} />
                    <Button label="Next" disabled={!nextLink.url} onClick={() => nextLink.url && router.get(nextLink.url)} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
