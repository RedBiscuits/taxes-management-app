"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Location, Day } from "@/models";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cookies } from "next/headers";

export function NewReceiptModal({
  locations,
  days,
}: {
  locations: Location[];
  days: Day[];
}) {
  const form = useForm<NewReceiptData>({
    resolver: zodResolver(newReceiptSchema),
  });

  const router = useRouter();

  const onSubmit = form.handleSubmit((data) => {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      params.set(key, String(value));
    });

    router.push(`receipts/new?${params.toString()}`);
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button className="mx-2" onClick={() => setIsOpen(true)}>
          انشاء
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تحصيل جديد</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6 mb-6">
            <FormField
              control={form.control}
              name="day_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اليوم</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          className="text-lg"
                          placeholder="نوع الضريبة"
                        >
                          {days.find(
                            (d) => Number(d.id) === Number(field.value)
                          )?.time || "اليوم"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {days.map((d) => (
                        <SelectItem
                          className="text-end"
                          key={d.id}
                          value={String(d.id)}
                        >
                          {d.time}
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
                          className="text-lg"
                          placeholder="المأمورية"
                        >
                          {locations.find(
                            (l) => Number(l.id) === Number(field.value)
                          )?.name || "المأمورية"}
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
            <DialogFooter className="flex gap-2">
              <Button type="submit">حفظ</Button>
              <Button
                type="button"
                variant={"outline"}
                onClick={() => {
                  form.reset();
                  setIsOpen(false);
                }}
              >
                الغاء
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
export const newReceiptSchema = z.object({
  location_id: z.coerce.number({
    invalid_type_error: "المأمورية مطلوبة",
    required_error: "المأمورية مطلوبة",
  }),
  day_id: z.coerce.number({
    invalid_type_error: "اليوم مطلوب",
    required_error: "اليوم مطلوب",
  }),
});

export type NewReceiptData = z.infer<typeof newReceiptSchema>;
