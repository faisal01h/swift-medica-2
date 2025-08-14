import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { useState } from 'react';
import CreateUserModal from '@/Pages/UserManagement/CreateUserModal';
import EditUserModal from '@/Pages/UserManagement/EditUserModal';
import ViewUserModal from '@/Pages/UserManagement/ViewUserModal';
import { useTranslation } from 'react-i18next';

export default function Index({ users, rolesList }) {
    const { t } = useTranslation();
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [showView, setShowView] = useState(false);
    const [viewUserId, setViewUserId] = useState(null);
    const createForm = useForm({ name: '', email: '', password: '', password_confirmation: '' });
    const editForm = useForm({ id: null, name: '', email: '', password: '', password_confirmation: '' });

    const openCreate = () => setShowCreate(true);
    const closeCreate = () => setShowCreate(false);

    const openEdit = row => {
        setEditUser(row);
        setShowEdit(true);
    };
    const closeEdit = () => { setShowEdit(false); setEditUser(null); };

    const openView = (row) => {
        setViewUserId(row.id);
        setShowView(true);
    };
    const closeView = () => {
        setShowView(false);
        setViewUserId(null);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('users')}</h2>}
        >
            <Head title={t('users')} />

            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-end mb-4">
                    <Button
                        label={t('newUser')}
                        icon={<AiOutlinePlus className="h-5 w-5" />}
                        className="p-button-success bg-emerald-600 hover:bg-emerald-700"
                        onClick={openCreate}
                    />
                </div>
                <DataTable value={users} paginator rows={10} className="p-datatable-sm">
                    <Column field="id" header={t('id')} sortable />
                    <Column field="ihs_organization_id" header={t('ihs.orgid')} sortable />
                    <Column field="ihs_user_id" header={t('ihs.userid')} sortable />
                    <Column field="nik" header={t('nik')} sortable />
                    <Column field="bpjs_number" header={t('bpjs_number')} sortable />
                    <Column field="name" header={t('name')} sortable />
                    <Column field="email" header={t('email')} sortable />
                    <Column field="roles" header={t('roles')} body={(rowData) => {
                        return rowData.roles.map(role => role.name).join(', ');
                    }} />
                    <Column header={t('actions')} body={rowData => (
                        <div className="flex items-center">
                            <button
                                type="button"
                                onClick={() => openView(rowData)}
                                className="text-indigo-600 hover:text-indigo-900 mr-4 inline-flex items-center"
                                title={t('viewUser')}
                            >
                                <AiOutlineEye size={20} />
                            </button>
                            <button
                                type="button"
                                onClick={() => openEdit(rowData)}
                                className="text-blue-600 hover:text-blue-900 mr-4 inline-flex items-center"
                                title={t('editUser')}
                            >
                                <AiOutlineEdit size={20} />
                            </button>
                            <Link
                                as="button"
                                method="delete"
                                href={route('users.destroy', rowData.id)}
                                className="text-red-600 hover:text-red-900 inline-flex items-center"
                                title={t('deleteUser')}
                            >
                                <AiOutlineDelete size={20} />
                            </Link>
                        </div>
                    )} />
                </DataTable>
            </div>
            {/* Modals */}
            <CreateUserModal visible={showCreate} roles={rolesList} onHide={closeCreate} />
            {editUser && (
                <EditUserModal visible={showEdit} user={editUser} roles={rolesList} onHide={closeEdit} />
            )}
            <ViewUserModal visible={showView} userId={viewUserId} onHide={closeView} />
        </AuthenticatedLayout>
    );
}
