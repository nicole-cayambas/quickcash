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

        Auth::login($user);

        return response()->json('User created successfully!', 201);
        
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        return response()->json('Logged In', 200);
    }


    public function logout(Request $request)
    {
        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json('Successfully logged out');
    }
}
