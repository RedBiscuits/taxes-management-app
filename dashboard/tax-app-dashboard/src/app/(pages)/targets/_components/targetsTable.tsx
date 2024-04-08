"use client";
import React from "react";
import { Target } from "@/models/target";
import { Location } from "@/models";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { arabic } from "@/shared/fonts";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const TargetsTable = ({
  target,
  locations,
}: {
  target: Target;
  locations: Location[];
}) => {

  const searchParams = useSearchParams();
  const router = useRouter();

  const location_id = Number(searchParams.get("location_id")) || 1;

  return (
    <>
      <div className="flex items-end mx-2 gap-2">
        <div className={cn(arabic.className)}>
          <Label>نوع المستهدف</Label>
          <Select
            onValueChange={(value) =>
              router.push(`/targets?period=${value}&location_id=${location_id}`)
            }
            defaultValue={"month"}
          >
            <SelectTrigger className="w-60 border-2 border-slate-300">
              <SelectValue className="text-lg" placeholder="نوع الضريبة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="text-end" value={"month"}>
                {"شهري"}
              </SelectItem>
              <SelectItem className="text-end" value={"quarter"}>
                {"ربع سنوي"}
              </SelectItem>
              <SelectItem className="text-end" value={"third"}>
                {"توريدة"}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className={cn(arabic.className)}>
          <Label>المأمورية</Label>
          <Select
            onValueChange={(value) =>
              router.push(`/targets?location_id=${value}`)
            }
            defaultValue={
              locations.find((location) => location.id === location_id)?.name ||
              "المأمورية"
            }
          >
            <SelectTrigger className="w-60 border-2 border-slate-300">
              <SelectValue className="text-lg" placeholder="المأمورية">
                {locations.find((location) => location.id === location_id)
                  ?.name || "المأمورية"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem
                  key={location.id}
                  className="text-end"
                  value={String(location.id)}
                >
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Link
          href={
            target
              ? `targets/${location_id}/edit`
              : `targets/${location_id}/new`
          }
          className="mr-auto"
        >
          <Button>{target ? "تعديل" : "اضافة"}</Button>
        </Link>
      </div>
    </>
  );
};
