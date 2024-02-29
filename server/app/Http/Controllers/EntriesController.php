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
            ->when(request('time'), function ($query, $search) {
                $query->where('time', 'like', "$search%");
            })
            ->when(request('start_date'), function ($query, $search) {
                $query->where('start_date', 'like', "$search%");
            })
            ->when(request('end_date'), function ($query, $search) {
                $query->where('end_date', 'like', "$search%");
            })
            ->when(request('name'), function ($query, $search) {
                $query->where('name', 'like', "$search%");
            })
            ->when(request('location_id'), function ($query, $search) {
                $query->where('location_id', 'like', $search);
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
        $entry = Entry::create($request->validated());

        $this->entryService->add_value_to_receipt($entry);

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
