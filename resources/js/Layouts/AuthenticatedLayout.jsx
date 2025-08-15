import React from 'react';
import Sidebar from './Sidebar';
import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineArrowLeft } from 'react-icons/ai';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const { t, i18n } = useTranslation();

    const [sidebarOpen, setSidebarOpen] = useState(() => {
        const stored = sessionStorage.getItem('sidebarOpen');
        return stored !== null ? JSON.parse(stored) : true;
    });
    useEffect(() => {
        sessionStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
    }, [sidebarOpen]);

    const back = () => {
        window.history.back();
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            <Sidebar sidebarOpen={sidebarOpen} />

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Sidebar toggle button */}
                <div className="p-2 bg-white border-b flex justify-between items-center">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-2 focus:outline-none`}>
                        {sidebarOpen ? '✕' : '☰'}
                    </button>
                    <div>
                        {/* User box */}
                        <div className="flex items-center justify-start md:w-48 w-24">
                            <img src="#" alt="User Avatar" className="w-8 h-8 rounded-full" />
                            <span className="ml-2 text-sm font-medium text-gray-700">{user.name}</span>
                        </div>
                    </div>
                </div>
                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex space-x-5 items-center">
                            <div>
                                <button onClick={() => back()} className="text-gray-500 hover:text-gray-700">
                                    <AiOutlineArrowLeft size={20} />
                                </button>
                            </div>
                            <>{header}</>
                        </div>
                    </header>
                )}
                <main className="p-6 bg-gray-100">{children}</main>
            </div>
        </div>
    );
}
