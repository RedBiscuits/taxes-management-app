import { usePost } from "@/lib/shared/query";
import { LoginData, loginSchema } from "./login.schema";
import { getUser, setToken, setUser } from "@/lib/shared/storage";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/lib/models";
import * as Application from "expo-application";

type LoginResponse = { user: User; token: string };
export function useLogin() {
  const { control, handleSubmit, formState, setError } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = usePost<
    LoginData & { device_id: string },
    LoginResponse
  >("auth/login", [], {
    onError: (error) => {
      // console.log("error", error.message);
      setError("root", { message: "الهاتف او كلمة المرور غير صحيح" });
    },

    onSuccess: async (data) => {
      await setToken(data.data.token);
      await setUser(data.data.user);

      const user = await getUser();

      switch (user?.roles[0].name) {
        case "manager":
          router.push("/manager/");
          break;
        case "employee":
          router.push("/user/");
          break;

        default:
          console.log("unknown role");
          break;
      }
    },
  });

  return {
    control,
    formState,
    isPending,
    login: handleSubmit(async (data: LoginData) =>
      mutate({
        ...data,
        // device_id: Application.getAndroidId()
        device_id: "123456789",
      })
    ),
  };
}
