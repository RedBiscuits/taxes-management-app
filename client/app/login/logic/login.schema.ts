import { z } from "zod";

export const loginSchema = z.object({
  phone: z
    .string({
      required_error: "الهاتف مطلوب",
    })
    .min(11, "الهاتف غير صالح"),
  password: z
    .string({
      required_error: "كلمة المرور مطلوبة",
    })
    .min(8, "كلمة المرور يجب الا تقل عن 8 حروف"),
});

export type LoginData = z.infer<typeof loginSchema>;
