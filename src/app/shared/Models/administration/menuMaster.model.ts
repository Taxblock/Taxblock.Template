export class MenuMaster {
    MenuIdentity:number;
    MenuId: number;
    ParentMenuId: number;
    ModuleId: number;
    MenuNumber: number;
    MenuName: string;
    CSSClass: string;
    NgClass: string;
    FormLink: string;
    IsActive: boolean | null;
    HasChildren: boolean | null;
    AddedBy: number | null;
    AddedOn: Date | string | null;
    UpdatedBy: number | null;
    UpdatedOn: Date | string | null;
    URID: string;

}