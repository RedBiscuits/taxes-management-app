import { Layout } from "@/components/layout";
import { getAll } from "@/shared/actions/settings";
import React from "react";
import { Features } from "./_components/features";

export default async function page() {
  const features = await getAll();

  return (
    <Layout>
      <Features features={features.data} />
    </Layout>
  );
}
