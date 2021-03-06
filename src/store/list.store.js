
import ListService from './../../server/services/list.service'

export default {

    namespaced: true,

    state: {
        lists: {}
    },

    getters: {
        
        find_by_id: state => (list_id, board_id) => {
            return state.lists[board_id] ? state.lists[board_id].find( list => list._id === list_id ) : null
        },

        find_by_board: state => (board_id) => {
            return state.lists[board_id]
        }

    },

    mutations: {

        find_by_board_and_save ( state, data ) {
            if ( data.board_id && data.lists ) {

                let new_data = {}
                new_data[data.board_id] = data.lists

                state.lists = Object.assign( {}, state.lists, new_data )
            }
        },

        find_by_id_and_save ( state, data ) {
            if ( data.board_id && data.list ) {

                let index =  state.lists[data.board_id].findIndex( list => list._id === data.list._id )
                state.lists[data.board_id].splice(index, 1, data.list)

            }
        },

        add_and_save ( state, data ) {
            if ( data.board_id) {

                if ( state.lists[data.board_id] ) state.lists[data.board_id].push(data)

            }
        },

        remove_by_id_and_save ( state, data ) {
            if ( data.list_id ) {

                let index =  state.lists[data.board_id].findIndex( list => list._id === data.list_id )
                state.lists[data.board_id].splice(index, 1)

            }
        },
    },

    actions: {

        async find_by_board_and_reload ( { commit }, data ) {

            return new Promise( (resolve, reject) => {

                if ( data.board_id && data.user_id ) ListService.find_by_board( data.board_id, data.user_id ).then( results => {
                    if (results) commit('find_by_board_and_save', {
                        board_id: data.board_id,
                        lists: results.data
                    })

                    resolve(results.data)

                }).catch( e => reject(e) )

            }).catch( e => console.log(e) )
        },

        async add ( { commit }, data ) {

            return new Promise( (resolve, reject) => {

                if ( data ) ListService.add( data ).then( results => {
                    
                    commit('add_and_save',results.data)

                    resolve(results.data)

                }).catch( e => console.log(e) )

                else reject()

            }).catch( e => console.log(e) )
        },

        async find_by_id_and_update ( { commit }, data ) {
            return new Promise( (resolve, reject) => {

                if ( data && data.list_id ) {

                    ListService.find_by_id_and_update( data.list_id, data.data ).then( results => {
                        if ( results ) commit('find_by_id_and_save', {
                            board_id: results.data.board_id,
                            list: results.data
                        })
                        resolve(results)

                    }).catch( e => console.log(e) )

                } else reject()

            }).catch( e => console.log(e) )
        },

        async find_by_id_and_delete ( { commit }, data ) {
            return new Promise( (resolve, reject) => {

                if ( data.list_id ) ListService.find_by_id_and_delete( data.list_id ).then( result => {

                    commit('remove_by_id_and_save', data)
                    resolve(result)
                })

                else reject()
            }).catch( e => console.log(e) )
        },
    }

}
