import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";
import { arabic } from "@/shared/fonts";
import { LuWallet } from "react-icons/lu";
import { IoReceiptOutline, IoSettingsOutline } from "react-icons/io5";
import { FaRegMoneyBillAlt, FaRegUser, FaRegBell } from "react-icons/fa";
export function SideBar() {
  return (
    <>
      <div
        className={cn("hidden border-r bg-muted/40 md:block", arabic.className)}
      >
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-14 items-center justify-center border-b border-l border-slate-800 px-4 lg:h-[100px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image src={logo} alt="logo" className="size-20" />
            </Link>
          </div>
          <div className="flex-1 border-l border-slate-800 py-8 pr-14 h-full ">
            <nav className="grid items-start justify-start gap-5 px-2 text-lg font-semibold lg:px-4 ">
              <Link
                href="/receipts"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LuWallet className="size-6" /> التحصيلات
              </Link>
              <Link
                href="/payments"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <IoReceiptOutline className="size-6" />
                التوريدات
              </Link>
              <Link
                href="/targets"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <FaRegMoneyBillAlt className="size-6" />
                المستهدف
              </Link>
              <Link
                href="/users"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <FaRegUser className="size-6" />
                الموظفين
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <IoSettingsOutline className="size-6" />
                الاعدادات
              </Link>
              <Link
                href="/logs"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <FaRegBell className="size-6" />
                التنبيهات
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
