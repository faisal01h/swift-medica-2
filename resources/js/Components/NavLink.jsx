import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center text-md font-medium leading-5 transition duration-150 ease-in-out focus:outline-none py-3 px-3 rounded-lg ' +
                (active
                    ? 'bg-emerald-600 text-white focus:border-indigo-700'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 hover:bg-emerald-200') +
                className
            }
        >
            {
                props.icon && (
                    <span className="mr-2">
                        {props.icon}
                    </span>
                )
            }
            {children}
        </Link>
    );
}
