"use client";

import {
  ColumnDef,
  Table,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  TableCell,
  TableRow,
  TableHeader,
  TableHead,
  TableBody,
  Table as TableMain,
} from "@/components/ui/table";
import { Paginator } from "./paginator";
import { useSearchParams } from "next/navigation";
import { PaginatedResponse } from "@/models";

export const EmptyRow = ({ colSpan }: { colSpan: number }) => (
  <TableRow>
    <TableCell colSpan={colSpan} className="h-24 text-center">
      No Data yet.
    </TableCell>
  </TableRow>
);

export const TableHeaderUI = <T,>({ table }: { table: Table<T> }) => (
  <TableHeader>
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <TableHead
            className="pt-4 pb-2 text-primary-foreground text-base text-start"
            key={header.id}
          >
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </TableHead>
        ))}
      </TableRow>
    ))}
  </TableHeader>
);

export const TableBodyUI = <T,>({
  table,
  onRowClick,
}: {
  table: Table<T>;
  onRowClick?: (row: T) => void;
}) => (
  <TableBody>
    {(() => {
      const rows = table.getRowModel().rows;
      if (rows.length) {
        return rows.map((row) => (
          <TableRow
            onClick={() => onRowClick && onRowClick(row.original)}
            className="cursor-pointer"
            key={row.id}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ));
      } else {
        return <EmptyRow colSpan={table.getAllColumns().length} />;
      }
    })()}
  </TableBody>
);

export const DataTable = <T,>({
  data,
  columns,
  onRowClick,
}: {
  data: PaginatedResponse<T>;
  columns: ColumnDef<T, any>[];
  onRowClick?: (row: T) => void;
}) => {
  const params = useSearchParams();
  const pageIndex = Number(params.get("page")) || 1;
  const table = useReactTable({
    data: data.data || [],
    pageCount: data.last_page,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: {
      pagination: {
        pageIndex,
        pageSize: 15,
      },
    },
  });

  return (
    <>
      <TableMain className="mb-2 bg-white rounded-lg">
        <TableHeaderUI table={table} />
        <TableBodyUI table={table} onRowClick={onRowClick} />
      </TableMain>
      {table.getPageCount() !== 1 && (
        <div className=" bg-white py-2 pb-4 rounded-md mb-4">
          <Paginator
            page={table.getState().pagination.pageIndex}
            lastPage={table.getPageCount()}
          />
        </div>
      )}
    </>
  );
};
