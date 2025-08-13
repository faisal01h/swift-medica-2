import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useForm } from '@inertiajs/react';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';

export default function EditModal({ visible, onHide, role }) {
    const { t } = useTranslation();
    const form = useForm({ id: role.id, name: role.name, slug: role.slug, description: role.description || '' });

    const submit = (e) => {
        e.preventDefault();
        form.put(route('roles.update', role.id), { onSuccess: () => onHide() });
    };

    return (
        <Dialog visible={visible} onHide={onHide} header={t('roles.editRole')}>
            <form onSubmit={submit} className="p-fluid">
                <InputText type="hidden" value={form.data.id} />
                <div className="field">
                    <label htmlFor="name">{t('name')}</label>
                    <InputText id="name" value={form.data.name} onChange={e => form.setData('name', e.target.value)} />
                    {form.errors.name && <small className="p-error">{form.errors.name}</small>}
                </div>
                <div className="field">
                    <label htmlFor="slug">{t('roles.slug')}</label>
                    <InputText id="slug" value={form.data.slug} onChange={e => form.setData('slug', e.target.value)} />
                    {form.errors.slug && <small className="p-error">{form.errors.slug}</small>}
                </div>
                <div className="field">
                    <label htmlFor="description">{t('description')}</label>
                    <InputText id="description" value={form.data.description} onChange={e => form.setData('description', e.target.value)} />
                    {form.errors.description && <small className="p-error">{form.errors.description}</small>}
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <Button label={t('cancel')} severity="secondary" onClick={onHide} />
                    <Button label={t('save')} type="submit" />
                </div>
            </form>
        </Dialog>
    );
}
