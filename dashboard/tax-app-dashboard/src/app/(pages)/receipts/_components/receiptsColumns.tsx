"use client";

import { col } from "@/shared/tableColumn";
import { TableEntry } from "@/models";
import { createColumnHelper } from "@tanstack/react-table";
import { ReceiptActions } from "./receiptsActions";

const columnHelper = createColumnHelper<TableEntry>();

const receiptColumn = col<TableEntry>;

export const columns = [
  columnHelper.accessor(...receiptColumn("time")),
  columnHelper.accessor(...receiptColumn("location_name")),
  columnHelper.accessor(...receiptColumn("payment_type")),
  columnHelper.accessor(...receiptColumn("tax_type")),
  columnHelper.accessor(...receiptColumn("value")),
  columnHelper.accessor((r) => r, {
    id: "actions",
    cell: ReceiptActions,
    header: () => <p className="text-center">الخيارات</p>,
  }),
];
