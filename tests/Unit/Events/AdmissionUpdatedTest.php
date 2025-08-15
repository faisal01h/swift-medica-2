<?php

namespace Tests\Unit\Events;

use Tests\TestCase;
use App\Events\AdmissionUpdated;
use App\Models\PatientAdmission;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class AdmissionUpdatedTest extends TestCase
{
    public function test_event_implements_should_broadcast()
    {
        $admission = PatientAdmission::factory()->make();
        $event = new AdmissionUpdated($admission);

        $this->assertInstanceOf(ShouldBroadcast::class, $event);
    }

    public function test_broadcast_on_returns_correct_channel()
    {
        $admission = PatientAdmission::factory()->make();
        $event = new AdmissionUpdated($admission);

        $channel = $event->broadcastOn();
        $this->assertInstanceOf(Channel::class, $channel);
        $this->assertEquals('admissions', $channel->name);
    }

    public function test_broadcast_with_contains_admission_payload()
    {
        $admission = PatientAdmission::factory()->make();
        $event = new AdmissionUpdated($admission);

        $payload = $event->broadcastWith();

        $this->assertArrayHasKey('admission', $payload);
        $this->assertEquals($event->admission, $payload['admission']);
    }
}
