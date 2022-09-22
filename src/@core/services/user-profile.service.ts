import { Injectable } from "@angular/core";
import { StateService } from "./state-service.service";
import { BehaviorSubject, Observable } from 'rxjs';
import { IdentityUser } from "@core/models/identty-user.model";
import { StateKeys } from "@core/models/state-keys.model";
import { environment } from "environments/environment";
import { CookieService } from "ngx-cookie-service";

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  
    //public
    public currentUser: Observable<IdentityUser>;

    public currentUserSubject: BehaviorSubject<IdentityUser>;

    constructor(private stateService: StateService,
                private cookieService: CookieService
                ) {

        this.currentUserSubject = new BehaviorSubject<IdentityUser>(this.stateService.getData(StateKeys.UserData));
        this.currentUser = this.currentUserSubject.asObservable();
    

     }

     public get CurrentUserValue(): IdentityUser {
        return this.currentUserSubject.value;
      }

    // SetUserData(userData: IdentityUser) {
    //     this.stateService.SetData(StateKeys.UserData, userData);
    //     this.currentUserSubject.next(userData);
    // }

    SetUserData(userData: IdentityUser) {
      this.stateService.SetData(StateKeys.UserData, userData);
      if (userData != undefined && userData != null) {
        this.cookieService.set(
          environment.AUTH_COOKIE_NAME,
          JSON.stringify(userData),
          { domain: environment.DOMAIN }
        );
        // if (userData.EnableBackOffice) {
        //   window.location.href = environment.CRM_APP_URL;
        // }
      } else {
        this.cookieService.delete(environment.AUTH_COOKIE_NAME,"/",environment.DOMAIN);
        this.cookieService.delete(environment.AUTH_COOKIE_NAME,"/");
      }
  
      this.currentUserSubject.next(userData);
      //this.postCrossDomainMessage(APPNames.CRM,environment.CRM_APP_URL,userData);
    }
  

    
    GetUserData() {
      return this.stateService.getData(StateKeys.UserData);
    }


    getUserId(): number {
      let userId : number ;
      if(this.CurrentUserValue)
      {
        userId  = this.CurrentUserValue.UserId;
      }
      return userId;
    }
    

    logout() {
      this.SetUserData(null);
      window.location.href = environment.WebsiteURL;
    }
}