<?php

namespace App\Services;

use App\Constants\ResponseMessages;
use App\Constants\ResponseStatusCode;
use App\Models\Url;
use App\Models\User;
use App\Repositories\Contracts\UrlRepositoryInterface;
use App\Traits\ApiResponser;
use App\Validators\UrlValidator;
use Carbon\Carbon;

class UrlService
{
  use ApiResponser;

  protected $urlRepository;

  public function __construct(UrlRepositoryInterface $urlRepository)
  {
    $this->urlRepository = $urlRepository;
  }

  public function getUrlsByUserId()
  {
    $urls = $this->urlRepository->getUrlsByUser(auth()->user()->id);
    return $this->successResponse($urls, null, ResponseStatusCode::SUCCESS);
  }

  public function createUrl()
  {
    $validator = UrlValidator::validateUrl();
    $user = User::find(auth()->user()->id);

    if ($validator->fails()) {
      return $this->errorResponse($validator->errors(), ResponseStatusCode::UNPROCESSABLE_ENTITY);
    }

    // $html = @file_get_contents('https://aaaaaaa.com', false, stream_context_create(['http' => ['ignore_errors' => true]]));
    // if ($html) {
    //   $status_code_header = $http_response_header[25] ?? null;
    //   dd($html);
    //   $str = explode(' ', $status_code_header);
    //   $status_code = $str[1];
    // }



    $url = $user->urls()->save(new Url($validator->validated()));

    return $this->successResponse($url, ResponseMessages::URL_CREATED, ResponseStatusCode::SUCCESS);
  }
}
