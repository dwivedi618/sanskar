import { Action } from "./actions.enum";

export const ActionMenus = [
    {
        menuName: "Delete",
        menuId: Action.DELETE,
        icon: 'delete',
        path: '',
        url: ""
    },
    {
        menuName: "Edit",
        menuId: Action.EDIT,
        icon: 'edit',
        path: '',
        url: ""
    }
]

export const classActionMenus = [
    {
        menuName: "Delete",
        menuId: Action.DELETE,
        icon: 'delete',
        path: '',
        url: ""
    },
    {
        menuName: "Edit",
        menuId: Action.EDIT,
        icon: 'edit',
        path: '',
        url: ""
    },
    {
        menuName: "Show sections",
        menuId: Action.NAVIGATE,
        icon: 'dataset',
        path: 'configuration/section',
        url: ""
    },
    {
        menuName: "Show fee structure",
        menuId: Action.NAVIGATE,
        icon: 'folder_open',
        path: 'configuration/fee-structure',
        url: ""
    }
]

export const studentActionMenus = [
    {
        menuName: "Delete",
        menuId: Action.DELETE,
        icon: 'delete',
        path: '',
        url: ""
    },
    {
        menuName: "Edit",
        menuId: Action.EDIT,
        icon: 'edit',
        path: '',
        url: ""
    }
]
export const admissionRequestAction = [
    {
        menuName: "Delete",
        menuId: Action.DELETE,
        icon: 'delete',
        path: '',
        url: ""
    },
    {
        menuName: "Complete Registration",
        menuId: Action.NAVIGATE,
        icon: 'edit',
        path: 'configuration/section',
        url: ""
    }
]