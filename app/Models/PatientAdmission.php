<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Patient;
use App\Models\Room;
use App\Models\User;

class PatientAdmission extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'patient_id',
        'admission_date',
        'discharge_date',
        'room_id',
        'notes',
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    public function doctors(): BelongsToMany
    {
        return $this->belongsToMany(
            User::class,
            'patient_admission_doctors',
            'patient_admission_id',
            'doctor_id'
        )->withPivot('notes')->withTimestamps();
    }
}
