<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Patient;

class PatientManagementTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function guest_is_redirected_to_login_when_accessing_patient_index()
    {
        $response = $this->get(route('patients.index'));
        $response->assertRedirect(route('login'));
    }

    /** @test */
    public function authenticated_user_can_view_patient_index()
    {
        /** @var \App\Models\User&\Illuminate\Contracts\Auth\Authenticatable $user */
        $user = User::factory()->createOne();
        $response = $this->actingAs($user)->get(route('patients.index'));
        $response->assertStatus(200);
    }

    /** @test */
    public function authenticated_user_can_fetch_patients_json()
    {
        /** @var \App\Models\User&\Illuminate\Contracts\Auth\Authenticatable $user */
        $user = User::factory()->createOne();
        // Create patients directly
        Patient::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '1234567890',
            'date_of_birth' => '1990-01-01',
            'identity_number' => 'ID123',
            'gender' => 'male',
            'address' => '123 Main St',
            'emergency_contact_name' => 'Jane Doe',
            'emergency_contact_phone' => '0987654321',
        ]);
        $response = $this->actingAs($user)->getJson(route('patients.fetch', ['per_page' => 1]));
        $response->assertOk()
                 ->assertJsonStructure([
                     'data',
                     'current_page',
                     'last_page',
                     'per_page',
                     'total',
                 ]);
    }

    /** @test */
    public function authenticated_user_can_create_update_and_delete_patient()
    {
        /** @var \App\Models\User&\Illuminate\Contracts\Auth\Authenticatable $user */
        $user = User::factory()->createOne();
        $patientData = [
            'name' => 'Alice Smith',
            'email' => 'alice@example.com',
            'phone' => '5551234567',
            'date_of_birth' => '1985-05-15',
            'identity_number' => 'ID456',
            'gender' => 'female',
            'address' => '456 Elm St',
            'emergency_contact_name' => 'Bob Smith',
            'emergency_contact_phone' => '7676767676',
        ];
        // Create
        $response = $this->actingAs($user)->post(route('patients.store'), $patientData);
        $response->assertRedirect(route('patients.index'));
        $this->assertDatabaseHas('patients', ['email' => 'alice@example.com']);

        $patient = Patient::where('email', 'alice@example.com')->first();

        // Update
        $updateData = ['name' => 'Alice Updated', 'email' => 'alice.updated@example.com'] + $patientData;
        $response = $this->actingAs($user)->put(route('patients.update', $patient), $updateData);
        $response->assertRedirect(route('patients.index'));
        $this->assertDatabaseHas('patients', ['email' => 'alice.updated@example.com', 'name' => 'Alice Updated']);

        // Delete
        $response = $this->actingAs($user)->delete(route('patients.destroy', $patient));
        $response->assertRedirect(route('patients.index'));
        $this->assertSoftDeleted('patients', ['email' => 'alice.updated@example.com']);
    }
}
