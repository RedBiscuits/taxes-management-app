"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { FeatureMap, FeatureNames, toggle } from "@/shared/actions/settings";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { toast } from "sonner";

export const Features = ({ features }: { features: FeatureMap }) => {
  return (
    <>
      <div className="mx-2 my-3 space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="user-receipts" className="cursor-pointer select-none">
            التحصيلات
          </Label>
          <Checkbox
            onCheckedChange={async (v) =>
              await toggleFeature("receipts_active", v)
            }
            checked={features.receipts_active}
            className="size-6"
            id="user-receipts"
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="user-payments" className="cursor-pointer select-none">
            التوريدات
          </Label>
          <Checkbox
            onCheckedChange={async (v) =>
              await toggleFeature("payments_active", v)
            }
            checked={features.payments_active}
            className="size-6"
            id="user-payments"
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="user-target" className="cursor-pointer select-none">
            المستهدف
          </Label>
          <Checkbox
            onCheckedChange={async (v) =>
              await toggleFeature("targets_active", v)
            }
            checked={features.targets_active}
            className="size-6"
            id="user-target"
          />
        </div>
      </div>
    </>
  );
};

async function toggleFeature(name: FeatureNames, value: string | boolean) {
  try {
    const res = await toggle(name, Boolean(value));
    if (res.success) {
      toast.success("تم التعديل بنجاح");
    } else {
      toast.error("حدث خطأ");
    }
  } catch (error) {
    console.log(error);
    toast.error("حدث خطأ");
  }
}
