<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\UserRequest;
use App\Services\UserService;
use Illuminate\Routing\Controller;

class UserController extends Controller
{
    public function __construct(private UserService $userService)
    {
    }

    public function create(UserRequest $request)
    {
        $this->userService->create($request->array());

        return response()->json([
            "success" => true,
            "Cadastro realizado com sucesso!",
            "code" => 200
        ]);
    }
}
