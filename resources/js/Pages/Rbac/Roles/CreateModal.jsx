import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useForm } from '@inertiajs/react';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';

export default function CreateModal({ visible, onHide }) {
    const { t } = useTranslation();
    const form = useForm({ name: '', slug: '', description: '' });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('roles.store'), { onSuccess: () => onHide() });
    };

    return (
        <Dialog visible={visible} onHide={onHide} header={t('roles.newRole')}>
            <form onSubmit={submit} className="p-fluid">
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
