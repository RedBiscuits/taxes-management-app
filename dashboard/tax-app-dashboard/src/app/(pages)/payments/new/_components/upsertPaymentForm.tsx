"use client";

import { Layout } from "@/components/layout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { arabic } from "@/shared/fonts";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loading } from "@/components/lib/loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Payment } from "@/models";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DatePicker } from "@/components/lib/datePicker";
import { createPayment } from "@/shared/actions/payments";

export default function UpsertUserForm({ payement }: { payement?: Payment }) {
  const form = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
    // defaultValues: payement
    //   ? {
    //       ...payement,
    //     }
    //   : {},
  });

  const router = useRouter();
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await createPayment(data);
      if (res.success) {
        toast.success(`تم ${payement ? "تعديل" : "اضافة"} التوريد بنجاح`);
        router.push("/payments");
      } else {
        toast.error("حدث خطأ ما");
      }
    } catch (error) {
      toast.error("حدث خطأ ما");
    }
  });
  const isLoading = form.formState.isSubmitting;

  return (
    <Layout>
      <p className="text-xl font-semibold mb-6">
        {payement ? "تعديل التوريد" : "اضافة توريد جديد"}
      </p>
      <Form {...form}>
        <form onSubmit={onSubmit} className="max-w-xl space-y-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>المبلغ</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className={cn("text-lg", arabic.className)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الهاتف</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    className={cn("text-lg text-end", arabic.className)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="created_at"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>التاريخ</FormLabel>
                <FormControl>
                  <DatePicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button
              disabled={isLoading}
              type="submit"
              className="mt-4 w-24"
              size={"lg"}
            >
              {/* TODO: loading causes the button to shift */}
              {isLoading ? <Loading /> : "تأكيد"}
            </Button>
            <Link href="/logs">
              <Button
                type="button"
                className="mx-2"
                size={"lg"}
                variant={"outline"}
              >
                الغاء
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </Layout>
  );
}

export const paymentSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "المبلغ مطلوب",
      invalid_type_error: "المبلغ مطلوب",
    })
    .min(1, "المبلغ مطلوب"),
  phone: z
    .string({
      required_error: "رقم الهاتف مطلوب",
      invalid_type_error: "رقم الهاتف مطلوب",
    })
    .regex(/^01[0125]\d{8}$/, "رقم الهاتف غير صحيح"),
  created_at: z.date({
    required_error: "التاريخ مطلوب",
    invalid_type_error: "التاريخ مطلوب",
  }),
});

export type PaymentData = z.infer<typeof paymentSchema>;
