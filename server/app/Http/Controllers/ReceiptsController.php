<?php

namespace App\Http\Controllers;

use App\Http\Requests\Receipt\CreateReceiptRequest;
use App\Http\Requests\Receipt\UpdateReceiptRequest;
use App\Models\Receipt;
use Illuminate\Http\Request;

class ReceiptsController extends Controller
{
    public function index()
    {
        $Receipts = Receipt::query()
            ->when(request('total'), function ($query, $search) {
                $query->where('total', 'like', "$search%");
            })
            ->when(request('location_id'), function ($query, $search) {
                $query->where('location_id', 'like', $search);
            })
            ->when(request('day_id'), function ($query, $search) {
                $query->where('day_id', 'like', $search);
            })
            ->paginate();

        return $this->respondOk($Receipts);
    }

    public function show(Receipt $Receipt)
    {
        return $this->respondOk($Receipt);
    }

    public function store(CreateReceiptRequest $request)
    {
        return $this->respondCreated(Receipt::create($request->validated()));
    }

    public function update(UpdateReceiptRequest $request, Receipt $Receipt)
    {
        $Receipt->update($request->validated());
        return $this->respondOk($Receipt);
    }

    public function destroy(Receipt $Receipt)
    {
        $Receipt->delete();
        return $this->respondNoContent();
    }
}
