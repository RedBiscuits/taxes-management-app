import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { arabic } from "@/shared/fonts";
import React from "react";

export default function page() {
  return (
    <Layout>
      <p className="text-xl font-semibold mb-2">الموظف</p>
      <hr />
      <div className="mx-2 mt-3 space-y-6">
        <div className="flex items-center justify-between">
          <label htmlFor="user-receipts" className="cursor-pointer select-none">
            التحصيلات
          </label>
          <Checkbox className="size-6" id="user-receipts" />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="user-payments" className="cursor-pointer select-none">
            التوريدات
          </label>
          <Checkbox className="size-6" id="user-payments" />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="user-target" className="cursor-pointer select-none">
            المستهدف
          </label>
          <Checkbox className="size-6" id="user-target" />
        </div>
      </div>
      <br />
      {/* manager */}
      <p className="text-xl font-semibold mb-2">المدير</p>
      <hr />
      <div className="mx-2 mt-3 space-y-6">
        <div className="flex items-center justify-between">
          <label
            htmlFor="manager-receipts"
            className="cursor-pointer select-none"
          >
            التحصيلات
          </label>
          <Checkbox className="size-6" id="manager-receipts" />
        </div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="manager-payments"
            className="cursor-pointer select-none"
          >
            التوريدات
          </label>
          <Checkbox className="size-6" id="manager-payments" />
        </div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="manager-target"
            className="cursor-pointer select-none"
          >
            المستهدف
          </label>
          <Checkbox className="size-6" id="manager-target" />
        </div>
      </div>

      <Button className="mt-8" size={"lg"}>
        حفظ
      </Button>
    </Layout>
  );
}
