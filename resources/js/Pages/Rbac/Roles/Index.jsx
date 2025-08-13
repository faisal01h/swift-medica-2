import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useForm } from '@inertiajs/react';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlineUnlock } from 'react-icons/ai';
import CreateRoleModal from './CreateModal';
import EditRoleModal from './EditModal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Index({ roles }) {
    const { t } = useTranslation();
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editRole, setEditRole] = useState(null);

    const openCreate = () => setShowCreate(true);
    const closeCreate = () => setShowCreate(false);

    const openEdit = (row) => { setEditRole(row); setShowEdit(true); };
    const closeEdit = () => { setShowEdit(false); setEditRole(null); };

    const editRolePermission = (row) => {
        window.location.href = route('roles.permissions.edit', row.id);
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('roles')}</h2>}>
            <Head title={t('roles')} />
            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-end mb-4">
                    <Button icon={<AiOutlinePlus />} label={t('roles.newRole')} className="p-button-success" onClick={openCreate} />
                </div>
                <DataTable value={roles} paginator rows={10} className="p-datatable-sm">
                    <Column field="id" header={t('id')} sortable />
                    <Column field="name" header={t('name')} sortable />
                    <Column field="slug" header={t('roles.slug')} sortable />
                    <Column field="description" header={t('description')} />
                    <Column header={t('actions')} body={rowData => (
                        <div className="flex space-x-2">
                            <button onClick={() => editRolePermission(rowData)} className="text-emerald-600 hover:text-emerald-900">
                                <AiOutlineUnlock size={20} />
                            </button>
                            <button onClick={() => openEdit(rowData)} className="text-blue-600 hover:text-blue-900">
                                <AiOutlineEdit size={20} />
                            </button>
                            <Link as="button" method="delete" href={route('roles.destroy', rowData.id)} className="text-red-600 hover:text-red-900">
                                <AiOutlineDelete size={20} />
                            </Link>
                        </div>
                    )} />
                </DataTable>
                <CreateRoleModal visible={showCreate} onHide={closeCreate} />
                {editRole && <EditRoleModal visible={showEdit} role={editRole} onHide={closeEdit} />}
            </div>
        </AuthenticatedLayout>
    );
}
