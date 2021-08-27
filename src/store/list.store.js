
import ListService from './../../server/services/list.service'

export default {

    namespaced: true,

    state: {
        lists: {}
    },

    getters: {
        
        find_by_id: state => (list_id) => {
            //
        },

        find_by_board: state => (board_id) => {
            //
        }

    },

    mutations: {

        // save ( state, data ) {
        //     //
        // },

        find_by_board_and_save ( state, data ) {
            if ( data.board_id && data.lists ) {

                let new_data = {}
                new_data[data.board_id] = data.lists

                state.lists = Object.assign( {}, state.lists, new_data )
            }
        },

        find_by_id_and_save ( state, data ) {
            //
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

                    if (lists) commit('find_by_board_and_save', {
                        board_id: data.board_id,
                        lists: results.data
                    })

                    resolve(results.data)

                }).catch( e => reject(e) )

            }).catch( e => console.log(e) )
        },

        async add () {

            return new Promise( (resolve, reject) => {

                if ( data ) ListService.add( data ).then( results => {
                    if ( results ) commit('add_and_save', {
                        list: results.data
                    })
                })

                resolve(results.data)

            }).catch( e => console.log(e) )
        },

        async find_by_id_and_update () {

            return new Promise( (resolve, reject) => {

            }).catch( e => console.log(e) )
        },

        async find_by_id_and_delete () {
            return new Promise( (resolve, reject) => {

            }).catch( e => console.log(e) )
        },
    }

}
