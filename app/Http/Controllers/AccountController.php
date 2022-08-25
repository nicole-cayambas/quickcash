<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;
use App\Models\Company;

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
            $accounts = auth()->user()->company->accounts()->get();
            foreach($accounts as $account){
                $account['company_name'] = auth()->user()->company->name;
                if($account->status()) $account['status'] = $account->status();
            }
        } else {
            $accounts = Account::all();
            foreach($accounts as $account){
                $account['company_name'] = Company::find($account->company_id)->name;
                if($account->status()) $account['status'] = $account->status();
            }
        }
        return response()->json($accounts, 200);
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
            'name' => 'sometimes|required|string',
            'address' => 'sometimes|required|string',
            'phone' => 'sometimes|required|string'
        ]);
        $account = Account::findOrFail($id);
        $account->update($validatedData);
        return response()->json('Account Updated', 204);
    }

    public function store(Request $request) {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'address' => 'required|string',
            'phone' => 'required|string',
            'company_id' => 'integer|required',
            'user_id' => 'integer'
        ]);
        $user = auth()->user();
        if($user->hasRole('Employee')){
            $account = $user->account()->create($validatedData);
            $user->account_id = $account->id;
            $user->save();
            return response()->json('Account created successfully!', 201);
        } else {
            if($user->hasRole('Payroll_Officer')){
                $validatedData['company_id'] = $user->company_id;
            }
            $account = Account::create($validatedData);
            $account->setStatus('Verified');
        }
        return response()->json('Account created successfully!', 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $account = Account::findOrFail($id);
        $account->loans()->delete();
        $account->delete();
        return response()->json('Deleted successfully.', 202);
    }
}
