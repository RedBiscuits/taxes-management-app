import { Layout } from "@/components/layout";
import { getUsers } from "@/shared/actions/users";
import React from "react";
import { UsersTable } from "./_components/usersTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function page() {
  const user = await getUsers();

  return (
    <>
      <Link href="users/new">
        <Button size="lg" className="mx-2 mt-1">
          انشاء
        </Button>
      </Link>
      <Layout>
        <UsersTable users={user.data} />
      </Layout>
    </>
  );
}
