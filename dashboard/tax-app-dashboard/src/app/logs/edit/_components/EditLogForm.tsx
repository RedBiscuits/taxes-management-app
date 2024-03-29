"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Log } from "@/models";
import { arabic } from "@/shared/fonts";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loading } from "@/components/loading";
import { addLog } from "@/shared/actions/logs";
import { toast } from "sonner"

export default function EditLogForm({ log }: { log: Log }) {
  const form = useForm<LogSchema>({
    resolver: zodResolver(logSchema),
    defaultValues: {
      content: log.content,
    },
  });

  const onSubmit = form.handleSubmit(async ({ content }) => {
    const res = await addLog(content, Number(log.version) + 1);

    if (res.success) {
      toast.success("تم تعديل التنبيه بنجاح");
    } else {
      toast.error("حدث خطأ ما");
    }
  });

  const isLoading = form.formState.isSubmitting;

  return (
    <div className="bg-white rounded-lg my-4 mx-2  px-4 py-4">
      <Form {...form}>
        <form onSubmit={onSubmit} className=" space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>التنبيهات</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    name="content"
                    className={cn("text-lg", arabic.className)}
                  ></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button
              disabled={isLoading}
              type="submit"
              className="mx-2 w-24"
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
    </div>
  );
}

const logSchema = z.object({
  content: z
    .string({
      required_error: "هذا الحقل مطلوب",
      invalid_type_error: "هذا الحقل مطلوب",
    })
    .min(1, { message: "هذا الحقل مطلوب" }),
});

type LogSchema = z.infer<typeof logSchema>;
