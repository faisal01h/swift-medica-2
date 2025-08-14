<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\PatientAdmission;

class Patient extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'date_of_birth',
        'identity_number',
        'gender',
        'address',
        'emergency_contact_name',
        'emergency_contact_phone',
    ];

    public function admissions(): HasMany
    {
        return $this->hasMany(PatientAdmission::class);
    }
}
