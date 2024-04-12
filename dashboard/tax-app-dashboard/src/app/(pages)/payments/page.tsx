import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { getPayments } from "@/shared/actions/payments";
import Link from "next/link";
import React from "react";
import { PaymentsTable } from "./_components/paymentsTable";
import { SearchForm } from "@/components/lib/searchForm";
import { FiltersModal } from "./_components/filtersModal";
import { getLocations } from "@/shared/actions/locations";

type Filters = {
  close_date?: string;
  close_date_operator?: string;
  created_at?: string;
  created_at_operator?: string;
  created_at_2?: string;
  created_at_operator_2?: string;
};

// some duplication here to solve a nextjs build error
type PaymentPageParams = {
  searchParams: Filters & {
    page: number;
    q?: string;
  };
};

export default async function page({
  searchParams: { page = 1, q = "", ...filters },
}: PaymentPageParams) {
  const filter = formatFilters(q, filters);
  const payments = await getPayments(page, filter);
  const locations = await getLocations();

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center flex-1 gap-2">
          <SearchForm className="w-1/3" placeholder="ابحث برقم الهاتف" />
          <FiltersModal locations={locations.data} />
        </div>
        <Link href="payments/new">
          <Button size="lg" className="mx-2 mt-1">
            انشاء
          </Button>
        </Link>
      </div>
      <Layout>
        <PaymentsTable payments={payments.data} />
      </Layout>
    </>
  );
}

function formatFilters(q: string, filters: Filters) {
  let filter = [];
  if (q) filter.push(`phone=${q}`);

  Object.entries(filters || {}).forEach(([key, value]) => {
    if (value) {
      filter.push(`${key}=${value}`);
    }
  });

  return filter.join("&");
}
