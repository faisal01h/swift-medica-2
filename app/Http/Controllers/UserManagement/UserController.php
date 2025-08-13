<?php

namespace App\Http\Controllers\UserManagement;

use App\Http\Controllers\Controller;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function index()
    {
        $rolesList = Role::all();
        $users = User::with('roles')->get()->map(function ($user) {
            return array_merge($user->toArray(), ['roles' => $user->roles->pluck('id')->toArray()]);
        });
        return Inertia::render('UserManagement/Index', [
            'users' => $users,
            'rolesList' => $rolesList,
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create()
    {
        $roles = Role::all();
        return Inertia::render('UserManagement/Create', [
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|confirmed|min:6',
            'roles' => 'nullable|array',
        ]);
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);

        // Assign roles using Spatie Permission
        $user->syncRoles($request->input('roles', []));

        return redirect()->route('users.index');
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(User $user)
    {
        $roles = Role::all();
        $assignedRoles = $user->roles->pluck('id')->toArray();
        return Inertia::render('UserManagement/Edit', [
            'user' => $user,
            'roles' => $roles,
            'assignedRoles' => $assignedRoles,
        ]);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|confirmed|min:6',
            'roles' => 'nullable|array'
        ]);

        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        // Sync roles using spatie/laravel-permission
        $roles = $request->input('roles', []);
        $user->syncRoles($roles);

        return redirect()->route('users.index');
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index');
    }
    /**
     * Display the specified user and active sessions (JSON).
     */
    public function show(User $user)
    {
        $sessions = DB::table('sessions')
            ->where('user_id', $user->id)
            ->orderBy('last_activity', 'desc')
            ->get(['id', 'ip_address', 'user_agent', 'last_activity']);
        return response()->json([
            'user' => $user,
            'sessions' => $sessions,
        ]);
    }
}