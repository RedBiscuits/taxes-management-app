import { CellContext, DisplayColumnDef } from "@tanstack/react-table";
import { formatTableHeader, truncateText } from "./text";
import dayjs from "dayjs";

export const col = <T,>(
  name: keyof T,
  options?: { header?: string; truncate?: boolean; date?: boolean }
): [(row: T) => string, DisplayColumnDef<T, string>] => {
  return [
    (row: T) => String(row[name]),
    {
      id: String(name),
      cell: ({ getValue }: CellContext<T, string>) => (
        <p>
          {options?.truncate
            ? truncateText(getValue())
            : options?.date
            ? dayjs(getValue()).format("DD/MM/YYYY")
            : getValue()}
        </p>
      ),
      header: () => (
        <p className="capitalize min-w-32">
          {options?.header ??
            formatTableHeader(String(dictionary[name as string] || ""))}
        </p>
      ),
    },
  ];
};

const dictionary: Record<string, string> = {
  name: "الاسم",
  job: "الوظيفة",
  phone: "رقم الهاتف",
  location: "المأمورية",
};
