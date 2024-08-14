import http from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";

class AuthAccountRequest {
  public me(): Promise<any> {
    return http.get<AccountResType>("/accounts/me");
  }
}

const accountApiRequest = new AuthAccountRequest();

export default accountApiRequest;