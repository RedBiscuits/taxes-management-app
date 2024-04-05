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
import { DatePicker } from "@/components/lib/datePicker";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Location } from "@/models";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export function FiltersModal({ locations }: { locations: Location[] }) {
  const form = useForm<ReceiptFilters>({
    resolver: zodResolver(receiptFiltersSchema),
  });

  const pathname = usePathname();
  const router = useRouter();

  const onSubmit = form.handleSubmit((data) => {
    const params = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "created_at") {
        if (data[key].status) {
          params.set(key, data[key].value?.toISOString() ?? "");
          params.set(`${key}_operator`, ">=");
          // TODO:flip this on mobile
        }
      } else if (key === "created_at_2") {
        if (data[key].status) {
          params.set(key, data[key].value?.toISOString() ?? "");
          params.set(`${key}_operator`, "<=");
        }
      } else if (key === "payed") {
        if (value) {
          params.set("close_date", "0000-00-00T00:00:00Z");
          params.set("close_date_operator", "<>");
        }
      }
      // else if (key === "location_id") {
      //   if (value) {
      //     params.set(key, String(data[key]) || "");
      //   }
      // }
    });

    const url = `${pathname}?${params.toString()}`;
    console.log("url => ", url);
    router.push(url);
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">خيارات البحث</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>خيارات البحث</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6 mb-6">
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="created_at.value"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel
                      className={cn(
                        !form.watch("created_at.status") && "opacity-50"
                      )}
                    >
                      تاريخ البداية
                    </FormLabel>
                    <FormControl>
                      <div className="w-full">
                        <DatePicker
                          disabled={!form.watch("created_at.status")}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="created_at.status"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="created_at_2.value"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel
                      className={cn(
                        !form.watch("created_at_2.status") && "opacity-50"
                      )}
                    >
                      تاريخ النهاية
                    </FormLabel>
                    <FormControl>
                      <div className="w-full">
                        <DatePicker
                          disabled={!form.watch("created_at_2.status")}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="created_at_2.status"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <FormField
              control={form.control}
              name="location_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المأمورية</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          aria-label={field.value}
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
                      <SelectItem className="text-end" value={0}>
                        {"الكل"}
                      </SelectItem>
                      {locations.map((location) => (
                        <SelectItem
                          className="text-end"
                          key={location.id}
                          value={location.id}
                        >
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <div className="flex items-center justify-between">
              <Label htmlFor="payed">مدفوع</Label>
              <FormField
                control={form.control}
                name="payed"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        id="payed"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">حفظ</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
export const receiptFiltersSchema = z.object({
  
  tax_type: z.string().optional(),
  payment_type: z.string().optional(),
  location_id: z.coerce.number().optional(),
});

export type ReceiptFilters = z.infer<typeof receiptFiltersSchema>;
