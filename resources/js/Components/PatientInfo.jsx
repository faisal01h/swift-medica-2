import { router } from '@inertiajs/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineArrowRight, AiOutlineUserAdd } from 'react-icons/ai';

export default function PatientInfo({ patient }) {
    const { t } = useTranslation();

    const viewPatient = () => {
        router.visit(`/patients/${patient.id}`);
    }

    return (
        <div className="mt-4 p-4 bg-gradient-to-r from-emerald-600 to-cyan-900 bg-opacity-20 backdrop-blur-sm rounded-lg shadow">
            <div className="flex gap-2 flex-row items-center mb-3">
                <AiOutlineUserAdd className="text-white border-white border rounded-full w-6 h-6" />
                <h3 className="text-lg font-semibold text-gray-50">{t('patient.information', 'Patient Information')}</h3>
            </div>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-100 mb-3">
                <div>
                    <dt className="font-medium">{t('patient.name')}</dt>
                    <dd className="mt-1 font-mono">{patient.name}</dd>
                </div>
                <div>
                    <dt className="font-medium">{t('patient.email')}</dt>
                    <dd className="mt-1 font-mono">{patient.email}</dd>
                </div>
                <div>
                    <dt className="font-medium">{t('patient.phone')}</dt>
                    <dd className="mt-1 font-mono">{patient.phone}</dd>
                </div>
                <div>
                    <dt className="font-medium">{t('patient.dateOfBirth')}</dt>
                    <dd className="mt-1 font-mono">{patient.date_of_birth}</dd>
                </div>
                <div>
                    <dt className="font-medium">{t('patient.identityNumber')}</dt>
                    <dd className="mt-1 font-mono">{patient.identity_number}</dd>
                </div>
                <div className="md:col-span-2">
                    <dt className="font-medium">{t('patient.address')}</dt>
                    <dd className="mt-1 font-mono">{patient.address}</dd>
                </div>
            </dl>
            <div className="bg-slate-700 -mx-4 -mb-4 p-4 rounded-b-lg text-white cursor-pointer" onClick={viewPatient}>
                <div className="flex justify-between">
                    <span>View full information</span>
                    <AiOutlineArrowRight className="inline-block w-5 h-5" />
                </div>
            </div>
        </div>
    );
}
