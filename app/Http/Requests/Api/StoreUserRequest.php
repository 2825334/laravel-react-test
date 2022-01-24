<?php


namespace App\Http\Requests\Api;

use App\Http\Requests\Api\BaseAPIRequest;

class StoreUserRequest extends BaseAPIRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'name' => 'required',
            'email' => 'required|unique:users',
            'phone' => 'required|min:10|max:10',
            'address' => 'required'
        ];

        return $rules;
    }
}