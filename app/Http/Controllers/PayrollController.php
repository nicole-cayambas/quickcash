<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Company;
use Hash;

class PayrollController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $payrolls = User::role('Payroll_Officer')->get();
        foreach($payrolls as $payroll){
            $payroll['company_name'] = Company::findOrFail($payroll->company_id)->name;
        }
        return response()->json($payrolls, 200);
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
                'company_id' => 'required|exists:companies,id',
            ]
        );

        $user = User::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'company_id' => $validatedData['company_id'],
        ]);

        $user->assignRole('Payroll_Officer');

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
        return response()->json(User::findOrFail($id), 200);
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
                'company_id' => 'sometimes|required|exists:companies,id',
            ]
        );
        $user = User::findOrFail($id);
        if($user->hasRole('Payroll_Officer')){
            $user->update($validatedData);
        }
        
        return response()->json($user, 200);
    }


    public function resetPassword(Request $request, $id) {

        //untested, will look up later
        $request->validate([
            'password' => 'required|min:6',
        ]);
        $user = User::findOrFail($id);
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
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        if($user->hasRole('Payroll_Officer')) {
            $user->delete();
        }
        return response()->json('Payroll officer removed.', 202);
    }
}
