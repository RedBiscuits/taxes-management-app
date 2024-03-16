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

        $currentStatus = Cache::get("features.$featureName", true); // Default to true if not found
        Cache::put("features.$featureName", !$currentStatus);

        return $this->respondOk([
            'message' => "Feature flag '$featureName' toggled",
            'value' => Cache::get("features.$featureName")
        ]);
    }
}
