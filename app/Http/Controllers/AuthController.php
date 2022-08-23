<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\VerifyUser;
use App\Mail\VerifyEmail;
use Illuminate\Support\Facades\Auth;
use Hash;
use Mail;
use Str;
use Carbon\Carbon;

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
        $verifiedUser = VerifyUser::create([
            'token' => Str::random(60),
            'user_id' => $user->id
        ]);
        Mail::to($user->email)->send(new VerifyEmail($user));
        $user->assignRole('Employee');
        Auth::login($user);
        return response()->json($verifiedUser);
    }

    public function verifyEmail($token){
        $verifiedUser = VerifyUser::where('token', $token)->first();
        if(isset($verifiedUser)){
            $user = $verifiedUser->user;
            if(!$user->email_verified_at){
                $user->email_verified_at = Carbon::now();
                $user->save();
                Auth::login($user);
                return redirect('/');
            } else return response()->json("Your email has already been verified.");
        } else {
            return redirect('/login')->with('Something went wrong.');
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Unauthorized',
                'code' => 401,
            ], 401);
        }
        $response['code'] = 200;
        $response['message'] = 'Login Successful';
        return response()->json($response, 200);
    }


    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        return response()->json('Successfully logged out');
    }
}
