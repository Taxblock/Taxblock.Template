import { Injectable, OnDestroy } from "@angular/core";
import {
  CanActivate,
  NavigationEnd,
  NavigationStart,
  Router,
} from "@angular/router";

// import { AuthService } from "./authService";

import { ConfigurationSettings } from "@core/models/configuration";
import { Subscription } from "rxjs";

@Injectable({ providedIn: "root" })
export class RouteGuard implements CanActivate {
  private routerSubscription: Subscription;

  constructor(
    // private _authService: AuthService,
    private route: Router) { }

  canActivate() {
    //let isLoggedIn = this._authService.isLoggedIn();
    let companyUrl: string = "/" + ConfigurationSettings.getCompanyUrl();
    let allowedRoutesObjectArray = ConfigurationSettings.getAccessControlDetails();
    const allowedRoutes = allowedRoutesObjectArray.map(({ url }) => url);
    let allowNavigation: boolean = true;
    let startUrl: string = "";
    let navigationUrl: string = "";
    let routeSubscription: Subscription;
    // this._authService.logout();

    // RouteGuardActive
    routeSubscription = this.route.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        // NavigationStart
        return true;
      }
      if (e instanceof NavigationEnd) {
        // NavigationEnd
        if (
          allowedRoutes.includes(this.route.url) ||
          this.route.url.includes("/employee/it-declaration") ||
          this.route.url.includes("/employer/dashboard") ||
          this.route.url.includes("/masters")
        ) {
          // RouteAuthSuccessful
          routeSubscription.unsubscribe();
          return true;
        } else {
          // RouteAuthFailed
          alert("Unauthorised Access Attemp");
          this.route.navigate([companyUrl]);
          routeSubscription.unsubscribe();
          return false;
        }
      }
    });
    return true;
  }
  
}
