import { z } from "zod";

export type Receipt = {
  createdAt: Date;
  entries: ReceiptEntry[];
};

export type ReceiptEntryType =
  | {
      value: "sell";
      label: "بيع";
    }
  | {
      value: "buy";
      label: "شراء";
    }
  | {
      value: "transfer";
      label: "تحويل";
    }
  | {
      value: "expense";
      label: "مصروف";
    };

export type ReceiptEntry = {
  amount: number;
  type: ReceiptEntryType;
};
