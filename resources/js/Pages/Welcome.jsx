import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, config }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute blur-xs"
                    src="https://unsplash.com/photos/GwgFPDXiSIs/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzU0NTM0MDk3fA&force=true&w=1920"
                />
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="text-center py-16 bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-lg shadow-md mb-8 w-full">
                            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white">
                                {/* read .env APP_NAME */}
                                {config.name || 'Swift Medica'}
                            </h1>
                            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                                Streamline patient care, room assignments, and hospital operations all in one place.
                            </p>
                            <div className="mt-6 flex justify-center space-x-4">
                                <Link href={route('dashboard')} className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                                    Get Started
                                </Link>
                                {!auth.user && (
                                    <Link href={route('login')} className="px-6 py-3 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900 transition">
                                        Login
                                    </Link>
                                )}
                            </div>
                        </header>

                        <main className="mt-12 w-full grid gap-8 lg:grid-cols-3">
                            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                                <h2 className="text-xl font-semibold mb-2">Locations</h2>
                                <p className="text-gray-600 mb-4">View and manage hospital locations effortlessly.</p>
                                {/* <Link href={route('locations.index')} className="text-emerald-600 hover:underline">Explore &rarr;</Link> */}
                            </div>
                            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                                <h2 className="text-xl font-semibold mb-2">Room Types</h2>
                                <p className="text-gray-600 mb-4">Configure and track different room types.</p>
                                {/* <Link href={route('room-types.index')} className="text-emerald-600 hover:underline">Explore &rarr;</Link> */}
                            </div>
                            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                                <h2 className="text-xl font-semibold mb-2">Rooms</h2>
                                <p className="text-gray-600 mb-4">Manage room assignments and availability.</p>
                                {/* <Link href={route('rooms.index')} className="text-emerald-600 hover:underline">Explore &rarr;</Link> */}
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Powered by {config.original_app_name} v{config.version}
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
