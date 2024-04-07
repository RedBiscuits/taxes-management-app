<?php

namespace App\Http\Controllers;

use App\Http\Requests\Flags\ToggleFlagRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class FeaturesController extends Controller
{
    public function toggle(ToggleFlagRequest $request)
    {
        $featureName = $request->input('feature_name');

        $currentStatus = Cache::get("features.$featureName", true);
        Cache::put("features.$featureName", !$currentStatus);

        return $this->respondOk([
            'message' => "Feature flag '$featureName' toggled",
            'value' => Cache::get("features.$featureName")
        ]);
    }

    public function get(Request $request)
    {
        return $this->respondOk([
            'receipts_active' => Cache::get("features.receipts_active", false),
            'payments_active' => Cache::get("features.payments_active", false),
            'targets_active' => Cache::get("features.targets_active", false),
        ]);
    }
}
