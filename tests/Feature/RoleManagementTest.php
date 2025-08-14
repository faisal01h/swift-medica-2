<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleManagementTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function guest_is_redirected_to_login_when_accessing_roles_index()
    {
        $response = $this->get(route('roles.index'));
        $response->assertRedirect(route('login'));
    }

    /** @test */
    public function authenticated_user_can_view_roles_index()
    {
        /** @var \App\Models\User&\Illuminate\Contracts\Auth\Authenticatable $user */
        $user = User::factory()->createOne();
        $response = $this->actingAs($user)->get(route('roles.index'));
        $response->assertStatus(200);
    }

    /** @test */
    public function authenticated_user_can_create_update_and_delete_role()
    {
        /** @var \App\Models\User&\Illuminate\Contracts\Auth\Authenticatable $user */
        $user = User::factory()->createOne();

        // Create
        $response = $this->actingAs($user)->post(route('roles.store'), [
            'name' => 'TestRole',
            'slug' => 'test-role',
            'description' => 'Test description',
            'guard_name' => 'web',
        ]);
        $response->assertRedirect(route('roles.index'));
        $this->assertDatabaseHas('roles', ['name' => 'TestRole', 'slug' => 'test-role']);

        $role = Role::where('name', 'TestRole')->first();

        // Update
        $response = $this->actingAs($user)->put(route('roles.update', $role), [
            'name' => 'UpdatedRole',
            'slug' => 'updated-role',
            'description' => 'Updated description',
            'guard_name' => 'web',
        ]);
        $response->assertRedirect(route('roles.index'));
        $this->assertDatabaseHas('roles', ['name' => 'UpdatedRole', 'slug' => 'updated-role']);

        // Delete
        $response = $this->actingAs($user)->delete(route('roles.destroy', $role));
        $response->assertRedirect(route('roles.index'));
        $this->assertDatabaseMissing('roles', ['name' => 'UpdatedRole']);
    }

    /** @test */
    public function authenticated_user_can_update_role_permissions()
    {
        /** @var \App\Models\User&\Illuminate\Contracts\Auth\Authenticatable $user */
        $user = User::factory()->createOne();
        $role = Role::create(['name' => 'Manager', 'slug' => 'manager']);
        $perm1 = Permission::create(['name' => 'edit articles', 'guard_name' => 'web']);
        $perm2 = Permission::create(['name' => 'delete articles', 'guard_name' => 'web']);

        $response = $this->actingAs($user)->put(route('roles.permissions.update', $role), [
            'permissions' => [$perm1->id],
        ]);
        $response->assertRedirect(route('roles.index'));

        $this->assertTrue(
            $role->fresh()->hasPermissionTo($perm1)
        );
        $this->assertFalse(
            $role->fresh()->hasPermissionTo($perm2)
        );
    }
}
