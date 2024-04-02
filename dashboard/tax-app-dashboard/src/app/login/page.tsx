"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { arabic } from "@/shared/fonts";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/shared/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loading } from "@/components/lib/loading";

const loginSchema = z.object({
  phone: z
    .string({
      required_error: "رقم الهاتف مطلوب",
    })
    .regex(/^01[0125]\d{8}$/, {
      message: "رقم الهاتف غير صالح",
    }),
  password: z
    .string({ required_error: "كلمة السر مطلوبة" })
    .min(8, { message: "كلمة السر مطلوبة" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit = form.handleSubmit(async ({ phone, password }) => {
    try {
      const res = await login(phone, password);
      if (res.success) {
        toast.success("تم تسجيل الدخول بنجاح");
        router.replace("logs");
      } else {
        toast.error("حدث خطأ ما");
      }
    } catch (error) {
      toast.error("حدث خطأ ما");
    }
  });
  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center",
        arabic.className
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-lg w-full border border-netral-600 rounded-lg px-4 py-6"
        )}
      >
        <p
          className={cn(
            "text-2xl text-center mb-4 font-bold",
            arabic.className
          )}
        >
          تسجيل الدخول
        </p>
        <Form {...form}>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم الهاتف</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>كلمة السر</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full mt-4">
              {form.formState.isSubmitting ? <Loading /> : "تسجيل الدخول"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
