import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown as PrimeDropdown } from 'primereact/dropdown';
import { AiOutlineBook, AiOutlineHome, AiOutlineUser, AiOutlineLock, AiOutlineDatabase, AiOutlineSignature, AiOutlineCalculator, AiOutlineMoneyCollect, AiOutlineDollarCircle, AiOutlineCalendar, AiOutlineArrowLeft } from 'react-icons/ai';
import { CiCircleChevDown, CiCircleChevRight } from 'react-icons/ci';

const menuItems = [
    {
        groupName: 'main',
        noHeader: true,
        items: [
            { 
                name: 'dashboard', 
                icon: <AiOutlineHome />, 
                route: 'dashboard',
                permissions: ['dashboard.view']
            }
        ]
    },
    {
        groupName: 'admissions',
        items: [
            { name: 'admissions', icon: <AiOutlineUser />, route: null },
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
            { name: 'financials', icon: <AiOutlineDollarCircle />, route: null },
        ]
    },
    {
        groupName: 'management',
        items: [
            { name: 'users', icon: <AiOutlineUser />, route: 'users.index', permissions: ['users.view'] },
            { name: 'permissions', icon: <AiOutlineLock />, route: 'roles.index', permissions: ['roles.view'] },
        ]
    },
    {
        groupName: 'developmentOptions',
        items: [
            { name: 'databaseBrowser', icon: <AiOutlineDatabase />, route: 'dev.database-browser' }
        ]
    }
];

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const permissions = usePage().props.auth.user_permissions;
    const { t, i18n } = useTranslation();

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [openGroups, setOpenGroups] = useState(() => {
        const init = {};
        menuItems.forEach((g, i) => {
            if (!g.noHeader) init[i] = true;
        });
        return init;
    });
    const toggleGroup = (i) => {
        setOpenGroups(prev => ({ ...prev, [i]: !prev[i] }));
    };
    const back = () => {
        window.history.back();
    };

    // Create dropdown options from i18n resources
    const langOptions = Object.entries(i18n.options.resources).map(([key, value]) => ({ label: value.name, value: key }));

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className={`md:flex flex-col flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out md:flex
                backdrop-blur-xl backdrop-saturate-150 backdrop-brightness-110 bg-white/20 bg-slate-200
                border-r border-white/30 ${sidebarOpen ? 'w-64' : 'w-14'}`}>  
                    <div className="flex items-center justify-between p-4">
                        {
                            sidebarOpen ? (
                                <div className='flex flex-row items-center gap-3'>
                                    <ApplicationLogo className="h-8 w-auto" />
                                    <h2 className="text-lg font-semibold">{import.meta.env.VITE_APP_NAME}</h2>
                                </div>
                            ) : (
                                <ApplicationLogo className="h-8 w-auto" />
                            )
                        }
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
                        const visibleItems = group.items.filter(item => !item.permissions || item.permissions.some(p => permissions.includes(p)));
                        if (visibleItems.length === 0) return null;
                        return (
                        <div key={index} className="border-t px-2 py-4">
                            {!group.noHeader && (
                                <div
                                    onClick={() => toggleGroup(index)}
                                    className={`flex items-center justify-between cursor-pointer text-xs px-2 uppercase tracking-wider 
                                        ${sidebarOpen ? 'flex' : 'hidden'} 
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
                                            <span className={`${sidebarOpen ? 'inline' : 'hidden'} ml-2`}>
                                                {t(item.name)}
                                            </span>
                                        </NavLink>
                                    ))}
                                </nav>
                            )}
                        </div>
                        );
                    })}
            </aside>

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
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
