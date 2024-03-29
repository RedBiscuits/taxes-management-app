import { cn } from "@/lib/utils";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

export function Loading({ className }: { className?: string }) {
  return (
    <AiOutlineLoading size={24} className={cn("animate-spin", className)} />
  );
}
