<?php

namespace App\Repositories;

use App\Constants\Model;
use App\Constants\User as ConstantsUser;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Models\User;

class UserRepository implements UserRepositoryInterface
{
  protected $entity;

  public function __construct(User $user)
  {
    $this->entity = $user;
  }

  /**
   * Get User by id 
   * @param int $userId
   * @return object
   */
  public function getUserById($userId)
  {
    return $this->entity->where(Model::ID, $userId)->first();
  }
}
