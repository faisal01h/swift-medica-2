import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { t } from 'i18next';
import { useState } from 'react';

export default function Dashboard() {

    const [ pageTitle, setPageTitle ] = useState('Dashboard');

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title={pageTitle} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            { t('dashboards.welcomeMessage') }
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
