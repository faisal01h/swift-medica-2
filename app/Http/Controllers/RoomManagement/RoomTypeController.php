<?php

namespace App\Http\Controllers\RoomManagement;

use App\Http\Controllers\Controller;
use App\Models\RoomType;
use Illuminate\Http\Request;

class RoomTypeController extends Controller
{
    public function index(Request $request)
    {
        $roomTypes = RoomType::all();
        return response()->json($roomTypes);
    }

    public function show($id)
    {
        $roomType = RoomType::findOrFail($id);
        return response()->json($roomType);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'default_capacity' => 'required|integer|min:1',
        ]);
        $roomType = RoomType::create($validated);
        return response()->json($roomType, 201);
    }

    public function update(Request $request, $id)
    {
        $roomType = RoomType::findOrFail($id);
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'default_capacity' => 'sometimes|required|integer|min:1',
        ]);
        $roomType->update($validated);
        return response()->json($roomType);
    }

    public function destroy($id)
    {
        $roomType = RoomType::findOrFail($id);
        $roomType->delete();
        return response()->json(null, 204);
    }
}