import { BackButton } from "@/lib/components";

export const options: any = {
  headerStyle: { backgroundColor: "#082f49" },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontFamily: "ElMessiri_700Bold",
  },
  headerTitleAlign: "center",
  headerLeft: () => <BackButton />,
};
