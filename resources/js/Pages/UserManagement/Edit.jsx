import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';

export default function Edit({ user, roles, assignedRoles }) {
    const form = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        roles: assignedRoles || [],
    });

    const toggle = (id) => {
        let current = form.data.roles;
        if (current.includes(id)) {
            current = current.filter(r => r !== id);
        } else {
            current.push(id);
        }
        form.setData('roles', current);
    };

    const submit = (e) => {
        e.preventDefault();
        form.put(route('users.update', user.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit User</h2>}
        >
            <Head title="Edit User" />

            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="space-y-6 bg-white shadow rounded-lg p-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={form.data.name}
                            onChange={e => form.setData('name', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={form.data.email}
                            onChange={e => form.setData('email', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Roles</label>
                        <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {roles.map(role => (
                                <label key={role.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={form.data.roles.includes(role.id)}
                                        onChange={() => toggle(role.id)}
                                    />
                                    <span>{role.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">New Password (optional)</label>
                        <input
                            type="password"
                            value={form.data.password}
                            onChange={e => form.setData('password', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            value={form.data.password_confirmation}
                            onChange={e => form.setData('password_confirmation', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Update User
                        </button>
                        <Link
                            as="button"
                            method="delete"
                            href={route('users.destroy', user.id)}
                            className="text-red-600 hover:text-red-900"
                        >
                            Delete User
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
