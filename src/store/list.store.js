
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
            //
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

                let new_data = [...state.lists[board_id]]
                new_data.push(data)

                state.lists = Object.assign( {}, state.lists, new_data )

            }
        },

        remove_by_id_and_save ( state, data ) {
            //
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
                    if ( results ) commit('add_and_save', {
                        list: results.data
                    })

                    resolve(results.data)

                }).catch( e => console.log(e) )

                reject()

            }).catch( e => console.log(e) )
        },

        async find_by_id_and_update ( { commit }, data ) {
            return new Promise( (resolve, reject) => {

                if ( data && data.list_id ) {

                    ListService.find_by_id_and_update( data.list_id, data.data.value ).then( results => {
                        if ( results ) commit('find_by_id_and_save', {
                            board_id: results.data.board_id,
                            list: results.data
                        })
                        resolve(results)

                    }).catch( e => console.log(e) )

                } else reject()

            }).catch( e => console.log(e) )
        },

        async find_by_id_and_delete () {
            return new Promise( (resolve, reject) => {

            }).catch( e => console.log(e) )
        },
    }

}
