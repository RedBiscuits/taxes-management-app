import React from "react";
import { getSinglePayment } from "@/shared/actions/payments";
import UpsertPaymentForm from "@/app/(pages)/payments/new/_components/upsertPaymentForm";

export default async function page({
  params: { id },
}: {
  params: { id: number };
}) {
  const payment = await getSinglePayment(id);

  return <UpsertPaymentForm payment={payment.data!} />;
}
