import React from "react";
import { TableCell, TableRow, TableBody } from "@/components/ui/table";
import { TargetData } from "@/models/target";

export const PeriodTarget = ({ data }: { data: TargetData[] }) => {
  const total = data.reduce(
    (acc, curr) => ({
      target_amount: Number(acc.target_amount) + Number(curr.target_amount),
      target_percentage: 100,
      actual_amount: Number(acc.actual_amount) + Number(curr.actual_amount),
      actual_percentage:
        Number(acc.actual_percentage) + Number(curr.actual_percentage),
      name: "الاجمالي",
      index: -1,
    }),
    {
      target_amount: 0,
      target_percentage: 0,
      actual_amount: 0,
      actual_percentage: 0,
      name: "الاجمالي",
      index: -1,
    } as TargetData
  );

  return (
    <TableBody>
      {data
        .sort((a, b) => a.index - b.index)
        .map((x) => (
          <TableRow key={x.name}>
            <TableCell>{x.name}</TableCell>
            <TableCell>{x.target_amount.toFixed(2)} جنيه</TableCell>
            <TableCell>{x.target_percentage.toFixed(2)} %</TableCell>
            <TableCell>{x.actual_amount.toFixed(2)} جنيه</TableCell>
            <TableCell>{x.actual_percentage.toFixed(2)} %</TableCell>
          </TableRow>
        ))}
      <TableRow>
        <TableCell>{total.name}</TableCell>
        <TableCell>{total.target_amount.toFixed(2)} جنيه</TableCell>
        <TableCell>{total.target_percentage.toFixed(2)} %</TableCell>
        <TableCell>{total.actual_amount.toFixed(2)} جنيه</TableCell>
        <TableCell>{total.actual_percentage.toFixed(2)} %</TableCell>
      </TableRow>
    </TableBody>
  );
};
