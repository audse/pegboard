
const routes = [
    {
        path: '/',
        component: () => import('layouts/Main.layout.vue'),
        children: [
            { path: '/', component: () => import('pages/AuthPage.vue'), meta: {
                requires_unauth: true,
                breadcrumb: ( route ) => ([
                    { name: 'home', path: '/home' },
                    { name: 'sign-in' },
                ])
            } },

            { path: '/home', component: () => import('pages/HomePage.vue'), meta: { 
                    requires_auth: true, 
                    breadcrumb: ( route ) => ([
                        { name: 'home', },
                    ]),
                }
            },
            { name: 'preferences_page', path: '/preferences', component: () => import('pages/Preferences.page.vue'), meta: { 
                    requires_auth: true, 
                    breadcrumb: ( route ) => ([
                        { name: 'home', path: '/home' },
                        { name: 'preferences', },
                    ]),
                }
            },

            { name: 'themes_page', path: '/themes', component: () => import('pages/Themes.page.vue'), meta: {
                    requires_auth: true,
                    breadcrumb: ( route ) => ([
                        { name: 'home', path: '/home' },
                        { name: 'themes', },
                    ]),
                }
            },

            { name: 'all_boards_page', path: '/boards', component: () => import('pages/All_Boards.page.vue'), meta: { 
                    requires_auth: true, 
                    breadcrumb: ( route ) => ([
                        { name: 'home', path: '/home' },
                        { name: 'boards',},
                    ])
                },
            },

            { name: 'board_page', path: '/boards/board/:id/:name', component: () => import('pages/Board.page.vue'), meta: {
                    requires_auth: true,
                    breadcrumb: ( route ) => ([
                        { name: 'home', path: '/home' },
                        { name: 'boards', path: '/boards' },
                        { name: route.params.name }
                    ]),
                }
            }
            
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/Error404.vue')
    }
]

export default routes
