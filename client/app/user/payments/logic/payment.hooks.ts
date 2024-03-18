import { useForm } from "react-hook-form";
import { PaymentData, paymentSchema } from "./payment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "@/lib/shared/query";
import { useToast } from "@/lib/components/toastModal/toastModal.zustand";

export function usePayment() {
  const { control, handleSubmit } = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
  });

  const { toast } = useToast();

  const { mutate, isPending } = usePost<PaymentData>(
    "payments",
    [["payments"]],
    {
      onSuccess: () => {
        toast.success("تمت العملية بنجاح");
      },
    }
  );

  return {
    control,
    isPending,
    addPayment: handleSubmit((data) => mutate(data)),
  };
}
