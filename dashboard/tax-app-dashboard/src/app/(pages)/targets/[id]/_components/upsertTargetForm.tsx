"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { arabic } from "@/shared/fonts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createTarget, updateTarget } from "@/shared/actions/target";
import { Loading } from "@/components/lib/loading";
import { useRouter } from "next/navigation";
import { Target } from "@/models/target";

export const UpsertTargetForm = ({
  location_id,
  target,
}: {
  location_id: number;
  target?: Target;
}) => {
  const form = useForm<TargetData>({
    resolver: zodResolver(targetSchema),
    defaultValues: {
      location_id,
      ...(target
        ? {
            total: target.total,
            january: target.january,
            february: target.february,
            march: target.march,
            april: target.april,
            may: target.may,
            june: target.june,
            july: target.july,
            august: target.august,
            september: target.september,
            october: target.october,
            november: target.november,
            december: target.december,
          }
        : {}),
    },
  });

  const router = useRouter();

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const res = target
        ? await updateTarget(data, target.id)
        : await createTarget(data);
      if (res.success) {
        toast.success("تم الحفظ بنجاح");
        router.push(`/targets?location_id=${location_id}`);
      } else {
        toast.error("حدث خطأ ما");
      }
    } catch (error) {
      toast.error("حدث خطأ ما");
    }
  });

  const isLoading = form.formState.isSubmitting;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 mx-2 mt-2">انشاء مستهدف</h2>
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-2 gap-y-6 gap-x-4 max-w-2xl"
        >
          <FormField
            control={form.control}
            name="total"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>المبلغ الاجمالي</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      type="number"
                      className={cn("text-lg text-start", arabic.className)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="january"
            render={({ field }) => (
              <FormItem>
                <FormLabel>يناير</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      type="number"
                      className={cn("text-lg text-start", arabic.className)}
                    />
                    <span className="text-lg">%</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="february"
            render={({ field }) => (
              <FormItem>
                <FormLabel>فبراير</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      type="number"
                      className={cn("text-lg text-start", arabic.className)}
                    />
                    <span className="text-lg">%</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="march"
            render={({ field }) => (
              <FormItem>
                <FormLabel>مارس</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      type="number"
                      className={cn("text-lg text-start", arabic.className)}
                    />
                    <span className="text-lg">%</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="april"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ابريل</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      type="number"
                      className={cn("text-lg text-start", arabic.className)}
                    />
                    <span className="text-lg">%</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="may"
            render={({ field }) => (
              <FormItem>
                <FormLabel>مايو</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      type="number"
                      className={cn("text-lg text-start", arabic.className)}
                    />
                    <span className="text-lg">%</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="june"
            render={({ field }) => (
              <FormItem>
                <FormLabel>يونيو</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      type="number"
                      className={cn("text-lg text-start", arabic.className)}
                    />
                    <span className="text-lg">%</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="july"
            render={({ field }) => (
              <FormItem>
                <FormLabel>يوليو</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      type="number"
                      className={cn("text-lg text-start", arabic.className)}
                    />
                    <span className="text-lg">%</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="august"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اغسطس</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      type="number"
                      className={cn("text-lg text-start", arabic.className)}
                    />
                    <span className="text-lg">%</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="september"
            render={({ field }) => (
              <FormItem>
                <FormLabel>سبتمبر</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      type="number"
                      className={cn("text-lg text-start", arabic.className)}
                    />
                    <span className="text-lg">%</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="october"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اكتوبر</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      type="number"
                      className={cn("text-lg text-start", arabic.className)}
                    />
                    <span className="text-lg">%</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="november"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نوفمبر</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      type="number"
                      className={cn("text-lg text-start", arabic.className)}
                    />
                    <span className="text-lg">%</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="december"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ديسمبر</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      type="number"
                      className={cn("text-lg text-start", arabic.className)}
                    />
                    <span className="text-lg">%</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-2">
            <Button disabled={isLoading} type="submit">
              {isLoading ? <Loading /> : "حفظ"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const targetSchema = z
  .object({
    location_id: z.number(),
    total: z.coerce.number({
      invalid_type_error: "يجب عليك تحديد المستهدف",
      required_error: "يجب عليك تحديد المستهدف",
    }),
    january: z.coerce
      .number({
        invalid_type_error: "هذا الحقل مطلوب",
        required_error: "هذا الحقل مطلوب",
      })
      .min(0.01, "القيمة يجب ان تكون اكبر من صفر")
      .multipleOf(0.01),
    february: z.coerce
      .number({
        invalid_type_error: "هذا الحقل مطلوب",
        required_error: "هذا الحقل مطلوب",
      })
      .min(0.01, "القيمة يجب ان تكون اكبر من صفر")
      .multipleOf(0.01),

    march: z.coerce
      .number({
        invalid_type_error: "هذا الحقل مطلوب",
        required_error: "هذا الحقل مطلوب",
      })
      .min(0.01, "القيمة يجب ان تكون اكبر من صفر")
      .multipleOf(0.01),

    april: z.coerce
      .number({
        invalid_type_error: "هذا الحقل مطلوب",
        required_error: "هذا الحقل مطلوب",
      })
      .min(0.01, "القيمة يجب ان تكون اكبر من صفر")
      .multipleOf(0.01),

    may: z.coerce
      .number({
        invalid_type_error: "هذا الحقل مطلوب",
        required_error: "هذا الحقل مطلوب",
      })
      .min(0.01, "القيمة يجب ان تكون اكبر من صفر")
      .multipleOf(0.01),

    june: z.coerce
      .number({
        invalid_type_error: "هذا الحقل مطلوب",
        required_error: "هذا الحقل مطلوب",
      })
      .min(0.01, "القيمة يجب ان تكون اكبر من صفر")
      .multipleOf(0.01),

    july: z.coerce
      .number({
        invalid_type_error: "هذا الحقل مطلوب",
        required_error: "هذا الحقل مطلوب",
      })
      .min(0.01, "القيمة يجب ان تكون اكبر من صفر")
      .multipleOf(0.01),

    august: z.coerce
      .number({
        invalid_type_error: "هذا الحقل مطلوب",
        required_error: "هذا الحقل مطلوب",
      })
      .min(0.01, "القيمة يجب ان تكون اكبر من صفر")
      .multipleOf(0.01),

    september: z.coerce
      .number({
        invalid_type_error: "هذا الحقل مطلوب",
        required_error: "هذا الحقل مطلوب",
      })
      .min(0.01, "القيمة يجب ان تكون اكبر من صفر")
      .multipleOf(0.01),

    october: z.coerce
      .number({
        invalid_type_error: "هذا الحقل مطلوب",
        required_error: "هذا الحقل مطلوب",
      })
      .min(0.01, "القيمة يجب ان تكون اكبر من صفر")
      .multipleOf(0.01),

    november: z.coerce
      .number({
        invalid_type_error: "هذا الحقل مطلوب",
        required_error: "هذا الحقل مطلوب",
      })
      .min(0.01, "القيمة يجب ان تكون اكبر من صفر")
      .multipleOf(0.01),

    december: z.coerce
      .number({
        invalid_type_error: "هذا الحقل مطلوب",
        required_error: "هذا الحقل مطلوب",
      })
      .min(0.01, "القيمة يجب ان تكون اكبر من صفر")
      .multipleOf(0.01),
  })
  .refine(
    (data) => {
      return (
        data.january +
          data.february +
          data.march +
          data.april +
          data.may +
          data.june +
          data.july +
          data.august +
          data.september +
          data.october +
          data.november +
          data.december ===
        100
      );
    },
    {
      message: "مجموع النسب يجب ان يساوي %100",
      path: ["total"],
    }
  );

export type TargetData = z.infer<typeof targetSchema>;
