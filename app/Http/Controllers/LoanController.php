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
        $loans = Loan::all();
        foreach($loans as $loan){
            $loan['status'] = $loan->status();
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
            'account_id' => 'required|exists:accounts,id',
            'status'=> 'string|exists:statuses,name'
        ]);
        if(!$request->status_desc){
            $validatedData['status_desc'] = null;
        }
        $loan = Loan::create($validatedData);
        if($request->status){
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
        $loan = Loan::findOrFail($id);
        $loan['status'] = $loan->status();
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
        $validatedData = $request->validate([
            'amount' => 'sometimes|required|numeric',
            'loan_date' => 'sometimes|required|date|after:yesterday',
            'amortizations' => 'sometimes|required|numeric',
            'percentage' => 'sometimes|required|numeric|between:0,100',
            'account_id' => 'sometimes|required|exists:accounts,id',
            'status' => 'string|exists:statuses,name',
        ]);
        if(!$request->status_desc){
            $validatedData['status_desc'] = null;
        }
        $loan = Loan::findOrFail($id);
        if($request->status){
            $loan->setStatus($validatedData['status'], $validatedData['status_desc']);
        }
        $loan->update($validatedData);
        return response()->json('Loan Updated!', 204);
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
