import authApiRequest from "@/apiRequests/auth";
import { HttpError } from "@/lib/http";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  
  const res = (await request.json()) as LoginBodyType;

  const cookieStore = cookies();

  try {
    const { payload } = await authApiRequest.SLogin(res);

    const {
      data: { accessToken, refreshToken },
    } = payload;

    const decodedAccessToken = jwt.decode(accessToken) as { exp: number };

    const decodedRefreshToken = jwt.decode(refreshToken) as { exp: number };

    // Lưu trữ accessToken vào cookie với các thuộc tính bảo mật
    cookieStore.set("accessToken", accessToken, {
      path: "/", // Đặt phạm vi đường dẫn là root
      httpOnly: true, // Chỉ cho phép truy cập cookie qua HTTP, không qua JavaScript
      sameSite: "lax", // Thiết lập SameSite là "lax" để ngăn chặn CSRF
      secure: true, // Chỉ gửi cookie qua kết nối HTTPS
      expires: new Date(decodedAccessToken.exp * 1000), // Thiết lập thời gian hết hạn dựa trên accessToken
    });

    // Lưu trữ refreshToken vào cookie với các thuộc tính bảo mật
    cookieStore.set("refreshToken", refreshToken, {
      path: "/", // Đặt phạm vi đường dẫn là root
      httpOnly: true, // Chỉ cho phép truy cập cookie qua HTTP, không qua JavaScript
      sameSite: "lax", // Thiết lập SameSite là "lax" để ngăn chặn CSRF
      secure: true, // Chỉ gửi cookie qua kết nối HTTPS
      expires: new Date(decodedRefreshToken.exp * 1000), // Thiết lập thời gian hết hạn dựa trên refreshToken
    });

    return Response.json(payload);
    
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: "Lỗi không xác định",
        },
        {
          status: 500,
        }
      );
    }
  }
}
