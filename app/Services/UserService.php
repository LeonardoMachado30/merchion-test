<?php


namespace App\Services;

use App\Exceptions\PerfilDigital\CreateUserException;
use App\Models\User;

class UserService
{
    public function create(array $user): bool
    {
        $user['senha'] = bcrypt(value: $user['senha']);

        $userModel = new User();

        if (!$userModel->createUser($user)) {
            throw new CreateUserException();
        }

        return true;
    }
}