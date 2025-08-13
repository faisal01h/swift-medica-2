<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TenantUserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();
        $tenantIds = DB::table('tenants')->pluck('id');
        $userIds = DB::table('users')->pluck('id');

        foreach ($tenantIds as $tenantId) {
            foreach ($userIds as $userId) {
                DB::table('tenant_user')->insert([
                    'tenant_id' => $tenantId,
                    'user_id' => $userId,
                    'role_id' => 2,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }
    }
}
