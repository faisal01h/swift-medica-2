<?php

namespace App\Events;

use App\Models\PatientAdmission;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class AdmissionUpdated implements ShouldBroadcast
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
    public function broadcastOn(): Channel
    {
        return new Channel('admissions');
    }

    /**
     * Data to broadcast.
     *
     * @return array
     */
    public function broadcastWith(): array
    {
        return ['admission' => $this->admission];
    }
}
