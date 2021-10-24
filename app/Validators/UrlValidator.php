<?php

namespace App\Validators;

use App\Constants\Url;
use Illuminate\Support\Facades\Validator;

class UrlValidator
{

  static function validateUrl()
  {
    return Validator::make(request()->all(), [
      Url::LABEL => 'required|string|max:255',
      Url::URL => 'required|string|max:255'
    ]);
  }
}
