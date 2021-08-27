
import firebase from 'firebase'

const UNAUTHORIZED = { 
    is_authorized: false, 
    current_user: null
}

export default {
    
    namespaced: true,

    state: {
        is_authorized: false,
        current_user: null,
    },

    getters: {

        user_id: state => {
            if ( state.current_user ) return state.current_user.uid
            else return null
        }

    },

    mutations: {

        set_auth ( state, data ) {
            state.is_authorized = data.is_authorized
            state.current_user = data.current_user
        }

    },

    actions: {

        async check_auth ( { commit } ) {

            // This sends a command to firebase that finds the currently signed in user,
            // and updates the state accordingly. Called on every router navigation.

            return new Promise( (resolve, reject) => {
                firebase.get_current_user().then( user => {

                    if ( user ) commit('set_auth', {
                        is_authorized: true,
                        current_user: user
                    })

                    else commit(UNAUTHORIZED)

                    resolve(user)

                }).catch( e => {
                    reject()
                })
            })
        },

    }
}