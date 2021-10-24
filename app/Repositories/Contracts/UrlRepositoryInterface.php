<?php

namespace App\Repositories\Contracts;

interface UrlRepositoryInterface
{
  public function createUrl(array $Url);
  public function getUrlsByUser(int $userId);
  public function getUrlById(int $id);
  public function getAll();
}
