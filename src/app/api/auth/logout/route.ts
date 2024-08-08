import authApiRequest from "@/apiRequests/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();

  const accessToken: any = cookieStore.get("accessToken")?.value;

  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken || !refreshToken) {
    cookieStore.delete("accessToken");

    cookieStore.delete("refreshToken");

    return Response.json(
      {
        message:
          "Không nhận được access token hoặc refresh token, buộc phải xóa cookie",
      },
      {
        status: 200,
      }
    );
  }

  try {
    const response = await authApiRequest.SLogout({
      accessToken,
      refreshToken,
    });

    return Response.json(response.payload);

  } catch (error) {
    
    cookieStore.delete("accessToken");

    cookieStore.delete("refreshToken");

    return Response.json(
      {
        message: "Lỗi khi gọi API đến server backend, buộc phải xóa cookie",
      },
      {
        status: 200,
      }
    );
  }
}
