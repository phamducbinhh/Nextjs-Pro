import http from "@/lib/http";
import { LoginBodyType, LoginResType } from "@/schemaValidations/auth.schema";

class AuthApiRequest {
  public SLogin(body: LoginBodyType) {
    return http.post<LoginResType>("/auth/login", body);
  }
  public login(body: LoginBodyType) {
    http.post<LoginResType>("/api/auth/login", body, { baseUrl: "" });
  }
}

const authApiRequest = new AuthApiRequest();

export default authApiRequest;

