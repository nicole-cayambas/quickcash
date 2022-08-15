<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Hash;
// use Carbon\Carbon;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        try{
            $validatedData = $request->validate(
                [
                    'first_name' => 'required|max:55',
                    'last_name' => 'required|max:55',
                    'email' => 'required|email|unique:users',
                    'password' => 'required|min:6',
                ]
            );
    
            $user = User::create([
                'first_name' => $validatedData['first_name'],
                'last_name' => $validatedData['last_name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
            ]);
            $token = $user->createToken('apiToken')->plainTextToken;
            $res = [
                'token' => $token,
                'user' => $user
            ];
            return response()->json($res, 201);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Something went wrong'.$th
            ], 500);
        }
        
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            // 'remember_me' => 'boolean'
        ]);
        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }
        $user = $request->user();
        $token = $user->createToken('apiToken')->plainTextToken;

        $res = [
            'token' => $token,
            'user' => $user
        ];
        return response()->json($res, 200);
    }


    public function logout(Request $request)
    {
        dd('logout reached');
        if($request->user()) {
            $request->user()->tokens()->delete();
            return response()->json([
                'message' => 'Successfully logged out'
            ], 200);
        }
        return response()->json([
            'message' => 'No user logged in'
        ], 401);
    }
}
