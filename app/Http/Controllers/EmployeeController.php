<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
            $employees = auth()->user()->company->employees()->get();
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
        //untested
        $validatedData = $request->validate(
            [
                'first_name' => 'required|max:55',
                'last_name' => 'required|max:55',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
            ]
        );

        if(auth()->user()->hasRole('Payroll_Officer')){
            $validatedData['company_id'] = auth()->user()->company_id;
        }

        $user = User::create($validatedData);
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
        // untested
        if(auth()->user()->hasRole('Payroll_Officer')){
            $employee = auth()->user()->company->employees()->findOrFail($id);
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
        // untested
        if(auth()->user()->hasRole('Payroll_Officer')){
            $employee = auth()->user()->company->employees()->findOrFail($id);
        } else $employee = User::findOrFail($id);
        $employee = auth()->user()->company->employees()->findOrFail($id);

        if($employee){
            $employee->update($request->all());
        }
        return response()->json($employee, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // untested
        if(auth()->user()->hasRole('Payroll_Officer')){
            $employee = auth()->user()->company->employees()->findOrFail($id);
        } else $employee = User::findOrFail($id);
        if($employee){
            $employee->delete();
        }
        return response()->json('Employee deleted.', 204);
    }
}
