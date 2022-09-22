import { Injectable } from "@angular/core";
import { ConfigurationSettings } from "@core/models/configuration";
import { APIService } from "./apiService";

@Injectable()
export class FinancialYearService {
    UserData: any = null;
    constructor(private apiService: APIService) { }

    URLLoadFinancialYear: string = ConfigurationSettings.ITax + "/IncomeTaxEFIllingDashboard/load-financial-year";

LoadFinancialYear() {
    return this.apiService.getData(this.URLLoadFinancialYear);
}
}