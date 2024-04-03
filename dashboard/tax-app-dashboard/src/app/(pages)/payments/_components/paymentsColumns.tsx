"use client";

import { col } from "@/shared/tableColumn";
import { Payment } from "@/models";
import { createColumnHelper } from "@tanstack/react-table";
import { PaymentActions } from "./paymentActions";

const columnHelper = createColumnHelper<Payment>();

const paymentColumn = col<Payment>;

export const columns = [
  columnHelper.accessor(...paymentColumn("phone")),
  columnHelper.accessor(...paymentColumn("amount")),
  columnHelper.accessor(...paymentColumn("created_at", { date: true })),
  columnHelper.accessor(
    ...paymentColumn("close_date", { date: true, nullable: true })
  ),

  columnHelper.accessor((r) => r, {
    id: "actions",
    cell: PaymentActions,
    header: () => <p className="text-center">الخيارات</p>,
  }),
];
