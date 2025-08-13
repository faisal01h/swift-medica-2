<?php

namespace App\Http\Controllers\CustomerRelationship;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Netflie\WhatsAppCloudApi\WhatsAppCloudApi;

class MessagingController extends Controller
{
    public function sendMessage(Request $request)
    {
        $validated = $request->validate([
            'recipient' => 'required|string',
            'message' => 'required|string',
        ]);

        $whatsApp = new WhatsAppCloudApi([
            'from_phone_number_id' => 'your-configured-from-phone-number-id',
            'access_token' => 'your-facebook-whatsapp-application-token',
        ]);
        $response = $whatsApp->sendTextMessage(
            $validated['recipient'],
            $validated['message']
        );

        return response()->json($response);
    }
}