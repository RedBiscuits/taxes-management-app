"use client";

import { col } from "@/shared/tableColumn";
import { User } from "@/models";
import { createColumnHelper } from "@tanstack/react-table";
import { UserActions } from "./userActions";

const columnHelper = createColumnHelper<User>();

const userColumn = col<User>;

export const columns = [
  columnHelper.accessor(...userColumn("name")),
  columnHelper.accessor(...userColumn("job")),
  columnHelper.accessor(...userColumn("phone")),
  columnHelper.accessor((r) => r.location?.name || " - ", {
    id: "location",
    cell: (info) => info.getValue(),
    header: () => "المأمورية",
  }),
  columnHelper.accessor((r) => r, {
    id: "actions",
    cell: UserActions,
    header: () => <p className="text-center">الخيارات</p>,
  }),
];
