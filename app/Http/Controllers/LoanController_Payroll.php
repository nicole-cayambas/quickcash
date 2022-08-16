<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Loan;
use App\Models\Company;


class LoanController_Payroll extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // untested
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
        // untested
        $request->validate([
            'amount' => 'required|numeric',
            'loan_date' => 'required|date|before_or_equal:today',
            'amortizations' => 'required|numeric',
            'percentage' => 'required|numeric|between:0,100',
            'total_interest_rate' => 'required|numeric|between:0,100',
        ]);
        $loan = $request->user()->company->loans()->create($request->all());
        if($request->status){
            $loan->setStatus($request->status);
        } else $loan->setStatus('Pending');
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
        //untested
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
        //untested
        $request->validate([
            'amount' => 'sometimes|required|numeric',
            'loan_date' => 'sometimes|required|date|before_or_equal:today',
            'amortizations' => 'sometimes|required|numeric',
            'percentage' => 'sometimes|required|numeric|between:0,100',
            'total_interest_rate' => 'sometimes|required|numeric|between:0,100',
        ]);

        $loan = auth()->user()->company->loans()->findOrFail($id);
        $loan->update($request->all());
        if($request->status) {
            $loan->setStatus($request->status);
        }
        $loan->save();
        return response()->json($loan, 200);
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
        auth()->user()->company->loans()->delete();
        return response()->json('Loan deleted.', 204);
    }
}
