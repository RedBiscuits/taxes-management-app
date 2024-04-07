import React from "react";
import { EditForm } from "./_components/EditForm";
import { getSingleEntry } from "@/shared/actions/entries";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const entry = await getSingleEntry(Number(id));

  return <EditForm entry={entry.data} />;
}
