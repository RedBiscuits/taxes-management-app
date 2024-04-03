import { getLocations } from "@/shared/actions/locations";
import React from "react";
import UpsertUserForm from "./_components/createUserForm";

export default async function page() {
  const locations = await getLocations();

  return (
    <>
      <UpsertUserForm locations={locations.data.data} />
    </>
  );
}
