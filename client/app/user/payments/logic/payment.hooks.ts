import { useForm } from "react-hook-form";
import { PaymentData, paymentSchema } from "./payment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "@/lib/shared/query";
import { useToast } from "@/lib/components/toastModal/toastModal.zustand";
import { getUser } from "@/lib/shared/storage";

export function usePayment() {
  const { control, handleSubmit, reset } = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      created_at: new Date(),
    },
  });

  const { toast } = useToast();

  const { mutate, isPending } = usePost<PaymentData & { user_id: number }>(
    "payments",
    [["payments"]],
    {
      onSuccess: () => {
        toast.success("تمت العملية بنجاح");
        reset();
      },
      onError: (error) => {
        console.log(error);
        toast.error("حدث خطأ ما");
      },
    }
  );

  return {
    control,
    isPending,
    addPayment: handleSubmit(async (data) =>
      mutate({ ...data, user_id: (await getUser())!.id })
    ),
  };
}
