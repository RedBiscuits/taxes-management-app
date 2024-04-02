import { cn } from "@/lib/utils";
import { arabic } from "@/shared/fonts";
import React from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className={cn(
        "rounded-lg border border-neutral-600 bg-white p-4 mt-2 mx-2",
        arabic.className
      )}
    >
      {children}
    </section>
  );
}
