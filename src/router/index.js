import { route } from 'quasar/wrappers'
import state from 'src/store/auth/state'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

// import firebase from 'firebase'


export default route(function ( { store, /*ssrContext*/ } )   {

    const createHistory = process.env.SERVER
        ? createMemoryHistory
        : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

    const Router = createRouter({

        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,

        // Leave this as is and make changes in quasar.conf.js instead!
        history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
    })

    Router.beforeEach(async (to, from, next) => {

        const requires_auth = to.meta.requires_auth
        const requires_unauth = to.meta.requires_unauth

        // if (auth && !await firebase.get_current_user()) {
        //     next('/');
        // } else if (unauth && await firebase.get_current_user()) {
        //     next('/home')
        // } else {
        //     next();
        // }
    
        // Check if the visitor is signed in or not
        if ( await store.dispatch('check_auth') ) {
            if ( requires_unauth ) next( '/home' ) // Redirect to signed-in home page
            else next()
        } else {
            if ( requires_auth ) next( '/' ) // Redirect to sign-in/sign-up page
            else next()
        }


    })

    return Router
})
