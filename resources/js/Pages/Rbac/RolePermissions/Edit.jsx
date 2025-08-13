import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';

export default function Edit({ role, allPermissions, assigned }) {
    const { t } = useTranslation();
    const form = useForm({ permissions: assigned });

    const toggle = (id) => {
        let perms = form.data.permissions;
        if (perms.includes(id)) {
            perms = perms.filter(p => p !== id);
        } else {
            perms.push(id);
        }
        form.setData('permissions', perms);
    };

    const submit = (e) => {
        e.preventDefault();
        form.put(route('roles.permissions.update', role.id));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('editPermissions', { name: role.name })}</h2>}>
            <Head title={t('editPermissions', { name: role.name })} />
            <form onSubmit={submit} className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allPermissions.map(perm => (
                        <label key={perm.id} className="flex items-center space-x-2">
                            <Checkbox checked={form.data.permissions.includes(perm.id)} onChange={() => toggle(perm.id)} />
                            <span>{perm.name}</span>
                        </label>
                    ))}
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <Link as="button" href={route('roles.index')} className="p-button-secondary">
                        {t('cancel')}
                    </Link>
                    <Button label={t('save')} type="submit" />
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
