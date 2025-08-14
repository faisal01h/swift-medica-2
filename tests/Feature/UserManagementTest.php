<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Str;

class UserManagementTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function guest_is_redirected_to_login_when_accessing_users_index()
    {
        $response = $this->get(route('users.index'));
        $response->assertRedirect(route('login'));
    }

    /** @test */
    public function authenticated_user_can_view_users_index()
    {
        /** @var \App\Models\User&\Illuminate\Contracts\Auth\Authenticatable $user */
        $user = User::factory()->createOne();
        $response = $this->actingAs($user)->get(route('users.index'));
        $response->assertStatus(200);
    }

    /** @test */
    public function authenticated_user_can_create_update_and_delete_user()
    {
        /** @var \App\Models\User&\Illuminate\Contracts\Auth\Authenticatable $admin */
        $admin = User::factory()->createOne();
        $role = Role::create(['name' => 'Admin', 'slug' => 'admin']);

        // Create
        $userData = [
            'name' => 'Test User',
            'email' => 'testuser@example.com',
            'password' => 'secret',
            'password_confirmation' => 'secret',
            'roles' => [$role->id],
        ];
        $response = $this->actingAs($admin)->post(route('users.store'), $userData);
        $response->assertRedirect(route('users.index'));
        $this->assertDatabaseHas('users', ['email' => 'testuser@example.com']);
        $user = User::where('email', 'testuser@example.com')->first();
        $this->assertTrue($user->hasRole('Admin'));

        // Update
        $newRole = Role::create(['name' => 'Editor', 'slug' => 'editor']);
        $updateData = [
            'name' => 'Updated User',
            'email' => 'updated@example.com',
            'roles' => [$newRole->id],
        ];
        $response = $this->actingAs($admin)->put(route('users.update', $user), $updateData);
        $response->assertRedirect(route('users.index'));
        $this->assertDatabaseHas('users', ['email' => 'updated@example.com', 'name' => 'Updated User']);
        $this->assertTrue($user->fresh()->hasRole('Editor'));

        // Delete
        $response = $this->actingAs($admin)->delete(route('users.destroy', $user));
        $response->assertRedirect(route('users.index'));
        $this->assertSoftDeleted('users', ['email' => 'updated@example.com']);
    }
}
