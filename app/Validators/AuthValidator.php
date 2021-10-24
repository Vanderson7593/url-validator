<?php

namespace App\Validators;

use App\Constants\Auth;
use App\Constants\User;
use Illuminate\Support\Facades\Validator;

class AuthValidator
{

  static function validateAuthRegister()
  {
    return Validator::make(request()->all(), [
      User::NAME => 'required|string|between:2,100',
      User::EMAIL => 'required|string|email|max:100|unique:users',
      User::PASSWORD => 'required|string|min:6',
    ]);
  }

  static function validateAuthLogin()
  {
    return Validator::make(request()->all(), [
      User::EMAIL => 'required|string|email',
      User::PASSWORD => 'required|string|min:6',
    ]);
  }
}
