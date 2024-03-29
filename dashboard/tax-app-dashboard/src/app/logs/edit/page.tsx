import { getLatestLog } from "@/shared/actions/logs";
import EditLogForm from "./_components/EditLogForm";

export default async function page() {
  const log = await getLatestLog();
  return (
    <>
      <EditLogForm log={log} />
    </>
  );
}
