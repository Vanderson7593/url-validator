<?php

namespace App\Repositories;

use App\Constants\Model;
use App\Constants\Url as ConstantsUrl;
use App\Repositories\Contracts\UrlRepositoryInterface;
use App\Models\Url;

class UrlRepository implements UrlRepositoryInterface
{
  protected $entity;

  public function __construct(Url $url)
  {
    $this->entity = $url;
  }

  /**
   * Create new Url
   * @param array $url
   * @return object
   */
  public function createUrl(array $course)
  {
    return $this->entity->create($course);
  }

  /**
   * Get all user URLs
   * @param int $userID
   * @return array
   */
  public function getUrlsByUser($userId)
  {
    return $this->entity->where(ConstantsUrl::USER_ID, $userId)->get();
  }

  /**
   * Get URL by id 
   * @param int $urlId
   * @return object
   */
  public function getUrlById($urlId)
  {
    return $this->entity->where(Model::ID, $urlId)->get();
  }

  /**
   * Get all URLs
   * @return array
   */
  public function getAll()
  {
    return $this->entity->all();
  }
}
