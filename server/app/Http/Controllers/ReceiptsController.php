<?php

namespace App\Http\Controllers;

use App\Http\Requests\Receipt\CreateReceiptRequest;
use App\Http\Requests\Receipt\UpdateReceiptRequest;
use App\Http\Services\Receipt\ReceiptService;
use App\Models\Receipt;
use Illuminate\Http\Request;

class ReceiptsController extends Controller
{

    private ReceiptService $service;

    public function __construct(ReceiptService $ReceiptService)
    {
        $this->service = $ReceiptService;
    }

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
            ->with(["entries" => function ($query) {
                $query->when(request('tax_type'), function ($query, $search) {
                    $query->where('tax_type', 'like', $search . '%');
                })->when(request('payment_type'), function ($query, $search) {
                    $query->where('payment_type', 'like', $search . '%');
                });
            }])
            ->paginate();

        return $this->respondOk($Receipts);
    }

    public function show(Receipt $Receipt)
    {
        return $this->respondOk($Receipt->load("entries"));
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
