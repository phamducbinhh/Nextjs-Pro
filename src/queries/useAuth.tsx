import authApiRequest from "@/apiRequests/auth";
import { HttpStatusCode } from "@/constants/httpStatusCode.enum";
import { useAuth } from "@/context/AuthContext";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useLoginMutation = (
  options?: UseMutationOptions<any, unknown, LoginBodyType, unknown>
) => {
  const { setIsAuthenticated } = useAuth();

  return useMutation({
    ...options,
    mutationFn: (body: Omit<LoginBodyType, "login">) =>
      authApiRequest.login(body),

    onSuccess(data) {
      if (data.status === HttpStatusCode.Ok) {
        setIsAuthenticated(true);
      }
    },
  });
};
