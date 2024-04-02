import { Layout } from "@/components/layout";
import { getUsers } from "@/shared/actions/users";
import React from "react";
import { UsersTable } from "./_components/usersTable";

export default async function page() {
  const user = await getUsers();

  return (
    <Layout>
      <UsersTable users={user.data} />
    </Layout>
  );
}
