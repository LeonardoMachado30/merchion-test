<?php

namespace App\Http\Exceptions;

use Exception;

class CreateUserException extends Exception
{
    public function __construct(string $message = "Erro ao criar usuário", int $code = 0, ?Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    public function render($request)
    {
        return response()->json([
            'error' => true,
            'message' => $this->getMessage(),
            'code' => $this->getCode()
        ], 422);
    }
}
