<?php

namespace App\Http\Controllers\Admission;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Patient;
use App\Models\Room;
use App\Models\PatientAdmission;
use App\Events\AdmissionCreated;
use App\Events\AdmissionUpdated;
use App\Events\AdmissionDeleted;

class AdmissionController extends Controller
{
    // This controller will handle admission-related functionalities
    // such as creating, updating, and managing patient admissions.

    public function index(Request $request)
    {
        // Listing is handled via AJAX and real-time events
        return Inertia::render('Admission/Index');
    }

    public function create()
    {
        $patients = Patient::all();
        $rooms = Room::all();
        return Inertia::render('Admission/Create', [
            'patients' => $patients,
            'rooms' => $rooms,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'admission_date' => 'required|date',
            'discharge_date' => 'nullable|date',
            'room_id' => 'required|exists:rooms,id',
            'notes' => 'nullable|string',
        ]);
        $admission = PatientAdmission::create($data);
        // Broadcast the creation event for real-time listeners
        broadcast(new AdmissionCreated($admission));
        return redirect()->route('admissions.index')->with('success', 'Admission created successfully.');
    }

    public function show($id)
    {
        $admission = PatientAdmission::with(['patient', 'room', 'doctors'])
            ->findOrFail($id);
        return Inertia::render('Admission/Show', [
            'admission' => $admission,
        ]);
    }

    public function edit($id)
    {
        $admission = PatientAdmission::findOrFail($id);
        $patients = Patient::all();
        $rooms = Room::all();
        return Inertia::render('Admission/Edit', [
            'admission' => $admission,
            'patients' => $patients,
            'rooms' => $rooms,
        ]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'admission_date' => 'required|date',
            'discharge_date' => 'nullable|date',
            'room_id' => 'required|exists:rooms,id',
            'notes' => 'nullable|string',
        ]);
        $admission = PatientAdmission::findOrFail($id);
        $admission->update($data);
        // Broadcast the update event for real-time listeners
        broadcast(new AdmissionUpdated($admission));
        return redirect()->route('admissions.index')->with('success', 'Admission updated successfully.');
    }
    
    /**
     * Remove the specified admission.
     */
    public function destroy($id)
    {
        $admission = PatientAdmission::findOrFail($id);
        $admissionId = $admission->id;
        $admission->delete();
        // Broadcast the deletion event for real-time listeners
        broadcast(new AdmissionDeleted($admissionId));
        return redirect()->route('admissions.index')->with('success', 'Admission deleted successfully.');
    }
    
    /**
     * Return JSON list of all admissions.
     */
    public function fetch(Request $request)
    {
        $admissions = PatientAdmission::with(['patient','room'])
                        ->orderBy('id')->get();
        return response()->json($admissions);
    }
}