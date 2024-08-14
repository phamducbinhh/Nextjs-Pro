import http from "@/lib/http";
import { UploadImageResType } from "@/schemaValidations/media.schema";

class MediaApiRequest {
  public uploadImage(body: FormData): Promise<any> {
    return http.post<UploadImageResType>("/media/upload", body);
  }
}

const mediaApiRequest = new MediaApiRequest();

export default mediaApiRequest;
