<?php

namespace App\Http\Middleware;

use App\Constants\ResponseMessages;
use App\Traits\ApiResponser;
use Closure;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class JwtMiddleware extends BaseMiddleware
{
    use ApiResponser;

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            if (!$user) throw new Exception('User Not Found');
        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                return  $this->errorResponse(ResponseMessages::INVALID_TOKEN, 401);
            } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                return  $this->errorResponse(ResponseMessages::TOKEN_EXPIRED, 498);
            } else {
                return  $this->errorResponse($e->getMessage(), 401);
            }
        }
        return $next($request);
    }
}
