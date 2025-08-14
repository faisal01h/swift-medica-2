<?php

namespace App\Facades;

class ActivityLogger
{
    protected static $causer;

    /**
     * Set the user who is performing the action.
     *
     * @param mixed $user
     * @return void
     */
    public static function by($user)
    {
        self::$causer = $user;
    }

    /**
     * Log an activity.
     *
     * @param string $message
     * @param mixed $subject
     * @return void
     */
    public static function log(string $message, $subject = null)
    {
        activity()
            ->performedOn($subject)
            ->causedBy(self::$causer ?? request()->user())
            ->log($message);
    }
}