<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use App\Models\Employee;
use App\Models\Payment;
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
        $managerRole = Role::firstOrCreate(['name' => 'manager']);


        $admin = \App\Models\User::create([
            'name' => 'Test User',
            'phone' => '01550935404',
            'job' => 'kitten',
            'password' => bcrypt('kitten123'),

        ]);

        $admin->assignRole($adminRole);



        $empd1 = \App\Models\User::create([
            'name' => 'employee1',
            'phone' => '01111111111',
            'job' => 'doggo',
            'password' => bcrypt('doggo123'),
            // 'device_id' => '123456789',
            // 'location_id' => $location1->id
        ]);
        $empd2 = \App\Models\User::create([
            'name' => 'employee2',
            'phone' => '02222222222',
            'job' => 'doggo',
            'password' => bcrypt('doggo123'),
            // 'device_id' => '987654321',
            // 'location_id' => $location2->id
        ]);

        $empd1->assignRole($emp);
        $empd2->assignRole($emp);



        $location1 = \App\Models\Location::create([
            'name' => 'الشروق',
            'yearly_target' => 10000,
            "user_id" => $empd1->id
        ]);


        $location2 = \App\Models\Location::create([
            'name' => 'بدر',
            'yearly_target' => 10000,
            "user_id" => $empd2->id

        ]);



        Payment::factory(40)->create([
            'user_id' => $empd1->id
        ]);


        $man = \App\Models\User::create([
            'name' => 'manager1',
            'phone' => '01550935411',
            'job' => 'wifo',
            'password' => bcrypt('wiffo123'),
            // 'device_id' => '987654321',
            // 'location_id' => $location2->id
        ]);

        $man->assignRole($managerRole);




    }
}
