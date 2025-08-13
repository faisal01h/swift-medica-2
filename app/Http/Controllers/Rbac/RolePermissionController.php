<?php

namespace App\Http\Controllers\Rbac;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionController extends Controller
{

    // Show form to edit permissions for a role
    public function edit($roleId)
    {
        $role = Role::findOrFail($roleId);
        $allPermissions = Permission::all();
        $assigned = $role->permissions->pluck('id');
        return Inertia::render('Rbac/RolePermissions/Edit', [
            'role' => $role,
            'allPermissions' => $allPermissions,
            'assigned' => $assigned,
        ]);
    }

    // Update permissions for a role
    public function update(Request $request, $roleId)
    {
        $data = $request->validate([
            'permissions' => 'array',
            'permissions.*' => 'integer|exists:permissions,id',
        ]);

        $role = Role::findOrFail($roleId);
        $role->syncPermissions($data['permissions'] ?? []);

        return redirect()->route('roles.index')->with('success', 'Permissions updated');
    }
}