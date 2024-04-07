import { DataTable } from "@/components/lib/table";
import React, { useState } from "react";
import {
  TableCell,
  TableRow,
  TableHeader,
  TableHead,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Months, Target } from "@/models/target";

export const TargetsTable = ({ target }: { target: Target }) => {
  const months = createTargetMonths(target);

  return (
    <>
      <Table className="mb-2 bg-white rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead className="pt-4 pb-2 text-primary-foreground text-base text-start">
              المدة
            </TableHead>
            <TableHead className="pt-4 pb-2 text-primary-foreground text-base text-start">
              المستهدف
            </TableHead>
            <TableHead className="pt-4 pb-2 text-primary-foreground text-base text-start">
              المحقق
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="pt-4 pb-2 text-primary-foreground text-base text-start">
              المبلغ
            </TableHead>
            <TableHead className="pt-4 pb-2 text-primary-foreground text-base text-start">
              النسبة
            </TableHead>
            <TableHead className="pt-4 pb-2 text-primary-foreground text-base text-start">
              المبلغ
            </TableHead>
            <TableHead className="pt-4 pb-2 text-primary-foreground text-base text-start">
              النسبة
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

function createTargetMonths(target: Target) {
  const periods: any = [];

  (Object.keys(target) as Months[]).forEach((key) => {
    periods.push({
      month: key,
      target_percentage: target[key],
    });
  });

  return periods;
}
