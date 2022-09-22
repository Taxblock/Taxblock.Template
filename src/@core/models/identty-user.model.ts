import { CoreMenu } from "@core/types";
import { MenuDetails } from "./menu-details.model";
import { RoleDetails } from "./role-Details";

export class IdentityUser {
    IdentityUserId: number | null;
    UserId: number | null;
    UserName: string;
    MenuMasters: MenuDetails[];
  
    roles:RoleDetails[];
    ApplicationToken: string;
    FY : string;
    AY : string;
    FYAYId : number;
    CurrentRoleId : number;
}