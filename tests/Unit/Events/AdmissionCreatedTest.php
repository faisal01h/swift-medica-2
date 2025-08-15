<?php

namespace Tests\Unit\Events;

use Tests\TestCase;
use App\Events\AdmissionCreated;
use App\Models\PatientAdmission;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class AdmissionCreatedTest extends TestCase
{
    public function test_admission_created_event_implements_should_broadcast()
    {
        $admission = PatientAdmission::factory()->make();
        $event = new AdmissionCreated($admission);

        $this->assertInstanceOf(ShouldBroadcast::class, $event);
    }

    public function test_broadcast_on_returns_admissions_channel()
    {
        $admission = PatientAdmission::factory()->make();
        $event = new AdmissionCreated($admission);

        $channel = $event->broadcastOn();
        $this->assertInstanceOf(Channel::class, $channel);
        $this->assertEquals('admissions', $channel->name);
    }

    public function test_broadcast_with_includes_admission_data()
    {
        $admission = PatientAdmission::factory()->make();
        $event = new AdmissionCreated($admission);

        $payload = $event->broadcastWith();
        $this->assertArrayHasKey('admission', $payload);
        $this->assertEquals($event->admission, $payload['admission']);
    }
}
