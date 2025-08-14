import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { AiOutlinePlus, AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function Index() {
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const [meta, setMeta] = useState({ current_page: 1, per_page: 10, total: 0 });
    const [loading, setLoading] = useState(false);

    const fetchPage = (page = 1, per_page = 10) => {
        setLoading(true);
        axios.get(route('patients.fetch'), { params: { page, per_page } })
            .then(response => {
                setData(response.data.data);
                setMeta(response.data);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchPage(meta.current_page, meta.per_page);
    }, []);

    const onPage = (e) => {
        fetchPage(e.page + 1, e.rows);
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight">{t('patients')}</h2>}>
            <Head title={t('patients')} />
            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-end mb-4">
                    <Button
                        className="p-button-success bg-emerald-600 hover:bg-emerald-700 flex items-center"
                        onClick={() => router.get(route('patients.create'))}
                    >
                        <AiOutlinePlus className="h-5 w-5 mr-2" />
                        {t('patient.newPatient')}
                    </Button>
                </div>
                <DataTable
                    value={data}
                    className="p-datatable-sm"
                    lazy
                    paginator
                    first={(meta.current_page - 1) * meta.per_page}
                    rows={meta.per_page}
                    totalRecords={meta.total}
                    onPage={onPage}
                    loading={loading}
                >
                    <Column field="id" header="ID" sortable />
                    <Column field="name" header={t('patient.name')} sortable />
                    <Column field="email" header={t('patient.email')} sortable />
                    <Column field="phone" header={t('patient.phone')} sortable />
                    <Column field="date_of_birth" header={t('patient.dateOfBirth')} sortable />
                    <Column field="gender" header={t('patient.gender')} sortable />
                    <Column header={t('actions')} body={(rowData) => (
                        <div className="flex space-x-2">
                            <Button className="p-button-text text-blue-600 hover:text-blue-900" onClick={() => router.get(route('patients.show', rowData.id))}>
                                <AiOutlineEye size={20} />
                            </Button>
                            <Button className="p-button-text text-indigo-600 hover:text-indigo-900" onClick={() => router.get(route('patients.edit', rowData.id))}>
                                <AiOutlineEdit size={20} />
                            </Button>
                            <Button className="p-button-text text-red-600 hover:text-red-900" onClick={() => router.delete(route('patients.destroy', rowData.id))}>
                                <AiOutlineDelete size={20} />
                            </Button>
                        </div>
                    )} />
                </DataTable>
            </div>
        </AuthenticatedLayout>
    );
}
