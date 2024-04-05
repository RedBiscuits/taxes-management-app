"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { arabic } from "@/shared/fonts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

export function SearchForm({
  placeholder,
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("q", term);
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`);
    } else {
      params.delete("q");
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, 500);

  return (
    <Input
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("q") || ""}
      type="text"
      placeholder={placeholder ?? "Search..."}
      id="search"
      name="search"
      className={cn(
        `placeholder:px-2 placeholder:text-gray-400 font-medium bg-white rounded border border-gray-300 focus:ring-2 focus:px-2 focus:bg-transparent focus:border-black text-base outline-none text-gray-700 transition-colors duration-200 ease-in-out ${className}`,
        arabic.className
      )}
    />
  );
}
