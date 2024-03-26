export const taxTypes = [
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

export const paymentTypes = [
  "نقدي",
  "الكتروني - ماكينة",
  "الكتروني - مدفوعة مواطن",
  "الكتروني - تحويل بنكي",
] as const;

export const taxTypesData = taxTypes.map((type) => ({
  label: type,
  value: type,
}));

export const paymentTypesData = paymentTypes.map((type) => ({
  label: type,
  value: type,
}));
