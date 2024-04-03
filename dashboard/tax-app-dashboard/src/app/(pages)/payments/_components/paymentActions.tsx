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
import { Payment } from "@/models";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { arabic } from "@/shared/fonts";
import { toast } from "sonner";
import { Loading } from "@/components/lib/loading";
import { deletePayment } from "@/shared/actions/payments";

export const PaymentActions = (props: CellContext<Payment, Payment>) => {
  return (
    <div className="flex items-center justify-evenly bg-slate-200 p-1 rounded-full">
      <EditPayment {...props} />
      <DeletePayment {...props} />
    </div>
  );
};

const DeletePayment = (props: CellContext<Payment, Payment>) => {
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
          <DialogDescription>سوف يتم حذف التوريد نهائيا</DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex items-center justify-center gap-2">
          <Button onClick={() => setIsOpen(false)}>الغاء</Button>
          <DeletePaymentButton setIsOpen={setIsOpen} {...props} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function DeletePaymentButton({
  getValue,
  setIsOpen,
}: CellContext<Payment, Payment> & {
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
            const ok = await deletePayment(getValue().id);
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

const EditPayment = (props: CellContext<Payment, Payment>) => {
  return (
    <Link href={`payments/${props.getValue().id}/edit`}>
      <Button className="flex justify-center rounded-full">تعديل</Button>
    </Link>
  );
};
