<?php

namespace App\Exceptions;

use App\Exceptions\AbstractException;


class LoginException extends AbstractException
{
    public function __construct(string $message = "Erro ao realizar o acesso ao sistema", int $code = 0, ?Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    public function render($request)
    {
        return response()->json([
            'error' => true,
            'message' => $this->getMessage(),
            'code' => $this->getCode()
        ], 404);
    }
}