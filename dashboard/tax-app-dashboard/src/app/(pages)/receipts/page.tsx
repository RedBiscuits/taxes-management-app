import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ReceiptsTable } from "./_components/receiptsTable";
import { FiltersModal } from "./_components/filtersModal";
import { getLocations } from "@/shared/actions/locations";
import { getReceipts } from "@/shared/actions/receipts";
import { NewReceiptModal } from "./_components/newReceiptModal";
import { getDays } from "@/shared/actions/days";

type Filters = {
  close_date?: string;
  close_date_operator?: string;
  created_at?: string;
  created_at_operator?: string;
  created_at_2?: string;
  created_at_operator_2?: string;
};
type ReceiptPageParams = Filters & {
  searchParams: {
    page: number;
    q?: string;
  };
};

export default async function page({
  searchParams: { page = 1, q = "", ...filters },
}: ReceiptPageParams) {
  const filter = formatFilters(q, filters);

  const [receipts, locations, days] = await Promise.all([
    getReceipts(page, filter),
    getLocations(),
    getDays(),
  ]);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center flex-1 gap-2 mx-2">
          <FiltersModal locations={locations.data} />
        </div>
        <NewReceiptModal locations={locations.data} days={days.data} />
      </div>
      <Layout>
        <ReceiptsTable receipts={receipts.data} />
      </Layout>
    </>
  );
}

function formatFilters(q: string, filters: Filters = {}) {
  let filter = [];
  if (q) filter.push(`phone=${q}`);

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      filter.push(`${key}=${value}`);
    }
  });

  return filter.join("&");
}
