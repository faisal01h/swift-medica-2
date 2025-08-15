<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 5 sample users
        while (User::count() < 5) {
            User::create([
                'name' => 'U00' . (User::count() + 1),
                'email' => 'sampleuser' . (User::count() + 1) . '@example.com',
                'password' => Hash::make('password'), // Use a secure password
            ]);
        }


        // Give user with role admin all permissions
        $adminUser = User::where('email', 'sampleuser1@example.com')->first();
        if ($adminUser) {
            $adminUser->assignRole(Role::where('slug', 'admin')->first());
            $adminUser->givePermissionTo(Permission::all());
        }
    }
}
