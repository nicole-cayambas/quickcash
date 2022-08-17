<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Hash;


class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(auth()->user()->hasRole('Payroll_Officer')){
            $employees = auth()->user()->company->users()->get();
        } else $employees = User::all();
        return response()->json($employees, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate(
            [
                'first_name' => 'required|max:55',
                'last_name' => 'required|max:55',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
            ]
        );

        $user = User::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        if(auth()->user()->hasRole('Payroll_Officer')){
            $user->company()->associate(auth()->user()->company);
        }

        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if(auth()->user()->hasRole('Payroll_Officer')){
            $employee = auth()->user()->company->users()->findOrFail($id);
        } else $employee = User::findOrFail($id);

        return response()->json($employee, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate(
            [
                'first_name' => 'sometimes|required|max:55',
                'last_name' => 'sometimes|required|max:55',
            ]
        );

        if(auth()->user()->hasRole('Payroll_Officer')){
            $employee = auth()->user()->company->users()->findOrFail($id);
        } else $employee = User::findOrFail($id);

        if($employee){
            $employee->update([
                'first_name' => $validatedData['first_name'] ?? $employee->first_name,
                'last_name' => $validatedData['last_name'] ?? $employee->last_name,
            ]);
        }
        return response()->json($employee, 200);
    }

    public function resetPassword(Request $request, $id) {

        //untested, will look up later
        $user = auth()->user()->company->users()->findOrFail($id);
        $request->validate([
            'password' => 'required|min:6',
        ]);
        $user->update([
            'password' => Hash::make($request->password)
        ]);
        return response()->json($user, 200);
    }
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function deactivate($id)
    {
        $employee = auth()->user()->company->users()->findOrFail($id);
        if($employee){
            $employee->company_id = null;
            $employee->is_verified = false;
            $employee->save();
        }
        return response()->json('Employee removed from company.', 200);
    }


    public function verify($id) {
        $employee = auth()->user()->company->users()->findOrFail($id);
        $employee->is_verified = true;
        $employee->save();
        return response()->json($employee, 200);
    }
}
