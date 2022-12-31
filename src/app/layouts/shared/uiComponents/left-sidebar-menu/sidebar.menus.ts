export interface MainMenu {
    name: string,
    id: string,
    icon: string,
    path: string,
    url: string,
    subMenus? : SubMenu[]
}

interface SubMenu extends MainMenu {
    pid : string,
    subMenuId: string
}
