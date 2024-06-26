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
import { Location } from "@/models";
import { usePathname, useRouter } from "next/navigation";
import { paymentTypes, taxTypes } from "@/shared/constants/types";
import { useState } from "react";

export function FiltersModal({ locations }: { locations: Location[] }) {
  const form = useForm<ReceiptFilters>({
    resolver: zodResolver(receiptFiltersSchema),
  });

  const pathname = usePathname();
  const router = useRouter();

  const onSubmit = form.handleSubmit((data) => {
    const params = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      console.log("key => ", key, "\nvalue => ", value);
      if (!value || value === "الكل") {
        params.delete(key);
      } else {
        params.set(key, String(value) || "");
      }
    });

    const url = `${pathname}?${params.toString()}`;
    console.log("url => ", url);
    router.push(url);
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} variant="outline">
          خيارات البحث
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>خيارات البحث</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6 mb-6">
            <FormField
              control={form.control}
              name="tax_type"
              render={({ field }) => (
                <FormItem>
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
                    <SelectContent>
                      <SelectItem className="text-end" value={"الكل"}>
                        {"الكل"}
                      </SelectItem>
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
              name="payment_type"
              render={({ field }) => (
                <FormItem>
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
                      <SelectItem className="text-end" value={"الكل"}>
                        {"الكل"}
                      </SelectItem>
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
                          )?.name || "الكل"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem className="text-end" value={"0"}>
                        {"الكل"}
                      </SelectItem>
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
                  router.push("/receipts");
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
export const receiptFiltersSchema = z.object({
  // TODO:add day
  tax_type: z.string().optional(),
  payment_type: z.string().optional(),
  location_id: z.coerce.number().optional(),
});

export type ReceiptFilters = z.infer<typeof receiptFiltersSchema>;
