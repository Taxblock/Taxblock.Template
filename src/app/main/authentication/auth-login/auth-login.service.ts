import { Injectable } from '@angular/core';
import { IdentityUser } from '@core/models/identty-user.model';
import { APIService } from '@core/services/apiService';
import { UserProfileService } from '@core/services/user-profile.service';

@Injectable()
export class LoginService {

    tokenValid: boolean;
    constructor(private apiService: APIService,private userProfileService : UserProfileService) { }

    loginURL: string = "Authorization/Login";
    logOutURL: string = "/Account/LogOut";
    changePasswordURL: string = "/Account/ChangePassword";
    forgotPasswordURL: string = "/Account/ForgotPassword/";

    Login(loginModel: any ) {
        return this.apiService.postData(this.loginURL, loginModel);
    }
    
    LogOff(UserID: number) {
                 return this.apiService.getData(this.logOutURL + "?UserID=" + UserID)       
    }

    setSession(authResult:IdentityUser) {
       this.userProfileService.SetUserData(authResult);    
    }

    ChangePassword(loginModel: any) {
        return this.apiService.postData(this.changePasswordURL, loginModel);
    }

    ForgotPassword(loginModel: any) {      
            return this.apiService.postData(this.forgotPasswordURL, loginModel);
     }
}


