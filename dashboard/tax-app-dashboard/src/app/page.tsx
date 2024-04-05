import { getToken } from "@/shared/cookies";
import { redirect, useRouter } from "next/navigation";

export default function Page() {
  // const router = useRouter();
  const token = getToken();
  if (token) redirect("/dashboard");
  else redirect("/login");

  return <></>;
}
