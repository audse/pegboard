
import PreferenceService from './../../server/services/preference.service'

export default {

    namespaced: true,

    state: {
        theme_id: null,
    },

    mutations: {

        save ( state, data ) {
            if ( data.theme_id ) state.theme_id = data.theme_id
        },

    },

    actions: {

        async reload ( { commit, dispatch }, user_id ) {

            return new Promise( (resolve, reject) => {

                PreferenceService.find_by_user_id( user_id ).then( preferences => {

                    if ( preferences && preferences.data ) {
                        commit('save', preferences.data)
                        resolve(preferences.data)
                    } else resolve()

                }).catch( e => reject(e) )

            })

        },

        async add ( { commit }, data ) {

            return new Promise( (resolve, reject) => {
                if ( data.user_id ) {

                    PreferenceService.add( data ).then( results => {

                        if ( results ) commit('save', results.data)

                        resolve(results)

                    }).catch( e => reject(e) )

                } else reject()
                
            })
        },

        async find_by_user_id_and_update ( { commit }, data ) {

            return new Promise ( (resolve, reject) => {
                if ( data.user_id ) PreferenceService.find_by_user_id_and_update( data.user_id, data ).then( results => {
                    if ( results ) commit('save', results.data)
                    resolve(results)
                    
                }).catch( e => reject(e) )
            })
        },
    }
}