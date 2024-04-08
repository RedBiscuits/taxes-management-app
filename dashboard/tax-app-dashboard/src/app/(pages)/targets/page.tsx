import React from "react";
import { TargetsTable } from "./_components/targetsTable";
import { getReceiptsNoPagination } from "@/shared/actions/receipts";
import { getTarget } from "@/shared/actions/target";
import { getLocations } from "@/shared/actions/locations";
import { TableRow, TableHeader, TableHead, Table } from "@/components/ui/table";
import { Layout } from "@/components/layout";
import { PeriodTarget } from "./_components/PeriodTarget";
import { TargetData } from "@/models/target";
import {
  createTargetMonths,
  createTargetQuarters,
  createTargetThirds,
} from "./_components/TargetsFunctions";

type PeriodTypes = "month" | "quarter" | "third";

export default async function page({
  searchParams: { location_id = 1, period },
}: {
  searchParams: { location_id: number; period: string };
}) {
  const [{ data: receipts }, { data: target }, { data: locations }] =
    await Promise.all([
      getReceiptsNoPagination(location_id),
      getTarget(location_id),
      getLocations(),
    ]);

  const periodType: PeriodTypes = (period as PeriodTypes) || "month";
  let periodData = [] as TargetData[];

  if (target) {
    switch (periodType) {
      case "month":
        periodData = createTargetMonths(target, receipts);
        break;
      case "quarter":
        periodData = createTargetQuarters(target, receipts);
        break;
      case "third":
        periodData = createTargetThirds(target, receipts);
        break;
    }
  }

  return (
    <>
      <TargetsTable target={target} locations={locations} />
      {target && (
        <Layout>
          <div className=" flex justify-evenly w-full hover:bg-neutral-50">
            <div className="flex justify-center gap-96 items-center w-2/3 mr-24">
              <p className=" pt-4 pb-2 text-primary-foreground text-base text-start">
                المستهدف
              </p>
              <p className=" pt-4 pb-2 text-primary-foreground text-base text-start">
                المحقق
              </p>
            </div>
          </div>
          <hr />
          <Table className="mb-2 bg-white rounded-lg">
            <TableHeader>
              <TableRow>
                <TableHead className=" pt-4 pb-2 text-primary-foreground text-base text-start">
                  الشهر
                </TableHead>
                <TableHead className=" pt-4 pb-2 text-primary-foreground text-base text-start">
                  المبلغ
                </TableHead>
                <TableHead className=" pt-4 pb-2 text-primary-foreground text-base text-start">
                  النسبة
                </TableHead>

                <TableHead className=" pt-4 pb-2 text-primary-foreground text-base text-start">
                  المبلغ
                </TableHead>
                <TableHead className="pt-4 pb-2 text-primary-foreground text-base text-start">
                  النسبة
                </TableHead>
              </TableRow>
            </TableHeader>
            <PeriodTarget data={periodData} />
          </Table>
        </Layout>
      )}
    </>
  );
}
