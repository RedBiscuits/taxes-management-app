import { getToken } from "@/shared/cookies";
import { redirect } from "next/navigation";

export default function Page() {
  const token = getToken();
  if (token) redirect("/receipts");
  else redirect("/login");
  return <></>;
}
