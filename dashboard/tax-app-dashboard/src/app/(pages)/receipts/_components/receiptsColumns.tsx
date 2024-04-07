"use client";

import { col } from "@/shared/tableColumn";
import { Entry, TableEntry } from "@/models";
import { createColumnHelper } from "@tanstack/react-table";
import { ReceiptActions } from "./receiptsActions";

const columnHelper = createColumnHelper<TableEntry>();

const receiptColumn = col<TableEntry>;

export const columns = [
  columnHelper.accessor(...receiptColumn("day_id")),
  columnHelper.accessor(...receiptColumn("location_id")),
  columnHelper.accessor(...receiptColumn("payment_type")),
  columnHelper.accessor(...receiptColumn("tax_type")),
  columnHelper.accessor(...receiptColumn("value")),
  columnHelper.accessor((r) => r, {
    id: "actions",
    cell: ReceiptActions,
    header: () => <p className="text-center">الخيارات</p>,
  }),
];
