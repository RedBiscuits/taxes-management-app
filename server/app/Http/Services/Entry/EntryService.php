<?php

namespace App\Http\Services\Entry;

use App\Models\Entry;

class EntryService
{
    public function add_value_to_receipt(Entry $entry)
    {
        $entry->receipt()->total += $entry->value;
        $entry->receipt()->save();
    }
}
