import http from "@/lib/http";
import { LoginBodyType, LoginResType } from "@/schemaValidations/auth.schema";

const authApiRequest = {
  SLogin: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body), // login server

  login: (body: LoginBodyType) =>
    http.post<LoginResType>("/api/auth/login", body, { baseUrl: "" }), // login client
};

export default authApiRequest;
