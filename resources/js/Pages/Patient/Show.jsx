import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Show({ patient }) {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight">{t('patient.details')}</h2>}>
            <Head title={t('patient.details')} />
            <div className="py-6 px-4 sm:px-6 lg:px-8 bg-white shadow rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-lg font-medium">{t('patient.name')}</h3>
                        <p>{patient.name}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">{t('patient.email')}</h3>
                        <p>{patient.email || '-'}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">{t('patient.phone')}</h3>
                        <p>{patient.phone || '-'}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">{t('patient.dateOfBirth')}</h3>
                        <p>{patient.date_of_birth || '-'}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">{t('patient.identityNumber')}</h3>
                        <p>{patient.identity_number || '-'}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">{t('patient.gender')}</h3>
                        <p>{patient.gender || '-'}</p>
                    </div>
                    <div className="col-span-2">
                        <h3 className="text-lg font-medium">{t('patient.address')}</h3>
                        <p>{patient.address || '-'}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">{t('patient.emergencyContactName')}</h3>
                        <p>{patient.emergency_contact_name || '-'}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">{t('patient.emergencyContactPhone')}</h3>
                        <p>{patient.emergency_contact_phone || '-'}</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
