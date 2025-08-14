import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Dropdown as PrimeDropdown } from 'primereact/dropdown';
import { CiCircleChevDown, CiCircleChevRight } from 'react-icons/ci';
import {
    AiOutlineHome,
    AiOutlineUser,
    AiOutlineCalculator,
    AiOutlineMoneyCollect,
    AiOutlineCalendar,
    AiOutlineBook,
    AiOutlineSignature,
    AiOutlineDollarCircle,
    AiOutlineLock,
    AiOutlineDatabase
} from 'react-icons/ai';

const menuItems = [
    {
        groupName: 'main',
        noHeader: true,
        items: [
            { name: 'dashboard', icon: <AiOutlineHome />, route: 'dashboard', permissions: ['dashboard.view'] }
        ]
    },
    {
        groupName: 'admissions',
        items: [
            { name: 'admissions', icon: <AiOutlineUser />, route: 'admissions.index' },
            { name: 'billing', icon: <AiOutlineCalculator />, route: null },
            { name: 'payments', icon: <AiOutlineMoneyCollect />, route: null },
            { name: 'appointments', icon: <AiOutlineCalendar />, route: null }
        ]
    },
    {
        groupName: 'records',
        items: [
            { name: 'medicalRecords', icon: <AiOutlineBook />, route: null }
        ]
    },
    {
        groupName: 'administration',
        items: [
            { name: 'attendance', icon: <AiOutlineSignature />, route: null },
            { name: 'financials', icon: <AiOutlineDollarCircle />, route: null }
        ]
    },
    {
        groupName: 'management',
        items: [
            { name: 'users', icon: <AiOutlineUser />, route: 'users.index', permissions: ['users.view'] },
            { name: 'permissions', icon: <AiOutlineLock />, route: 'roles.index', permissions: ['roles.view'] }
        ]
    },
    {
        groupName: 'developmentOptions',
        items: [
            { name: 'databaseBrowser', icon: <AiOutlineDatabase />, route: 'dev.database-browser' }
        ]
    }
];

export default function Sidebar({ sidebarOpen }) {
    const { props } = usePage();
    const permissions = props.auth.user_permissions;
    const { t, i18n } = useTranslation();

    const [openGroups, setOpenGroups] = useState(() => {
        const init = {};
        menuItems.forEach((g, i) => {
            if (!g.noHeader) init[i] = true;
        });
        return init;
    });
    const toggleGroup = (i) => setOpenGroups(prev => ({ ...prev, [i]: !prev[i] }));

    const langOptions = Object.entries(i18n.options.resources).map(
        ([key, value]) => ({ label: value.name, value: key })
    );

    return (
        <aside className={`md:flex flex-col flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out
            backdrop-blur-xl backdrop-saturate-150 backdrop-brightness-110 bg-white/20 bg-slate-200
            border-r border-white/30 ${sidebarOpen ? 'w-64' : 'w-14'}`}>  
            <div className="flex items-center justify-between p-4">
                {sidebarOpen ? (
                    <div className="flex flex-row items-center gap-3">
                        <ApplicationLogo className="h-8 w-auto" />
                        <h2 className="text-lg font-semibold">{import.meta.env.VITE_APP_NAME}</h2>
                    </div>
                ) : (
                    <ApplicationLogo className="h-6 w-auto" />
                )}
            </div>
            <div className={`flex items-center justify-between ${sidebarOpen ? 'px-4' : 'hidden'}`}>
                <PrimeDropdown
                    value={i18n.language}
                    options={langOptions}
                    onChange={e => i18n.changeLanguage(e.value)}
                    placeholder={i18n.language.toUpperCase()}
                    className="w-full"
                />
            </div>
            {menuItems.map((group, index) => {
                const visibleItems = group.items.filter(
                    item => !item.permissions || item.permissions.some(p => permissions.includes(p))
                );
                if (visibleItems.length === 0) return null;
                return (
                    <div key={index} className="border-t px-2 py-4">
                        {!group.noHeader && (
                            <div
                                onClick={() => toggleGroup(index)}
                                className={`flex items-center justify-between cursor-pointer text-xs px-2 uppercase tracking-wider \
                                    ${sidebarOpen ? 'flex' : 'hidden'} \
                                    ${group.items.some(item => item.route && route().current(item.route)) ? 'text-emerald-800 font-bold' : 'text-gray-500'}`}
                            >
                                <span>{t(group.groupName)}</span>
                                {openGroups[index] ? <CiCircleChevDown /> : <CiCircleChevRight />}
                            </div>
                        )}
                        {(group.noHeader || openGroups[index]) && (
                            <nav className="mt-2 space-y-1 flex flex-col">
                                {visibleItems.map(item => (
                                    <NavLink
                                        key={item.name}
                                        icon={item.icon}
                                        href={item.route ? route(item.route) : '#'}
                                        active={item.route ? route().current(item.route) : false}
                                    >
                                        <span className={`${sidebarOpen ? 'inline' : 'hidden'} ml-2`}>{t(item.name)}</span>
                                    </NavLink>
                                ))}
                            </nav>
                        )}
                    </div>
                );
            })}
        </aside>
    );
}
