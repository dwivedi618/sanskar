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
        menuName: "My School",
        menuId: "configuration",
        icon: 'settings',
        path: 'configuration',
        url: "",
        subMenus: [
            {
                
                menuId: "configuration",
                icon: '',
                subMenuId: "fee-category",
                path: './configuration/master-fee-category',
                subMenuName: 'Fees',
                url: './configuration/master-fee-category'
            },
            {
                
                menuId: "configuration",
                subMenuId: "registered-classes",
                icon: '',
                path: './configuration/master-fee-category',
                subMenuName: 'Classes',
                url: './configuration/master-standard'
            },
            {
                
                menuId: "configuration",
                icon: '',
                subMenuId: "fee-structure",
                path: './configuration/fee-structure',
                subMenuName: 'Class wise fee',
                url: './configuration/fee-structure'
            }   
        ]
    }
]