<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        /* CREATE PERMISSIONS */

        // ADMINISTRATORS
        Permission::create(['name' => 'view-administrator']);
        Permission::create(['name' => 'create-administrator']);
        Permission::create(['name' => 'edit-administrator']);
        
        // EMPLOYEES
        Permission::create(['name' => 'view-employee']);
        Permission::create(['name' => 'create-employee']);
        Permission::create(['name' => 'edit-employee']);

        // PAYROLL OFFICERS
        Permission::create(['name' => 'view-payroll']);
        Permission::create(['name' => 'create-payroll']);
        Permission::create(['name' => 'edit-payroll']);

        // COMPANIES
        Permission::create(['name' => 'create-company']);
        Permission::create(['name' => 'edit-company']);
        
        // LOANS
        Permission::create(['name' => 'view-employees-loan']);
        Permission::create(['name' => 'view-companys-loan']);
        Permission::create(['name' => 'create-loan']);
        Permission::create(['name' => 'edit-loan']);
        Permission::create(['name' => 'acknowledge-loan']);
        Permission::create(['name' => 'request-loan']);
        Permission::create(['name' => 'view-own-loan']);

        // ACCOUNTS
        Permission::create(['name' => 'edit-account']); // for modifying capital

        // RECEIVABLES
        Permission::create(['name' => 'view-receivables']);



        /* CREATE ROLES */
        $ownerRole = Role::create(['name' => 'Owner']);
        $adminRole = Role::create(['name' => 'Administrator']);
        $payrollRole = Role::create(['name' => 'Payroll_Officer']);
        $employeeRole = Role::create(['name' => 'Employee']);


        /* ASSIGN PERMISSIONS TO ROLES */


        $ownerRole->givePermissionTo([
            'view-administrator', 
            'create-administrator', 
            'edit-administrator',
            'create-company',
            'edit-company',
            'view-employee',
            'create-employee',
            'edit-employee',
            'view-employees-loan',
            'view-companys-loan',
            'create-loan',
            'acknowledge-loan',
            'edit-account',
            'view-receivables'
        ]);

        $adminRole->givePermissionTo([
            'create-company',
            'edit-company',
            'view-payroll',
            'create-payroll',
            'edit-payroll',
            'view-employee',
            'create-employee',
            'edit-employee',
            'view-employees-loan',
            'view-companys-loan',
            'acknowledge-loan',
            'edit-account',
            'view-receivables'
        ]);

        $payrollRole->givePermissionTo([
            'create-company',
            'edit-company',
            'view-employee',
            'create-employee',
            'edit-employee',
            'view-companys-loan',
            'create-loan',
            'edit-loan',
            'view-receivables'
        ]);

        $employeeRole->givePermissionTo([
            'request-loan',
            'view-own-loan'
        ]);

    }
}
