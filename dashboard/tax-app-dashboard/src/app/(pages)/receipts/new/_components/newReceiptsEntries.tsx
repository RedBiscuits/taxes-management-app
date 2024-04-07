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
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loading } from "@/components/lib/loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { paymentTypes, taxTypes } from "@/shared/constants/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createReceipt } from "@/shared/actions/receipts";
import { addEntries } from "@/shared/actions/entries";
import { Entry } from "@/models";

export default function NewReceiptEntries() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const location_id = searchParams.get("location_id");
  const day_id = searchParams.get("day_id");

  if (!location_id || !day_id) router.replace("/receipts");

  const form = useForm<NewEntries>({
    resolver: zodResolver(newEntriesSchema),
    defaultValues: {
      location_id: Number(location_id),
      day_id: Number(day_id),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "entries",
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const receipt = await createReceipt(data.day_id, data.location_id);

      const entries = data.entries.map(
        (entry) =>
          ({
            ...entry,
            receipt_id: receipt.data.id,
          } as unknown as Entry)
      );

      console.log(entries);

      const result = await addEntries({ entries });

      if (result.success) {
        toast.success("تمت العملية بنجاح");
        router.push("/receipts");
      } else {
        toast.error("حدث خطأ ما");
      }
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ ما");
    }
  });
  const isLoading = form.formState.isSubmitting;

  return (
    <Layout>
      <p className="text-xl font-semibold mb-6">اضافة تحصيلات جديدة</p>
      <Form {...form}>
        <form onSubmit={onSubmit} className=" space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-end justify-between gap-4"
            >
              <FormField
                control={form.control}
                name={`entries.${index}.tax_type`}
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
                name={`entries.${index}.payment_type`}
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
                name={`entries.${index}.value`}
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

              <Button onClick={() => remove(index)}>{"-"}</Button>
            </div>
          ))}
          <Button
            onClick={() =>
              append({
                value: 1,
                tax_type: "ضريبة أطيان",
                payment_type: "نقدي",
              })
            }
          >
            اضف ضريبة
          </Button>

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
}

const newEntriesSchema = z.object({
  day_id: z.coerce.number(),
  location_id: z.coerce.number(),
  entries: z.array(
    z.object({
      value: z.coerce
        .number({ invalid_type_error: "يجب عليك ادخال المبلغ" })
        .min(1, "يجب عليك ادخال المبلغ"),
      tax_type: z.enum(taxTypes, {
        invalid_type_error: "يجب عليك اختيار نوع الضريبة",
      }),
      payment_type: z.enum(paymentTypes, {
        invalid_type_error: "يجب عليك اختيار نوع الدفع",
      }),
    })
  ),
});

export type NewEntries = z.infer<typeof newEntriesSchema>;
