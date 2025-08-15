<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Dev\DatabaseBrowserController;
use App\Http\Controllers\UserManagement\UserController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // User management (CRUD with named routes)
    Route::resource('users', UserController::class)
        ->names([
            'index'   => 'users.index',
            'create'  => 'users.create',
            'store'   => 'users.store',
            'show'    => 'users.show',
            'edit'    => 'users.edit',
            'update'  => 'users.update',
            'destroy' => 'users.destroy',
        ]);
    // Role and Permission management
    Route::resource('roles', App\Http\Controllers\Rbac\RoleController::class)
        ->names([
            'index' => 'roles.index',
            'store' => 'roles.store',
            'edit' => 'roles.edit',
            'update' => 'roles.update',
            'destroy' => 'roles.destroy',
        ]);
    // Role permissions
    Route::get('roles/{role}/permissions', [App\Http\Controllers\Rbac\RolePermissionController::class, 'edit'])
        ->name('roles.permissions.edit');
    Route::put('roles/{role}/permissions', [App\Http\Controllers\Rbac\RolePermissionController::class, 'update'])
        ->name('roles.permissions.update');
    
    // Fetch paginated patients JSON endpoint (must come before resource to avoid route conflict)
    Route::get('patients/fetch', [App\Http\Controllers\Patient\PatientController::class, 'fetch'])
        ->name('patients.fetch');
    
    // Patient CRUD
    Route::resource('patients', App\Http\Controllers\Patient\PatientController::class)
        ->names([
            'index'   => 'patients.index',
            'create'  => 'patients.create',
            'store'   => 'patients.store',
            'show'    => 'patients.show',
            'edit'    => 'patients.edit',
            'update'  => 'patients.update',
            'destroy' => 'patients.destroy',
        ]);
    
    // Patient admissions CRUD
    // JSON endpoint for fetching admissions list in real-time
    Route::get('admissions/fetch', [App\Http\Controllers\Admission\AdmissionController::class, 'fetch'])->name('admissions.fetch');
    Route::resource('admissions', App\Http\Controllers\Admission\AdmissionController::class)
        ->names([
            'index'   => 'admissions.index',
            'create'  => 'admissions.create',
            'store'   => 'admissions.store',
            'show'    => 'admissions.show',
            'edit'    => 'admissions.edit',
            'update'  => 'admissions.update',
            'destroy' => 'admissions.destroy',
        ]);
});

require __DIR__.'/auth.php';

// Development database browser
if (app()->environment('local')) {
    Route::get('/dev/database-browser', [DatabaseBrowserController::class, 'index'])
        ->middleware(['auth'])
        ->name('dev.database-browser');
    // Store new record
    Route::post('/dev/database-browser', [DatabaseBrowserController::class, 'store'])
        ->middleware(['auth'])
        ->name('dev.database-browser.store');
    // Delete a record
    Route::delete('/dev/database-browser/{table}/{id}', [DatabaseBrowserController::class, 'destroy'])
        ->middleware(['auth'])
        ->name('dev.database-browser.destroy');
}
