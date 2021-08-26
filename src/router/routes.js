
const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '/', component: () => import('src/pages/AuthPage.vue'), meta: {
                requiresUnauth: true,
                breadcrumb: ( route ) => ([
                    { name: 'Sign In' },
                ])
            } },
            
            { path: '/board/:id', component: () => import('pages/GetBoardPage.vue') },
            { path: '/board/add', component: () => import('pages/AddBoardPage.vue') },

            { path: '/home', component: () => import('pages/HomePage.vue'), meta: { 
                    requiresAuth: true, 
                    breadcrumb: ( route ) => ([
                        { name: 'home', },
                    ]),
                }
            },
            { path: '/preferences', component: () => import('pages/PreferencesPage.vue'), meta: { 
                    requiresAuth: true, 
                    breadcrumb: ( route ) => ([
                        { name: 'home', path: '/home' },
                        { name: 'preferences', },
                    ]),
                }
            },

            { path: '/themes', component: () => import('src/pages/ThemesPage.vue'), meta: {
                    requiresAuth: true,
                    breadcrumb: ( route) => ([
                        { name: 'home', path: '/home' },
                        { name: 'themes', },
                    ]),
                }
            },

            { path: '/boards', component: () => import('pages/BoardsPage.vue'), meta: { 
                    requiresAuth: true, 
                    breadcrumb: ( route ) => ([
                        { name: 'home', path: '/home' },
                        { name: 'boards',},
                    ]),
                }
            },

            { path: '/board/:name/:id', component: () => import('src/pages/BoardPage.vue'), meta: {
                    requiresAuth: true,
                    breadcrumb: ( route ) => ([
                        { name: 'home', path: '/home' },
                        { name: 'boards', path: '/boards' },
                        { name: route.params.name }
                    ]),
                }
            },
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
