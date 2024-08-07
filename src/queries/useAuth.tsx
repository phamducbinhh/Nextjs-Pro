import authApiRequest from "@/apiRequests/auth";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useLoginMutation = (
  options?: UseMutationOptions<any, unknown, LoginBodyType, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<LoginBodyType, "login">) =>
      authApiRequest.login(body),
  });
};
