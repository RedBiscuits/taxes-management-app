import { Layout } from "@/components/layout";
import React from "react";
import { UpsertTargetForm } from "../_components/upsertTargetForm";

export default function page({ params: { id } }: { params: { id: number } }) {
  return (
    <>
      <Layout>
        <UpsertTargetForm location_id={Number(id)} />
      </Layout>
    </>
  );
}
