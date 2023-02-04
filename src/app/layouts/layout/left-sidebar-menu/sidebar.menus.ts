export interface MainMenu {
    name: string,
    id: string,
    icon: string,
    path: string,
    url: string,
    subMenus? : SubMenu[]
}

export interface SubMenu extends MainMenu {
    pid : string,
    subMenuId: string,
    subMenus?: SubMenu[]
}
