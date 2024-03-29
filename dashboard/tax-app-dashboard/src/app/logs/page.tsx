import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getLatestLog } from "@/shared/actions/logs";
import { arabic } from "@/shared/fonts";
import Link from "next/link";

export default async function page() {
  const log = await getLatestLog();

  return (
    <>
      <div className="bg-white rounded-lg my-4 mx-2  px-4 py-4">
        <p className={cn("text-lg", arabic.className)}>{log.content}</p>
      </div>
      <Link href={`/logs/edit`}>
        <Button className="mx-2" size={"lg"}>
          تعديل
        </Button>
      </Link>
    </>
  );
}
