<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Facades\Response;
use Illuminate\Validation\ValidationException;

/**
 * Class BaseAPIRequest
 * @package App\Http\Requests\Api
 */
class BaseAPIRequest extends FormRequest
{
    /**
     * @param Validator $validator
     * @throws ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        $except = new ValidationException($validator);
        $except->response = Response::json(['error' => ['code' => 406, 'message' => $validator->errors()->first()]], 406);
        throw $except;
    }
}