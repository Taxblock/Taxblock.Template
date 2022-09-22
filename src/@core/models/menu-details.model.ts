export class MenuDetails {
    MenuIdentity: number;
    MenuId: number;
    ParentMenuId: number | null;
    HasChildren: boolean | null;
    ModuleId: number;
    MenuNumber: number;
    MenuName: string;
    CSSClass: string;
    NgClass: string;
    FormLink: string;
    IsActive: boolean | null;
    Childrens: MenuDetails[];
}