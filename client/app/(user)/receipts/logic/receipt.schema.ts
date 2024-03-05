import { z } from "zod";

const taxTypeValues = [
  "ضريبة مباني",
  "ضريبة أطيان",
  "ضريبة ملاهي",
  "كشف رسمي",
  "تامينات",
  "طعون",
  "مصاريف حجز",
  "مصاريف رفع حجز",
  "اعانة بر",
  "اعانة سينما",
  "طابع شهيد",
  "شرطة",
  "تنمية محلية",
  "رسم درن",
  "معاشات",
] as const;

const paymentTypeValues = [
  "نقدي",
  "الكتروني - ماكينة",
  "الكتروني - مدفوعة مواطن",
  "الكتروني - تحويل بنكي",
] as const;

export const entrySchema = z.object({
  amount: z.coerce
    .number({
      required_error: "المبلغ مطلوب",
      invalid_type_error: "المبلغ مطلوب",
    })
    .min(1, "المبلغ لا يمكن ان يكون اقل من 1"),
  taxType: z.enum(taxTypeValues, {
    required_error: "نوع الضريبة مطلوب",
    invalid_type_error: "نوع الضريبة مطلوب",
  }),
  paymentType: z.enum(paymentTypeValues, {
    required_error: "طريقة الدفع مطلوبة",
    invalid_type_error: "طريقة الدفع مطلوبة",
  }),
});

export type Entry = z.infer<typeof entrySchema>;
