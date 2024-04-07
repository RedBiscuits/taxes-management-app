import { Layout } from "@/components/layout";
import React from "react";
import UpsertUserForm from "../../new/_components/upsertUserForm";
import { getLocations } from "@/shared/actions/locations";
import { getSingleUser } from "@/shared/actions/users";

export default async function page({
  params: { id },
}: {
  params: { id: number };
}) {
  const [locations, user] = await Promise.all([
    getLocations(),
    getSingleUser(id),
  ]);

  return (
    <Layout>
      <UpsertUserForm locations={locations.data} user={user.data} />
    </Layout>
  );
}
