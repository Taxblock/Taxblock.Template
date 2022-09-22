import { environment } from "environments/environment";

export class ConfigurationSettings {
    //BASE_API_URL
    public static get BASE_API_URL(): string { return environment.BASE_API_URL; }
   
    public static get Masters(): string { return "Masters"; }
    public static get Transactions(): string { return "Transactions"; }
    public static get ITax(): string { return "ITax"; }
    public static get Dashboard(): string { return "Dashboard"; }
    public static get Report(): string { return "Report"; }
    public static get Administration(): string { return "Administration"; }
    public static get Leads(): string { return "Leads"; }
    public static get RateCard(): string { return "RateCard"; }
    public static get Details(): string { return "Details"; }
    public static get Documents(): string { return "Documents"; }
    public static get Admin(): string { return "Admin"; }


    

   

    constructor() { }

    public static getUserToken(): string {
        let userToken = <string>localStorage["id_token"];
        return userToken;
    }

    public static getUserName(): string {
        let userName = <string>localStorage["UserName"];
        return userName;
    }

    public static getUserId(): number {
        let userId = <number>localStorage["UserId"];
        return userId;
    }

    public static getUserFinancialId(): number {
        let userFinancialId = <number>localStorage["UserFinancialId"];
        return userFinancialId;
    }

    public static getRegisterUserId(): any {
        let registerUserId = <any>localStorage["RegisterUserId"];
        if (registerUserId == undefined || registerUserId == 'null') registerUserId = 0;
        return registerUserId;
    }

    public static getRegisterUserFinancialId(): any {
        let registerUserFinancialId = <any>localStorage["RegisterUserFinancialId"];
        if (registerUserFinancialId == undefined || registerUserFinancialId == 'null') registerUserFinancialId = 0;
        return registerUserFinancialId;
    }


    public static getUserRoleId(): number {
        let roleId = <number>localStorage["RoleId"];
        return roleId;
    }

    public static getCompanyUrl(): string {
        let companyUrl = <string>localStorage["CompanyUrl"];
        return companyUrl;
    }

    public static getCompanyName(): string {
        let companyName = <string>localStorage["CompanyName"];
        return companyName;
    }

    public static getCompanyId(): number {
        let companyId = <number>localStorage["CompanyId"];
        return companyId;
    }

    public static getCompanyFinancialId(): number {
        let companyFinancialId = <number>localStorage["CompanyFinancialId"];
        return companyFinancialId;
    }

    public static getFinancialYearStartDate(): Date {
        let fYearStartDate = <Date>localStorage["FYearStartDate"];
        let financialYearStartDate = new Date(fYearStartDate);
        return financialYearStartDate;
    }

    public static getFinancialYearEndDate(): Date {
        let fYearEndDate = <Date>localStorage["FYearEndDate"];
        let financialYearEndDate = new Date(fYearEndDate);
        return financialYearEndDate;
    }

    public static getAccessControlDetails() {
        let accessControlDetails = JSON.parse(localStorage.getItem("AccessControlDetails"));
        return accessControlDetails;
    }

    public static getHomePageByRole(): string {
        let homePage = <string>localStorage["HomePage"];
        return homePage;
    }

    public static removeRegisterIds() {
        localStorage.removeItem("RegisterUserId");
        localStorage.removeItem("RegisterUserFinancialId");
    }

    public static getAPPMiscSettingsDetails(Key: string) {
        let appMiscSettingsDetails = JSON.parse(localStorage.getItem("APPMiscSettingsDetails"));

        let appMiscSettings = appMiscSettingsDetails.filter(c => c.key == Key);
        if (appMiscSettings.length > 0) {
            return appMiscSettings[0].value;
        }
        return null;
    }

    public static getDob() {
        return localStorage.getItem("DOB")
    }

}
