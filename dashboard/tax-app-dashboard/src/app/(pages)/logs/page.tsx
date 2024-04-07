import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getLatestLog } from "@/shared/actions/logs";
import { arabic } from "@/shared/fonts";
import Link from "next/link";

export default async function page() {
  const log = await getLatestLog();

  return (
    <>
      <Layout>
        <p className={cn("text-lg", arabic.className)}>{log?.content || ""}</p>
      </Layout>
      <Link href={`/logs/edit`}>
        <Button className="mx-2 mt-2" size={"lg"}>
          تعديل
        </Button>
      </Link>
    </>
  );
}
