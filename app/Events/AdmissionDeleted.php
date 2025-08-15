<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class AdmissionDeleted implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public int $admissionId;

    /**
     * Create a new event instance.
     */
    public function __construct(int $admissionId)
    {
        $this->admissionId = $admissionId;
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
        return ['admissionId' => $this->admissionId];
    }
}
