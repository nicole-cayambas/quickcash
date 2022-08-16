<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Loan;
use App\Models\Company;
use App\Models\Account;


class LoanController_Employee extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $loans = auth()->user()->account->loans()->get();
        return response()->json($loans, 200);
    }

    /**
     * Store a newly created resource in storage.
     * EMPLOYEES CAN APPLY FOR A LOAN
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'loan_date' => 'required|date|before_or_equal:today',
            'amortizations' => 'required|numeric',
            'percentage' => 'required|numeric|between:0,100',
            'total_interest_rate' => 'required|numeric|between:0,100',
        ]);
        $dataToSave = $request->all();
        $dataToSave['company_id'] = auth()->user()->account->company_id;
        $loan = $request->user()->account->loans()->create($dataToSave);
        $loan->setStatus('Pending');
        $loan->save();
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
        $loan = auth()->user()->account->loans()->findOrFail($id);
        return response()->json($loan, 200);
    }
}
