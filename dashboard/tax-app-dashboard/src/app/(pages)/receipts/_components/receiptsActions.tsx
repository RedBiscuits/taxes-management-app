"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CellContext } from "@tanstack/react-table";
import { TableEntry } from "@/models";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { arabic } from "@/shared/fonts";
import { toast } from "sonner";
import { Loading } from "@/components/lib/loading";
import { deleteEntry } from "@/shared/actions/entries";

export const ReceiptActions = (props: CellContext<TableEntry, TableEntry>) => {
  return (
    <div className="flex items-center justify-evenly bg-slate-200 p-1 rounded-full">
      <Edit {...props} />
      <Delete {...props} />
    </div>
  );
};

const Delete = (props: CellContext<TableEntry, TableEntry>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen}>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex justify-center rounded-full"
        variant={"destructive"}
      >
        حذف
      </Button>

      <DialogContent className={cn(arabic.className)}>
        <DialogHeader>
          <DialogTitle>هل انت متأكد</DialogTitle>
          <DialogDescription>سوف يتم حذف التحصيل نهائيا</DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex items-center justify-center gap-2">
          <Button onClick={() => setIsOpen(false)}>الغاء</Button>
          <DeleteButton setIsOpen={setIsOpen} {...props} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function DeleteButton({
  getValue,
  setIsOpen,
}: CellContext<TableEntry, TableEntry> & {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Button
        disabled={isLoading}
        variant={"destructive"}
        onClick={async (e) => {
          e.stopPropagation();
          try {
            setIsLoading(true);
            const ok = await deleteEntry(getValue().id);
            if (ok) {
              toast.success("تم حذف التوريد بنجاح");
            } else {
              toast.error("حدث خطأ ما");
            }
          } catch (error) {
            console.log(error);
            toast.error("حدث خطأ ما");
          } finally {
            setIsLoading(false);
            setIsOpen(false);
          }
        }}
      >
        {isLoading ? <Loading /> : "حذف"}
      </Button>
    </>
  );
}

const Edit = (props: CellContext<TableEntry, TableEntry>) => {
  return (
    <Link href={`receipts/entries/${props.getValue().id}/edit`}>
      <Button className="flex justify-center rounded-full">تعديل</Button>
    </Link>
  );
};
