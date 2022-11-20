export const menus = [
    {
        menuName: "Dashboard",
        menuId: "Dashboard",
        icon: 'dashboard',
        path: '',
        url: ""
    },
    {
        menuName: "Admission",
        menuId: "Admission",
        icon: 'school',
        path: 'admission',
        url: ""
    },
    {
        menuName: "Find Student",
        menuId: "find-student",
        icon: 'search',
        path: 'student',
        url: ""
    },
    {
        menuName: "Configuration",
        menuId: "configuration",
        icon: 'settings',
        path: 'configuration',
        url: "",
        subMenus: [
            {
                
                menuId: "configuration",
                icon: '',
                subMenuId: "fee-structure",
                path: './configuration/fee-structure',
                subMenuName: 'Fee Structure',
                url: './configuration/fee-structure'
            },
            {
                
                menuId: "configuration",
                icon: '',
                subMenuId: "fee-category",
                path: './configuration/master-fee-category',
                subMenuName: 'Fee Category',
                url: './configuration/master-fee-category'
            },
            {
                
                menuId: "configuration",
                subMenuId: "registered-classes",
                icon: '',
                path: './configuration/master-fee-category',
                subMenuName: 'Registered Classes',
                url: './configuration/master-standard'
            }
        ]

    }
]