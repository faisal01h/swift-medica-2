<?php

namespace Database\Factories;

use App\Models\Room;
use App\Models\Location;
use App\Models\RoomType;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoomFactory extends Factory
{
    protected $model = Room::class;

    public function definition()
    {
        return [
            'location_id' => Location::factory(),
            'room_type_id' => RoomType::factory(),
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'capacity' => $this->faker->numberBetween(1, 4),
        ];
    }
}
