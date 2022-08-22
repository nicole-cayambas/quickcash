<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Loan;


class LoanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Loan::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'loan_date' => 'required|date|after:yesterday',
            'amortizations' => 'required|numeric',
            'percentage' => 'required|numeric|between:0,100',
            // 'total_interest_rate' => 'required|numeric|between:0,100',
            // 'company_id' => 'required|exists:companies,id',
            'account_id' => 'required|exists:accounts,id',
        ]);
        $loan = Loan::create($request->all());
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
        return Loan::findOrFail($id);
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
            'loan_date' => 'sometimes|required|date|after:yesterday',
            'amortizations' => 'sometimes|required|numeric',
            'percentage' => 'sometimes|required|numeric|between:0,100',
            // 'total_interest_rate' => 'sometimes|required|numeric|between:0,100',
            // 'company_id' => 'sometimes|required|exists:companies,id',
            'account_id' => 'sometimes|required|exists:accounts,id',
        ]);

        $loan = Loan::findOrFail($id);
        $loan->update($request->all());
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
        Loan::findOrFail($id)->delete();
        return response()->json('Loan deleted.', 204);
    }


    
}
