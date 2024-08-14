import mediaApiRequest from "@/apiRequests/media";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useUploadMediaMutation = (
  options?: UseMutationOptions<any, unknown, FormData, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<FormData, "media">) => mediaApiRequest.uploadImage(body),
  });
};
