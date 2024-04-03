import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { getPayments } from "@/shared/actions/payments";
import Link from "next/link";
import React from "react";
import { PaymentsTable } from "./_components/paymentsTable";

export default async function page({
  searchParams: { page },
}: {
  searchParams: { page: number };
}) {
  const payments = await getPayments(page);

  return (
    <>
      <Link href="payments/new">
        <Button size="lg" className="mx-2 mt-1">
          انشاء
        </Button>
      </Link>
      <Layout>
        <PaymentsTable payments={payments.data} />
      </Layout>
    </>
  );
}
