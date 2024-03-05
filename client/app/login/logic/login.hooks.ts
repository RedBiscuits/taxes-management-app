import { useCustomMutation } from "@/lib/shared/query";
import { LoginData, loginSchema } from "./login.schema";
import { User, getUser, setToken, setUser } from "@/lib/shared/storage";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginResponse = { user: User; token: string };
export function useLogin() {
  const { control, handleSubmit, formState, setError } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useCustomMutation<
    LoginData & { device_id: string },
    LoginResponse
  >("/auth/login", "post", {
    onSuccess: async (data) => {
      await setToken(data.data.data.token);
      await setUser(data.data.data.user);

      const user = await getUser();

      // switch this
      if (user?.employee) {
        router.push("/(admin)/dashboard/create account/");
      } else {
        router.push("/(user)/day/");
      }
    },
    onError: (error) => {
      console.log("error", JSON.stringify(error, null, 2));
      setError("root", { message: "الهاتف او كلمة المرور غير صحيح" });
    },
  });

  return {
    control,
    formState,
    isPending,
    login: handleSubmit(async (data: LoginData) =>
      mutate({ ...data, device_id: "123" })
    ),
  };
}
