<?php

namespace App\Http\Controllers;

use App\Http\Requests\Entry\CreateEntryRequest;
use App\Http\Requests\Entry\UpdateEntryRequest;
use App\Http\Services\Entry\EntryService;
use App\Models\Entry;
use Illuminate\Http\Request;

class EntriesController extends Controller
{

    private EntryService $entryService;

    public function __construct(EntryService $entryService)
    {
        $this->entryService = $entryService;
    }

    public function index()
    {
        $Entrys = Entry::query()
            ->when(request('payment_type'), function ($query, $search) {
                $query->where('payment_type', 'like', "$search%");
            })
            ->when(request('tax_type'), function ($query, $search) {
                $query->where('tax_type', 'like', "$search%");
            })
            ->when(request('value'), function ($query, $search) {
                $query->where('value', 'like', "$search%");
            })
            ->when(request('receipt_id'), function ($query, $search) {
                $query->where('receipt_id', 'like', $search);
            })
            ->paginate();

        return $this->respondOk($Entrys);
    }

    public function show(Entry $Entry)
    {
        return $this->respondOk($Entry);
    }

    public function store(CreateEntryRequest $request)
    {
        $entriesData = $request->validated()['entries'];

        $entries = [];

        foreach ($entriesData as $entryData) {
            $entry = Entry::create([
                'value' => $entryData['value'],
                'tax_type' => $entryData['tax_type'],
                'payment_type' => $entryData['payment_type'],
                'receipt_id' => $entryData['receipt_id'],
            ]);

            $entries[] = $entry;
        }
        return $this->respondCreated($entry);
    }

    public function update(UpdateEntryRequest $request, Entry $Entry)
    {
        $Entry->update($request->validated());
        return $this->respondOk($Entry);
    }

    public function destroy(Entry $Entry)
    {
        $Entry->delete();
        return $this->respondNoContent();
    }
}
