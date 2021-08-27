
import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import auth from './auth.store'
import board from './board.store'
import list from './list.store'

const auth_state = createPersistedState({
    paths: ['auth']
})

const board_state = createPersistedState({
    paths: ['board']
})

const list_state = createPersistedState({
    paths: ['list']
})

export default store( () => {

    const Store = createStore({

        modules: {
            auth: auth,
            board: board,
            list: list,
        },

        plugins: [
            auth_state,
            board_state,
            list_state
        ],

        // enable strict mode (adds overhead!)
        // for dev mode and --debug builds only
        strict: process.env.DEBUGGING

    })

    return Store
})
