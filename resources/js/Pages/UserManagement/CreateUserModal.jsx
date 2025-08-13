import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { useForm } from '@inertiajs/react';

export default function CreateUserModal({ visible, onHide, roles }) {
    const form = useForm({ name: '', email: '', password: '', password_confirmation: '', roles: [] });

    const submit = e => {
        e.preventDefault();
        form.post(route('users.store'), { onSuccess: onHide });
    };

    return (
        <Dialog header="Create New User" visible={visible} style={{ width: '400px' }} onHide={onHide} modal>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <InputText
                        value={form.data.name}
                        onChange={e => form.setData('name', e.target.value)}
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <InputText
                        type="email"
                        value={form.data.email}
                        onChange={e => form.setData('email', e.target.value)}
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <InputText
                        type="password"
                        value={form.data.password}
                        onChange={e => form.setData('password', e.target.value)}
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <InputText
                        type="password"
                        value={form.data.password_confirmation}
                        onChange={e => form.setData('password_confirmation', e.target.value)}
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Roles</label>
                    <MultiSelect
                        value={form.data.roles}
                        options={roles}
                        optionLabel="name"
                        optionValue="id"
                        onChange={e => form.setData('roles', e.value)}
                        className="w-full mt-1"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <Button label="Cancel" className="p-button-text" onClick={onHide} />
                    <Button label="Save" type="submit" disabled={form.processing} />
                </div>
            </form>
        </Dialog>
    );
}
