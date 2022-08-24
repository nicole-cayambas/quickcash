<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Loan;
use App\Models\Company;
use App\Models\Account;
use Hash;
use Auth;


class LoanController_Payroll extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $accountIDs = auth()->user()->company->accounts()->pluck('id');
        $loans = Loan::whereIn('account_id', $accountIDs)->get();
        foreach($loans as $loan){
            $loan['status'] = $loan->status();
            $loan['account'] = Account::findOrFail($loan->account_id);
        }
        return response()->json($loans, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'amount' => 'required|numeric',
            'loan_date' => 'required|date|after:yesterday',
            'amortizations' => 'required|numeric',
            'percentage' => 'required|numeric|between:0,100',
            'account_id' => 'required|numeric|exists:accounts,id',
            'status' => 'string|exists:statuses,name',
        ]);
        $user = auth()->user();
        if(!$request->status_desc){
            $validatedData['status_desc'] = null;
        }
        $validatedData['company_id'] = $user->company->id;
        $account = $user->company->accounts()->findOrFail($validatedData['account_id']);
        $loan = $account->loans()->create($validatedData);
        if($request->status) {
            $loan->setStatus($validatedData['status'], $validatedData['status_desc']);
        }
        return response()->json('Loan Created!', 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $loan = Loan::findOrFai($id);
        $account = auth()->user()->company->accounts()->findOrFail($loan->account_id);
        if($account) {
            $loan['account'] = Account::findOrFail($loan->account_id);
            return response()->json($loan, 200);
        }
        return response()->json('No permission to view loan.');
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
            'amount' => 'sometimes|required|numeric',
            'loan_date' => 'sometimes|required|date|after:yesterday',
            'amortizations' => 'sometimes|required|numeric',
            'percentage' => 'sometimes|required|numeric|between:0,100',
            // 'total_interest_rate' => 'sometimes|required|numeric|between:0,100',
            'account_id' => 'sometimes|required|numeric|exists:accounts,id',
            'status' => 'string|exists:statuses,name'
        ]);
        if(!$request->status_desc){
            $validatedData['status_desc'] = null;
        }
        $loan = auth()->user()->company->loans()->findOrFail($id);
        $loan->update($validatedData);
        if($request->status) {
            $loan->setStatus($validatedData['status'], $validatedData['status_desc']);
        }
        $loan->save();
        return response()->json('Loan Updated!', 204);
    }
}
