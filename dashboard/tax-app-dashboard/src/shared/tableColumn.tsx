import { CellContext, DisplayColumnDef } from "@tanstack/react-table";
import { formatTableHeader, truncateText } from "./text";
import dayjs from "dayjs";

export const col = <T,>(
  name: keyof T,
  options?: {
    header?: string;
    truncate?: boolean;
    date?: boolean;
    nullable?: boolean;
  }
): [(row: T) => string, DisplayColumnDef<T, string>] => {
  return [
    (row: T) => String(row[name]),
    {
      id: String(name),
      cell: ({ getValue }: CellContext<T, string>) => {
        const value = options?.truncate
          ? truncateText(getValue())
          : options?.date
          ? dayjs(getValue()).isValid()
            ? dayjs(getValue()).format("YYYY/MM/DD")
            : null
          : getValue();

        return <p>{options?.nullable ? value || " - " : value}</p>;
      },
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
  amount: "المبلغ",
  created_at: "تاريخ الانشاء",
  close_date: "تاريخ الدفع",
  day_id: "اليوم",
  location_id: "المأمورية",
  tax_type: "نوع الضريبة",
  payment_type: "نوع الدفع",
  value: "المبلغ",
};
