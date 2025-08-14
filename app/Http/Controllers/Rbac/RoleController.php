<?php

namespace App\Http\Controllers\Rbac;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    // List all roles
    public function index()
    {
        $roles = DB::table('roles')->get();
        return Inertia::render('Rbac/Roles/Index', ['roles' => $roles]);
    }

    // Store a new role
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:roles,name',
            'slug' => 'required|string|unique:roles,slug',
            'description' => 'nullable|string',
            'guard_name' => 'required|string',
        ]);
        DB::table('roles')->insert($data + ['created_at' => now(), 'updated_at' => now()]);
        return redirect()->route('roles.index')->with('success', 'Role created');
    }

    // Show edit form data for a role
    public function edit($id)
    {
        $role = DB::table('roles')->where('id', $id)->first();
        return Inertia::render('Rbac/Roles/Edit', ['role' => $role]);
    }

    // Update role
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => "required|string|unique:roles,name,{$id}",
            'slug' => "required|string|unique:roles,slug,{$id}",
            'description' => 'nullable|string',
        ]);
        DB::table('roles')->where('id', $id)->update($data + ['updated_at' => now()]);
        return redirect()->route('roles.index')->with('success', 'Role updated');
    }

    // Delete role
    public function destroy($id)
    {
        DB::table('roles')->where('id', $id)->delete();
        return redirect()->route('roles.index')->with('success', 'Role deleted');
    }
}