import { Layout } from "@/components/layout";
import React from "react";
import { UpsertTargetForm } from "../_components/upsertTargetForm";
import { getTarget } from "@/shared/actions/target";

export default async function page({
  params: { id },
}: {
  params: { id: number };
}) {
  const target = await getTarget(id);

  return (
    <>
      <Layout>
        <UpsertTargetForm location_id={Number(id)} target={target.data} />
      </Layout>
    </>
  );
}
