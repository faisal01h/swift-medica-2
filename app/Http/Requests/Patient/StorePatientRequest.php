<?php

namespace App\Http\Requests\Patient;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePatientRequest extends FormRequest
{
    public function authorize(): bool
    {
        // return request()->user()->can('patients.create');
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255', 'unique:patients,email'],
            'phone' => ['nullable', 'string', 'max:50'],
            'date_of_birth' => ['nullable', 'date'],
            'identity_number' => ['nullable', 'string', 'max:100'],
            'gender' => ['nullable', Rule::in(['male', 'female'])],
            'address' => ['nullable', 'string', 'max:500'],
            'emergency_contact_name' => ['nullable', 'string', 'max:255'],
            'emergency_contact_phone' => ['nullable', 'string', 'max:50'],
        ];
    }
}
