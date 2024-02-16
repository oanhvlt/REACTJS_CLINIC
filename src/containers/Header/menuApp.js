export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu_cms.admin.user', 
        menus: [
            // {
            //     name: 'menu_cms.system.system-administrator.header',
            //     subMenus: [
            //         //link: this is route initial at 'system.js'
            //         { name: 'menu_cms.system.system-administrator.user-manage', link: '/system/user-manage' },
            //         { name: 'menu_cms.system.system-administrator.user-redux', link: '/system/user-redux' },
                    
            //     ]
            // },
            {
                name: 'menu_cms.admin.crud',
                link: '/system/user-manage'
            },
            {
                name: 'menu_cms.admin.crud-redux',
                link: '/system/user-redux'
            },
            {
                name: 'menu_cms.admin.manage-doctor',
                link: '/system/user-doctor'
            },
            {
                name: 'menu_cms.admin.manage-admin',
                link: '/system/user-admin'
            },
           
           
        ]
    },

    { //Quản lý phòng khám
        name: 'menu_cms.admin.clinic', 
        menus: [
            {
                name: 'menu_cms.admin.manage-clinic',
                link: '/system/manage-clinic'
            },   
        ]
    },
    { //Quản lý chuyên khoa
        name: 'menu_cms.admin.specialty', 
        menus: [
            {
                name: 'menu_cms.admin.manage-specialty',
                link: '/system/manage-specialty'
            },   
        ]
    },
    { //Quản lý cẩm nang
        name: 'menu_cms.admin.handbook', 
        menus: [
            {
                name: 'menu_cms.admin.manage-handbook',
                link: '/system/manage-handbook'
            },   
        ]
    },
];