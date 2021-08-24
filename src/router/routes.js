
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
            { path: '/home', component: () => import('pages/HomePage.vue'), meta: { 
                    requiresAuth: true, 
                    breadcrumb: ( route ) => ([
                        { name: 'Home', },
                    ]),
                }
            },

            { path: '/themes', component: () => import('src/pages/ThemesPage.vue'), meta: {
                    requiresAuth: true,
                    breadcrumb: ( route) => ([
                        { name: 'Home', path: '/home' },
                        { name: 'Themes', },
                    ]),
                }
            },

            { path: '/boards', component: () => import('pages/BoardsPage.vue'), meta: { 
                    requiresAuth: true, 
                    breadcrumb: ( route ) => ([
                        { name: 'Home', path: '/home' },
                        { name: 'Boards',},
                    ]),
                }
            },

            { path: '/board/:name/:id', component: () => import('src/pages/BoardPage.vue'), meta: {
                    requiresAuth: true,
                    breadcrumb: ( route ) => ([
                        { name: 'Home', path: '/home' },
                        { name: 'Boards', path: '/boards' },
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
