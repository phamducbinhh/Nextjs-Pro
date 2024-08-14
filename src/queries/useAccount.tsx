import accountApiRequest from "@/apiRequests/account";
import { HttpStatusCode } from "@/constants/httpStatusCode.enum";
import { UpdateMeBodyType } from "@/schemaValidations/account.schema";
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useAccountQuery = (
  { enabled }: { enabled: boolean },
  options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
  return useQuery({
    ...options,
    queryKey: ["account", "me"],
    queryFn: async () => {
      const response = await accountApiRequest.me();
      if (response.status === HttpStatusCode.Ok) {
        return response?.payload.data;
      }
    },
    enabled,
  });
};



export const useUpdateMeMutation = (
  options?: UseMutationOptions<any, unknown, UpdateMeBodyType, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<UpdateMeBodyType, "me-update">) => accountApiRequest.updateMe(body),
  });
};
