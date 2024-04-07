"use client";

import { Layout } from "@/components/layout";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { paymentTypes, taxTypes } from "@/shared/constants/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/lib/loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { arabic } from "@/shared/fonts";
import { Entry } from "@/models";
import { editEntry } from "@/shared/actions/entries";
export const EditForm = ({ entry }: { entry: Entry }) => {
  const router = useRouter();
  const form = useForm<EditEntry>({
    resolver: zodResolver(editEntrySchema),
    defaultValues: {
      value: entry.value,
      tax_type: entry.tax_type as (typeof taxTypes)[number],
      payment_type: entry.payment_type as (typeof paymentTypes)[number],
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await editEntry({
        ...data,
        id: entry.id,
      } as Entry);
      if (res.success) {
        toast.success("تم تعديل التحصيل بنجاح");
      } else {
        toast.error("حدث خطأ ما");
      }
      router.push("/receipts");
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ما");
    }
  });

  const isLoading = form.formState.isSubmitting;

  return (
    <Layout>
      <p className="text-xl font-semibold mb-6"> تعديل التحصيل</p>

      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="flex items-end justify-between gap-4">
            <FormField
              control={form.control}
              name={`tax_type`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>نوع الضريبة</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          className="text-lg"
                          placeholder="نوع الضريبة"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      {taxTypes.map((t) => (
                        <SelectItem
                          className="text-end"
                          key={t}
                          value={String(t)}
                        >
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`payment_type`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>نوع الدفع</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          className="text-lg"
                          placeholder="نوع الدفع"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {paymentTypes.map((p) => (
                        <SelectItem
                          className="text-end"
                          key={p}
                          value={String(p)}
                        >
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`value`}
              render={({ field }) => (
                <FormItem className="w-full">
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
          </div>
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
            <Link href="/receipts">
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
};

const editEntrySchema = z.object({
  value: z.coerce
    .number({ invalid_type_error: "يجب عليك ادخال المبلغ" })
    .min(1, "يجب عليك ادخال المبلغ"),
  tax_type: z.enum(taxTypes, {
    invalid_type_error: "يجب عليك اختيار نوع الضريبة",
  }),
  payment_type: z.enum(paymentTypes, {
    invalid_type_error: "يجب عليك اختيار نوع الدفع",
  }),
});

type EditEntry = z.infer<typeof editEntrySchema>;
