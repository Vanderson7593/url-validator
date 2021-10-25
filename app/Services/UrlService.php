<?php

namespace App\Services;

use App\Constants\ResponseMessages;
use App\Constants\ResponseStatusCode;
use App\Models\Url;
use App\Models\User;
use App\Repositories\Contracts\UrlRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Traits\ApiResponser;
use App\Validators\UrlValidator;
use Carbon\Carbon;

class UrlService
{
  use ApiResponser;

  protected $urlRepository;
  protected $userRepository;

  public function __construct(UrlRepositoryInterface $urlRepository, UserRepositoryInterface $userRepository)
  {
    $this->urlRepository = $urlRepository;
    $this->userRepository = $userRepository;
  }

  public function getUrlsByUserId()
  {
    $urls = $this->urlRepository->getUrlsByUser(auth()->user()->id);
    return $this->successResponse($urls, null, ResponseStatusCode::SUCCESS);
  }

  public function createUrl()
  {
    $validator = UrlValidator::validateUrl();
    $user = $this->userRepository->getUserById(auth()->user()->id);

    if ($validator->fails()) {
      return $this->errorResponse($validator->errors(), ResponseStatusCode::UNPROCESSABLE_ENTITY);
    }

    $url = $user->urls()->save(new Url($validator->validated()));

    return $this->successResponse($url, ResponseMessages::URL_CREATED, ResponseStatusCode::SUCCESS);
  }
}
