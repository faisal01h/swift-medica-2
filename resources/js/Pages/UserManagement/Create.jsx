import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';

export default function Create({ roles }) {
    const form = useForm({ name: '', email: '', password: '', password_confirmation: '', roles: [] });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('users.store'));
    };

    const toggle = (id) => {
        let current = form.data.roles;
        if (current.includes(id)) {
            current = current.filter(r => r !== id);
        } else {
            current.push(id);
        }
        form.setData('roles', current);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">New User</h2>}
        >
            <Head title="Create User" />

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
                        <label className="block text-sm font-medium text-gray-700">Password</label>
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
                    <div>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Create User
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
