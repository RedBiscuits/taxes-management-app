import { MobileSideBar, SideBar } from "@/components/layout";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar />
      <main className="flex flex-1 flex-col gap-4 lg:gap-6 ">
        <div className="flex flex-col flex-1 ">
          <MobileSideBar />
          <div className="px-2 py-2 bg-blue-100 flex-1">{children}</div>
        </div>
      </main>
    </div>
  );
}
