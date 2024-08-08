import http from "@/lib/http";
import { LoginBodyType, LoginResType, LogoutBodyType } from "@/schemaValidations/auth.schema";

class AuthApiRequest {
  public SLogin(body: LoginBodyType): Promise<any> {
    return http.post<LoginResType>("/auth/login", body);
  }

  public login(body: LoginBodyType): Promise<any> {
    return http.post<LoginResType>("/api/auth/login", body, { baseUrl: "" });
  }

  public SLogout(
    body: LogoutBodyType & {
      accessToken: string;
    }
  ): Promise<any> {
    return http.post(
      "/auth/logout",
      {
        refreshToken: body.refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
        },
      }
    );
  }
  public logout(): Promise<any> {
    return http.post<LoginResType>("/api/auth/logout", null, { baseUrl: "" });
  }
}

const authApiRequest = new AuthApiRequest();

export default authApiRequest;
