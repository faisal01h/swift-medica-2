<?php

namespace App\Http\Controllers\Admission;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Patient;
use App\Models\Room;
use App\Models\PatientAdmission;

class AdmissionController extends Controller
{
    // This controller will handle admission-related functionalities
    // such as creating, updating, and managing patient admissions.

    public function index(Request $request)
    {
        $cursor = $request->input('cursor');
        $admissions = PatientAdmission::with(['patient', 'room'])
            ->orderBy('id')
            ->cursorPaginate(10, ['*'], 'cursor', $cursor);
        return Inertia::render('Admission/Index', [
            'admissions' => $admissions,
        ]);
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
        PatientAdmission::create($data);
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
        return redirect()->route('admissions.index')->with('success', 'Admission updated successfully.');
    }
    
    /**
     * Remove the specified admission.
     */
    public function destroy($id)
    {
        $admission = PatientAdmission::findOrFail($id);
        $admission->delete();
        return redirect()->route('admissions.index')->with('success', 'Admission deleted successfully.');
    }
}