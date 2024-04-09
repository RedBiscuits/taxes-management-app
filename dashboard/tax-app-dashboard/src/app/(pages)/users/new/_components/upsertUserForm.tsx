"use client";

import { Layout } from "@/components/layout";
import React, { useEffect } from "react";
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
import { Location, User } from "@/models";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUser } from "@/shared/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateUser } from "@/shared/actions/users";

export default function UpsertUserForm({
  locations,
  user,
}: {
  locations: Location[];
  user?: User;
}) {
  const form = useForm<UserData>({
    resolver: zodResolver(user ? updateUserSchema : userSchema),
    defaultValues: user
      ? {
          ...user,
          location_id: user.location?.id,
        }
      : {},
  });

  const router = useRouter();
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const res = user
        ? await updateUser(data, user.id)
        : await createUser(data);
      if (res.success) {
        toast.success(`تم ${user ? "تعديل" : "اضافة"} المستخدم بنجاح`);
        router.push("/users");
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
        {user ? "تعديل المستخدم" : "اضافة مستخدم جديد"}{" "}
      </p>
      <Form {...form}>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-x-4 gap-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم</FormLabel>
                <FormControl>
                  <Input
                    {...field}
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>كلمة المرور</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className={cn("text-lg", arabic.className)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تأكيد كلمة المرور</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className={cn("text-lg", arabic.className)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="job"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الوظيفة</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          className="text-lg text-green-500"
                          placeholder="الوظيفة"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem className="text-end" value={"employee"}>
                        موظف
                      </SelectItem>
                      <SelectItem className="text-end" value={"manager"}>
                        مدير
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>المأمورية</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        className="text-lg text-green-500"
                        placeholder="المأمورية"
                      >
                        {locations.find(
                          (l) => Number(l.id) === Number(field.value)
                        )?.name || ""}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem
                        className="text-end"
                        key={location.id}
                        value={String(location.id)}
                      >
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

const updateUserSchema = z
  .object({
    name: z
      .string({
        required_error: "هذا الحقل مطلوب",
      })
      .min(1, { message: "هذا الحقل مطلوب" }),
    phone: z
      .string({
        required_error: "هذا الحقل مطلوب",
      })
      .regex(/^01[0125]\d{8}$/, {
        message: "رقم الهاتف غير صالح",
      }),
    password: z
      .string({
        required_error: "هذا الحقل مطلوب",
      })
      .min(8, { message: "كلمة المرور يجب تكون على الاقل 8 حروف" })
      .optional(),

    password_confirmation: z
      .string({
        required_error: "هذا الحقل مطلوب",
      })
      .min(8, { message: "كلمة المرور يجب تكون على الاقل 8 حروف" })
      .optional(),
    job: z.enum(["manager", "employee"], {
      required_error: "هذا الحقل مطلوب",
      invalid_type_error: "هذا الحقل مطلوب",
    }),
    location_id: z.coerce.number({
      invalid_type_error: "هذا الحقل مطلوب",
      required_error: "هذا الحقل مطلوب",
    }),
  })
  .refine(
    (data) => {
      if (data.password && data.password_confirmation) {
        return data.password === data.password_confirmation;
      }
      return true;
    },
    {
      message: "كلمة المرور غير متطابقة",
      path: ["password_confirmation"],
    }
  );

const userSchema = z
  .object({
    name: z
      .string({
        required_error: "هذا الحقل مطلوب",
      })
      .min(1, { message: "هذا الحقل مطلوب" }),
    phone: z
      .string({
        required_error: "هذا الحقل مطلوب",
      })
      .regex(/^01[0125]\d{8}$/, {
        message: "رقم الهاتف غير صالح",
      }),
    password: z
      .string({
        required_error: "هذا الحقل مطلوب",
      })
      .min(8, { message: "كلمة المرور يجب تكون على الاقل 8 حروف" }),
    password_confirmation: z
      .string({
        required_error: "هذا الحقل مطلوب",
      })
      .min(8, { message: "كلمة المرور يجب تكون على الاقل 8 حروف" }),
    job: z.enum(["manager", "employee"], {
      required_error: "هذا الحقل مطلوب",
      invalid_type_error: "هذا الحقل مطلوب",
    }),
    location_id: z.coerce.number({
      invalid_type_error: "هذا الحقل مطلوب",
      required_error: "هذا الحقل مطلوب",
    }),
  })
  .refine(
    (data) => {
      console.log(data.password, data.password_confirmation);
      return data.password === data.password_confirmation;
    },
    {
      message: "كلمة المرور غير متطابقة",
      path: ["password_confirmation"],
    }
  );

export type UserData = z.infer<typeof userSchema>;
