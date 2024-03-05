<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use App\Models\Employee;
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

        $location1 = \App\Models\Location::create([
            'name' => 'الشروق',
            'yearly_target' => 10000,
        ]);

        $empd1 = \App\Models\User::create([
            'name' => 'employee1',
            'phone' => '01111111111',
            'job' => 'doggo',
            'password' => bcrypt('doggo123'),
            // 'device_id' => '123456789',
            // 'location_id' => $location1->id
        ]);
        $empd1->assignRole($adminRole);



        $location2 = \App\Models\Location::create([
            'name' => 'بدر',
            'yearly_target' => 10000,
        ]);

        $empd2 = \App\Models\User::create([
            'name' => 'employee2',
            'phone' => '02222222222',
            'job' => 'doggo',
            'password' => bcrypt('doggo123'),
            // 'device_id' => '987654321',
            // 'location_id' => $location2->id
        ]);
        $empd2->assignRole($adminRole);
        

    }
}
