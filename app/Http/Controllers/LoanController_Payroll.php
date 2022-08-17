<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Loan;
use App\Models\Company;
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
        $loans = auth()->user()->company->loans()->get();
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
            'loan_date' => 'required|date|before_or_equal:today',
            'amortizations' => 'required|numeric',
            'percentage' => 'required|numeric|between:0,100',
            'total_interest_rate' => 'required|numeric|between:0,100',
            'account_id' => 'required|numeric|exists:accounts,id',
        ]);
        $loan = auth()->user()->company->loans()->create($request->all());
        $loan->setStatus('Pending', 'Loan initialized');
        return response()->json($loan, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $loan = auth()->user()->company->loans()->findOrFail($id);
        return response()->json($loan, 200);
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
        $request->validate([
            'amount' => 'sometimes|required|numeric',
            'loan_date' => 'sometimes|required|date|before_or_equal:today',
            'amortizations' => 'sometimes|required|numeric',
            'percentage' => 'sometimes|required|numeric|between:0,100',
            'total_interest_rate' => 'sometimes|required|numeric|between:0,100',
            'account_id' => 'sometimes|required|numeric|exists:accounts,id',
        ]);

        $loan = auth()->user()->company->loans()->findOrFail($id);
        $loan->update($request->all());
        if($request->status) {
            $loan->setStatus($request->status);
        }
        $loan->save();
        return response()->json($loan, 200);
    }

    public function setStatus(Request $request, $id)
    {
        // probs need to password protect this function
        $validatedData = $request->validate([
            'status' => 'required|string|in:Pending,Approved,Rejected,Cancelled,Completed',
            'message' => 'string',
        ]);
        $loan = auth()->user()->company->loans()->findOrFail($id);
        $loan->setStatus($request->status, $request->message);
        if($loan->status == 'Approved') {
        }
        return response()->json($loan, 200);
    }
}
