<?php

use App\Http\Controllers\Api\AutenticationController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/create', [UserController::class, 'create']);
Route::post('/login', [AutenticationController::class, 'login']);
Route::post('/logout', [AutenticationController::class, 'logout']);
