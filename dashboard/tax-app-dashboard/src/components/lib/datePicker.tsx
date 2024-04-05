"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";

export function DatePicker({
  value,
  onChange,
  disabled = false,
}: {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
  disabled?: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "min-w-60 justify-start items-baseline text-left font-normal",
            !value && "text-muted-foreground",
            disabled && "opacity-50"
          )}
        >
          <CalendarIcon className="ml-2 h-4 w-4" />
          {value ? (
            <span className="text-black">
              {dayjs(value).format("YYYY-MM-DD")}
            </span>
          ) : (
            <span>اختر التاريخ</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          disabled={disabled}
          mode="single"
          selected={value}
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  );
}
