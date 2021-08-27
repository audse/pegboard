
import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import auth from './auth'

export default store( () => {

    const Store = createStore({

        modules: {
            auth: auth
        },

        // enable strict mode (adds overhead!)
        // for dev mode and --debug builds only
        strict: process.env.DEBUGGING

    })

    return Store
})
