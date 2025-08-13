<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 5 sample users
        while (User::count() < 5) {
            dump(User::create([
                'name' => 'U00' . (User::count() + 1),
                'email' => 'sampleuser' . (User::count() + 1) . '@example.com',
                'password' => bcrypt('password'), // Use a secure password
            ]));
        }
    }
}
