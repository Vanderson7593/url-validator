<?php

namespace App\Models;

use App\Constants\Url as UrlContants;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Url extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var string[]
   */
  protected $fillable = [
    UrlContants::LABEL,
    UrlContants::URL,
    UrlContants::STATUS,
    UrlContants::HTML,
    UrlContants::PROCESSED_AT,
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array
   */
  protected $hidden = [
    UrlContants::USER_ID
  ];

  protected $attributes = [
    UrlContants::IS_PROCESSED => false,
    UrlContants::PROCESSED_AT => null,
    UrlContants::HTML => null,
    UrlContants::STATUS => null,
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
