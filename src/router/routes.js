
const routes = [
    {
        path: '/',
        component: () => import('layouts/Main.layout.vue'),
        children: [
            { path: '/', component: () => import('pages/AuthPage.vue'), meta: {
                requires_unauth: true,
                breadcrumb: ( route ) => ([
                    { name: 'Sign In' },
                ])
            } },

            { path: '/home', component: () => import('pages/HomePage.vue'), meta: { 
                    requires_auth: true, 
                    breadcrumb: ( route ) => ([
                        { name: 'home', },
                    ]),
                }
            },
            { path: '/preferences', component: () => import('pages/PreferencesPage.vue'), meta: { 
                    requires_auth: true, 
                    breadcrumb: ( route ) => ([
                        { name: 'home', path: '/home' },
                        { name: 'preferences', },
                    ]),
                }
            },

            { path: '/themes', component: () => import('pages/ThemesPage.vue'), meta: {
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
