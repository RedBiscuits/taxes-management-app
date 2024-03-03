<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        $emp = Role::firstOrCreate(['name' => 'employee']);
        $adminRole = Role::firstOrCreate(['name' => 'admin']);

        $admin = \App\Models\User::create([
            'name' => 'Test User',
            'phone' => '01550935404',
            'job' => 'kitten',
            'password' => bcrypt('kitten123'),

        ]);
        $admin->assignRole($adminRole);

        $location = \App\Models\Location::create([
            'name' => 'test location',
            'yearly_target' => 10000,
        ]);

        $empd = \App\Models\User::create([
            'name' => 'Test employee',
            'phone' => '01550935405',
            'job' => 'doggo',
            'password' => bcrypt('doggo123'),
            'device_id' => '123456789',
            'location_id' => $location->id

        ]);
        $empd->assignRole($emp);

    }
}
