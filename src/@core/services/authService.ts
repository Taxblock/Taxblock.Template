import { Injectable } from "@angular/core";
import { APIService } from "./apiService";

@Injectable({ providedIn:'root'})
export class AuthService
{
    loginURL: string = "Authorization/ValidateAccess";
    constructor(private apiService: APIService) {

    }

    ValidateAccess() {
        return this.apiService.getData(this.loginURL);
    }


}