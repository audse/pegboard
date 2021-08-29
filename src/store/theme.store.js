
import ThemeService from './../../server/services/theme.service'

export default {

    namespaced: true,

    state: {
        themes: []
    },

    getters: {

        find_by_id: state => (theme_id) => {
            return state.themes.find( theme => theme._id === theme_id )
        }

    },

    mutations: {

        save ( state, data ) {
            if ( data && data.themes ) state.themes = data.themes 
        },

        find_by_id_and_save ( state, data ) {
            const state_index = state.themes.findIndex( theme => theme._id === data._id )
            if ( state_index != -1 ) state.themes.splice(state_index, 1, data)
            else state.themes.push(data)
        },

        add_and_save ( state, data ) {
            if ( data.theme ) state.themes.push( data.theme )
        },

        remove_by_id_and_save ( state, data ) {
            if ( data.theme_id ) {
                const state_index = state.themes.findIndex( theme => theme._id === data.theme_id )
                if ( state_index !== null && state_index !== undefined ) state.themes.splice(state_index, 1)
            }
        }

    },

    actions: {

        async reload ( { commit }, user_id ) {

            return new Promise( (resolve, reject) => {

                ThemeService.find_by_user( user_id ).then( themes => {

                    if ( themes.data && themes.data.length >= 1 ) commit('save', {
                        themes: themes.data
                    })

                    resolve(themes.data)

                }).catch( e => reject(e) )

            })

        },

        async find_by_id_and_reload ( { commit }, theme_id ) {

            return new Promise( (resolve, reject) => {

                ThemeService.find_by_id( theme_id ).then( theme => {
                    if ( theme ) commit('find_by_id_and_save', theme.data)

                    resolve(theme.data || null)

                }).catch( e => reject(e) )
            })
        },

        async add ( { commit }, data ) {

            return new Promise( (resolve, reject) => {
                if ( data ) {

                    ThemeService.add( data ).then( results => {

                        if ( results ) commit('add_and_save', {
                            theme: results.data
                        })

                        resolve(results)

                    }).catch( e => reject(e) )

                } else reject()
                
            })
        },

        async find_by_id_and_update ( { commit }, data ) {

            return new Promise ( (resolve, reject) => {

                if ( data.theme_id && data.data ) ThemeService.find_by_id_and_update( data.theme_id, data.data ).then( results => {
                    
                    if ( results ) commit('find_by_id_and_save', results.data)
                    resolve(results)
                    
                }).catch( e => reject(e) )
            })
        },

        async find_by_id_and_delete ( { commit }, theme_id ) {

            return new Promise ( (resolve, reject) => {

                if ( theme_id ) {

                    ThemeService.find_by_id_and_delete( theme_id ).then( results => {

                        commit('remove_by_id_and_save', {
                            theme_id: theme_id
                        })
                        resolve(results)

                    }).catch( e => reject(e) )
                }
            })
            
        },
             
    }
}