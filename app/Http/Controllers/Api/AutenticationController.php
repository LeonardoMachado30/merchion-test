<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\LoginException;
use App\Http\Requests\LoginUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;

class AutenticationController extends Controller
{
    public function login(LoginUserRequest $request)
    {
        $userModel = new User();

        $user = $userModel->getUserForEmail($request->input("email"));
        if (!$user || !Hash::check($request->input("senha"), $user->senha)) {
            throw new LoginException();
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login realizado com sucesso!',
            'data' => [
                'user' => [
                    'nome' => $user->nome,
                    'email' => $user->email,
                ],
                'token' => $token,
                'token_type' => 'Bearer'
            ],
            'code' => 200
        ]);
    }
    public function logout(Request $request)
    {
        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
        }

        return response()->json([
            'success' => true,
            'code' => 200,
            'message' => 'Logout da sessão atual realizado com sucesso!',
        ]);
    }
}