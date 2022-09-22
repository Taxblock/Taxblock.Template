import { Injectable } from "@angular/core";
import { APIService } from "@core/services/apiService";
import { LoginModel } from "../model/LoginModel";



@Injectable({ providedIn: 'root', })
export class ForgetPasswordService {

  changePasswordURL: string ="UserCredentials/changePassword";
  verifyAccountURL: string ="UserCredentials/verifyAccount";
  resetPasswordURL: string ="UserCredentials/ResetPassword";
  VerifyOTPURL: string ="UserCredentials/verifyOTP";

  constructor(
    private apiService: APIService) {

  }

  ChangePassword(loginModel: LoginModel) {
    return this.apiService.postData(this.changePasswordURL, loginModel)
  }

  VerifyAccount(userName: string) {
   // return this.apiService.getData(this.verifyAccountURL + "?userName=" + userName + "")
    return this.apiService.getData(this.verifyAccountURL  + '/' + userName);
  }

  ResetPassword(loginModel: LoginModel) {
    return this.apiService.postData(this.resetPasswordURL, loginModel)
  }

  VerifyOTP(loginModel: LoginModel) {
    return this.apiService.postData(this.VerifyOTPURL, loginModel)
  }



}