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
            ->when(request('phone'), function ($query) {
                return $query->phone(
                    request('phone')
                );
            })
            ->when(request('is_paid'), function ($query) {
                return $query->isPaid(
                    request('is_paid')
                );
            })
            ->when(request('amount'), function ($query) {
                return $query->amount(
                    request('amount')
                );
            })
            ->when(request('status'), function ($query) {
                return $query->status(
                    request('status')
                );
            })
            ->when(request('user_id'), function ($query) {
                return $query->userId(
                    request('user_id')
                );
            })
            ->when(request('location_id'), function ($query) {
                return $query->locationId(
                    request('location_id')
                );
            })
            ->when(request('created_at_operator') && request('created_at'), function ($query) {
                return $query->createdAt(
                    request('created_at_operator'),
                    request('created_at')
                );
            })
            ->when(request('close_date_operator'), function ($query) {
                return $query->closeDate(
                    request('close_date_operator'),
                    request()->get('close_date', null)
                );
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
