<?php

namespace App\Events;

use App\Models\PatientAdmission;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class AdmissionCreated implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public PatientAdmission $admission;

    /**
     * Create a new event instance.
     */
    public function __construct(PatientAdmission $admission)
    {
        $this->admission = $admission->load('patient', 'room');
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('admissions');
    }

    /**
     * Data to broadcast.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return ['admission' => $this->admission];
    }
}
