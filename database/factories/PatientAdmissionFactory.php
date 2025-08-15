<?php

namespace Database\Factories;

use App\Models\PatientAdmission;
use App\Models\Patient;
use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

class PatientAdmissionFactory extends Factory
{
    protected $model = PatientAdmission::class;

    public function definition()
    {
        return [
            'patient_id' => Patient::factory(),
            'admission_date' => $this->faker->date(),
            'discharge_date' => null,
            'room_id' => Room::factory(),
            'notes' => $this->faker->sentence(),
        ];
    }
}
