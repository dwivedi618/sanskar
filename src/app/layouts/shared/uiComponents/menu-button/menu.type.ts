import { Action } from "./actions.enum";
export interface Menu{
        menuName: string,
        menuId: Action,
        icon?: string,
        path?: string,
        url?: string
}