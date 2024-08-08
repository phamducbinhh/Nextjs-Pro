import authApiRequest from "@/apiRequests/auth";
import { HttpStatusCode } from "@/constants/httpStatusCode.enum";
import { useAuth } from "@/context/AuthContext";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLoginMutation = (
  options?: UseMutationOptions<any, unknown, LoginBodyType, unknown>
) => {
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();

  return useMutation({
    ...options,
    mutationFn: (body: Omit<LoginBodyType, "login">) =>
      authApiRequest.login(body),

    onSuccess(data) {
      if (data.status === HttpStatusCode.Ok) {
        setIsAuthenticated(true);
        router.push("/manage/dashboard");
      }
    },
  });
};

export const useLogoutMutation = () => {
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();
  return useMutation({
    mutationFn: () => authApiRequest.logout(),

    onSuccess(data) {
      if (data.status === HttpStatusCode.Ok) {
        setIsAuthenticated(false);
        router.push("/");
      }
    },
  });
};
