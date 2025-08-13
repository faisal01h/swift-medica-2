<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TenantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();
        DB::table('tenants')->insert([
            [
                'name' => 'RS Cipto Mangunkusumo',
                'slug' => 'rscm-01-id',
                'domain' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'RS H.O.S Tjokroaminoto',
                'slug' => 'rshos-01-id',
                'domain' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
