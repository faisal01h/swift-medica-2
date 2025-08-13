<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed roles, tenants, users, and tenant-user relationships
        $this->call([
            RolesTableSeeder::class,
            TenantsTableSeeder::class,
            UsersTableSeeder::class,
            TenantUserTableSeeder::class,
        ]);
    }
}
