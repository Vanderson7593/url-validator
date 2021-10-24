<?php

namespace App\Http\Controllers;

use App\Constants\ResponseMessages;
use App\Constants\ResponseStatusCode;
use Illuminate\Http\Request;

use App\Models\User;
use App\Traits\ApiResponser;
use App\Validators\AuthValidator;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    use ApiResponser;

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $validator = AuthValidator::validateAuthLogin();

        if ($validator->fails()) {
            return $this->errorResponse($validator->errors(), 422);
        }

        if (!$token = auth()->attempt($validator->validated())) {
            return $this->errorResponse(ResponseMessages::INVALID_CREDENTIALS, 422);
        }

        return $this->successResponse($this->createNewToken($token), null, ResponseStatusCode::SUCCESS);
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = AuthValidator::validateAuthRegister();

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)]
        ));

        return $this->successResponse($user, ResponseMessages::USER_CREATED, ResponseStatusCode::SUCCESS);
    }


    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
        return $this->successResponse(null, null);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        $data = $this->createNewToken(auth()->refresh());
        return $this->successResponse($data, null, ResponseStatusCode::SUCCESS);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return $this->successResponse(auth()->user(), null, ResponseStatusCode::SUCCESS);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ];
    }
}
