import type { Metadata } from "next";
import "./globals.css";
import { SideBar, MobileSideBar } from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";
import { arabic } from "@/shared/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        <Toaster
          richColors
          toastOptions={{
            className: arabic.className,
          }}
          dir="rtl"
          theme="light"
          closeButton
        />
      </body>
    </html>
  );
}
