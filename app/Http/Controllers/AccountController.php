<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(auth()->user()->hasRole('Payroll_Officer')){
            return response()->json(auth()->user()->company->accounts()->get(), 200);
        }

        return response()->json(Account::all()->groupBy('company_id'), 200);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showOne()
    {
        $account = auth()->user()->account;
        return response()->json($account, 200);
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
            return response()->json(auth()->user()->company->accounts()->findOrFail($id), 200);
        } 

        return response()->json(Account::findOrFail($id), 200);
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
        $validatedData = $request->validate([
            'capital' => 'sometimes|required|numeric',
        ]);
        $account = Account::findOrFail($id);
        $account->update($validatedData);
        return response()->json('Account Updated', 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
