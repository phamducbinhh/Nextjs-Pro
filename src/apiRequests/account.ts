import http from "@/lib/http";
import { AccountResType, UpdateMeBodyType } from "@/schemaValidations/account.schema";

class AuthAccountRequest {
  public me(): Promise<any> {
    
    return http.get<AccountResType>("/accounts/me");
  }
  public updateMe(body: UpdateMeBodyType): Promise<any> {

    return http.put<AccountResType>("/accounts/me",body);
  }
}

const accountApiRequest = new AuthAccountRequest();

export default accountApiRequest;