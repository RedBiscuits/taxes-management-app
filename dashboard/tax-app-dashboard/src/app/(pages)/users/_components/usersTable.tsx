import { DataTable } from "@/components/lib/table";
import React from "react";
import { columns } from "./usersColumns";
import { PaginatedResponse, User } from "@/models";

export const UsersTable = ({ users }: { users: PaginatedResponse<User> }) => {
  return (
    <>
      <DataTable data={users} columns={columns} />
    </>
  );
};
