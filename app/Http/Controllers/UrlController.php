<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\UrlService;

class UrlController extends Controller
{

  protected $urlService;

  public function __construct(UrlService $urlService)
  {
    $this->urlService = $urlService;
  }

  public function index()
  {
    return $this->urlService->getUrlsByUserId();
  }

  public function create()
  {
    return $this->urlService->createUrl();
  }
}
