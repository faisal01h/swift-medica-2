<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Sprout\Contracts\Tenant as TenantContract;
use Sprout\Database\Eloquent\Concerns\IsTenant;

class Tenant extends Model implements TenantContract
{
    use SoftDeletes, IsTenant;

    protected $fillable = [
        'name',
        'slug',
        'domain',
        'data',
    ];

    protected $casts = [
        'data' => 'array',
    ];
}
