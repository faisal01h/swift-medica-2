<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Broadcast;
use App\Models\User;
use App\Models\Patient;
use App\Models\Room;
use App\Models\PatientAdmission;
use App\Events\AdmissionCreated;
use App\Events\AdmissionUpdated;
use App\Events\AdmissionDeleted;
use Carbon\Carbon;

class AdmissionWebsocketTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        // Fake broadcasting to intercept websockets during tests
        Broadcast::fake();
    }

    public function test_admission_created_event_dispatched()
    {
        /** @var \Illuminate\Contracts\Auth\Authenticatable $user */
        $user = User::factory()->create();
        $patient = Patient::factory()->create();
        $room = Room::factory()->create();

        $this->actingAs($user)
             ->post(route('admissions.store'), [
                 'patient_id' => $patient->id,
                 'admission_date' => Carbon::now()->toDateString(),
                 'room_id' => $room->id,
                 'notes' => 'Test note',
             ])->assertRedirect();

        // Assert websocket broadcast occurred on admissions channel
        Broadcast::assertBroadcasted(AdmissionCreated::class, function ($event, $channel) use ($patient, $room) {
            return $channel === 'admissions'
                && $event->admission->patient_id === $patient->id
                && $event->admission->room_id === $room->id;
        });
    }

    public function test_admission_updated_event_dispatched()
    {
        /** @var \Illuminate\Contracts\Auth\Authenticatable $user */
        $user = User::factory()->create();
        $admission = PatientAdmission::factory()->create();
        $newNotes = 'Updated notes';

        $this->actingAs($user)
             ->put(route('admissions.update', $admission->id), [
                 'patient_id' => $admission->patient_id,
                 'admission_date' => $admission->admission_date,
                 'discharge_date' => $admission->discharge_date,
                 'room_id' => $admission->room_id,
                 'notes' => $newNotes,
             ])->assertRedirect();

        // Assert websocket broadcast occurred on admissions channel
        Broadcast::assertBroadcasted(AdmissionUpdated::class, function ($event, $channel) use ($newNotes, $admission) {
            return $channel === 'admissions'
                && $event->admission->id === $admission->id
                && $event->admission->notes === $newNotes;
        });
    }

    public function test_admission_deleted_event_dispatched()
    {
        /** @var \Illuminate\Contracts\Auth\Authenticatable $user */
        $user = User::factory()->create();
        $admission = PatientAdmission::factory()->create();

        $this->actingAs($user)
             ->delete(route('admissions.destroy', $admission->id))
             ->assertRedirect();

        // Assert websocket broadcast occurred on admissions channel
        Broadcast::assertBroadcasted(AdmissionDeleted::class, function ($event, $channel) use ($admission) {
            return $channel === 'admissions'
                && $event->admissionId === $admission->id;
        });
    }
}
