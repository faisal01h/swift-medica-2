<?php

namespace Tests\Unit\Events;

use Tests\TestCase;
use App\Events\AdmissionDeleted;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class AdmissionDeletedTest extends TestCase
{
    public function test_event_implements_should_broadcast()
    {
        $event = new AdmissionDeleted(123);
        $this->assertInstanceOf(ShouldBroadcast::class, $event);
    }

    public function test_broadcast_on_channel()
    {
        $event = new AdmissionDeleted(123);
        $channel = $event->broadcastOn();
        $this->assertInstanceOf(Channel::class, $channel);
        $this->assertEquals('admissions', $channel->name);
    }

    public function test_broadcast_with_includes_admission_id()
    {
        $event = new AdmissionDeleted(123);
        $payload = $event->broadcastWith();
        $this->assertArrayHasKey('admissionId', $payload);
        $this->assertEquals(123, $payload['admissionId']);
    }
}
