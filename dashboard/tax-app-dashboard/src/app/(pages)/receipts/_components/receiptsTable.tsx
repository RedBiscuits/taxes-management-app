import { DataTable } from "@/components/lib/table";
import React from "react";
import { columns } from "./receiptsColumns";
import { PaginatedResponse, Receipt, TableEntry } from "@/models";

export const ReceiptsTable = ({
  receipts,
}: {
  receipts: PaginatedResponse<Receipt>;
}) => {
  const entries = receipts.data
    .flatMap((x) => x.entries)
    .map((x) => {
      const currentReceipt = receipts.data.find((r) => r.id === x.receipt_id)!;

      return {
        ...x,
        time: currentReceipt.day!.time,
        location_name: currentReceipt.location!.name,
      };
    });

  const data: PaginatedResponse<TableEntry> = {
    ...receipts,
    data: entries,
  };

  return (
    <>
      <DataTable data={data} columns={columns} />
    </>
  );
};
