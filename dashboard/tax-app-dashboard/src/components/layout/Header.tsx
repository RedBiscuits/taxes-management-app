"use client";

import { cn } from "@/lib/utils";
import { arabic } from "@/shared/fonts";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <p className={cn("text-4xl font-bold", arabic.className)}>
      {getHeader(pathname)}
    </p>
  );
}

function getHeader(pathname: string) {
  const route = pathname.split("/")[1];

  switch (route) {
    case "logs":
      return "التنبيهات";
    default:
      return "التحصيلات";
  }
}
