<?php

namespace App\Http\Controllers;

use App\Http\Requests\Payments\CreatePaymentRequest;
use App\Http\Requests\Payments\UpdatePaymentRequest;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = Payment::query()
            ->when(request('phone'), function ($query, $search) {
                $query->where('phone', 'like', "$search%");
            })
            ->when(request('is_paid'), function ($query, $search) {
                $query->where('is_paid', 'like', $search);
            })
            ->when(request('amount'), function ($query, $search) {
                $query->where('amount', 'like', "$search%");
            })
            ->when(request('status'), function ($query, $search) {
                $query->where('status', 'like', $search);
            })
            ->when(request('user_id'), function ($query, $search) {
                $query->where('user_id', 'like', $search);
            })
            ->when(request('location_id'), function ($query, $search) {
                $query->where('location_id', 'like', $search);
            })
            ->paginate();

        return $this->respondOk($payments);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(CreatePaymentRequest $request)
    {
        return $this->respondCreated(Payment::create($request->validated()));

    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        return $this->respondOk($payment);

    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentRequest $request, Payment $payment)
    {
        $payment->update($request->validated());
        return $this->respondOk($payment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        $payment->delete();
        return $this->respondNoContent();
    }
}
