import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { UserProfileService } from "./user-profile.service";
import { environment } from "environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router,
        private userProfileService : UserProfileService
         ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let idToken: any; 
        
        if (this.userProfileService.CurrentUserValue) {
            idToken = this.userProfileService.CurrentUserValue.ApplicationToken;
        }
        
        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + idToken)
            });

            return next.handle(cloned).pipe(catchError(x=> this.handleAuthError(x)));
        }
        else {
            return next.handle(req).pipe(catchError(x=> this.handleAuthError(x)));
        }
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        //handle your auth error or rethrow
        console.log("In handleerror");
        try {
               // this.loaderService.hide();
        }
        catch
        {

        }
        if (err.status === 401 || err.status === 403) {
            //navigate /delete cookies or whatever
           window.location.href = environment.WebsiteURL;
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            return of(err.message); // or EMPTY may be appropriate here
        }
         throw err;
    }


}