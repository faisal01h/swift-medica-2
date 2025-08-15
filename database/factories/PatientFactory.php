<?php

namespace Database\Factories;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;

class PatientFactory extends Factory
{
    protected $model = Patient::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'date_of_birth' => $this->faker->date(),
            'identity_number' => $this->faker->ean13(),
            'gender' => $this->faker->randomElement(['male','female']),
            'address' => $this->faker->address(),
            'emergency_contact_name' => $this->faker->name(),
            'emergency_contact_phone' => $this->faker->phoneNumber(),
        ];
    }
}
