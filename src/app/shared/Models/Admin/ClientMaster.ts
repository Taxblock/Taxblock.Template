export class ClientProfileMaster {   
    UserId: number;
    ClientProfileId: number;
    ProfileTypeId: number;
    FName : string;
    MName : string;
    LName : string;
    DOB : Date| string | null;
    Gender : string;
    PANNo : string;
    CompanyName : string;
    CompanyUrl : string;
    CompanyPan : string;
    CompanyTan : string;
    Officialwebsite : string;
    EstablishedDate:Date| string | null;
    AAdharNo : string;
    EmailId : string;
    MobileNo : string;
    PhoneNo : string;
    ProfileTag : string;
    IsActive : boolean;
    IsPrimary : boolean;
    CorporateName : string;
    PasswordHash : string;
    AddedBy : number;
    AddedDate : Date| string | null;
    UpdatedBy : number;
    UpdatedDate : Date| string | null;
    Action : string;
}