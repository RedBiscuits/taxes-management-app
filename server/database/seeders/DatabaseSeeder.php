<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        $user = \App\Models\User::create([
            'name' => 'Test User',
            'phone' => '01550935404',
            'job' => 'kitten',
            'password' => bcrypt('kitten123')
        ]);

        Admin::create([
            'user_id' => $user->id
        ]);
    }
}
