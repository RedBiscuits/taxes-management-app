import React from "react";
import UpsertPaymentForm from "../../new/_components/newReceiptsEntries";
import { getSinglePayment } from "@/shared/actions/payments";

export default async function page({
  params: { id },
}: {
  params: { id: number };
}) {
  const payment = await getSinglePayment(id);

  return <UpsertPaymentForm payment={payment.data!} />;
}
