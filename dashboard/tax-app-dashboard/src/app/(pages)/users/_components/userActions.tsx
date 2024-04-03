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
// import { DeleteReservation } from "./deleteReservationButton";
import { CellContext } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { User } from "@/models";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { arabic } from "@/shared/fonts";
import { toast } from "sonner";
import { Loading } from "@/components/lib/loading";
import { deleteUser } from "@/shared/actions/users";

export const UserActions = (props: CellContext<User, User>) => {
  return (
    <div className="flex items-center justify-evenly bg-slate-200 p-1 rounded-full">
      <EditUser {...props} />
      <DeleteUser {...props} />
    </div>
  );
};

const DeleteUser = (props: CellContext<User, User>) => {
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
          <DialogDescription>
            سوف يتم حذف المستخدم {props.getValue().name} نهائيا
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex items-center justify-center gap-2">
          <Button onClick={() => setIsOpen(false)}>الغاء</Button>
          <DeleteUserButton setIsOpen={setIsOpen} {...props} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function DeleteUserButton({
  getValue,
  setIsOpen,
}: CellContext<User, User> & {
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
            // TODO: delete user
            // const { ok } = await deleteUser(getValue().id);

            // if (ok) {
            //   toast.success("تم حذف المستخدم بنجاح");
            // } else {
            //   toast.error("حدث خطأ ما");
            // }
          } catch {
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

const EditUser = (props: CellContext<User, User>) => {
  return (
    <Link href={`users/${props.getValue().id}/edit`}>
      <Button className="flex justify-center rounded-full">تعديل</Button>
    </Link>
  );
};
