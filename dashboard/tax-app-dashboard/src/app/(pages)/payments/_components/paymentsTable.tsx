import { DataTable } from "@/components/lib/table";
import React from "react";
import { columns } from "./paymentsColumns";
import { PaginatedResponse, Payment } from "@/models";

export const PaymentsTable = ({
  payments,
}: {
  payments: PaginatedResponse<Payment>;
}) => {
  return (
    <>
      <DataTable data={payments} columns={columns} />
    </>
  );
};
