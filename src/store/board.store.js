
import BoardService from './../../server/services/board.service'

export default {

    namespaced: true,

    state: {
        boards: []
    },

    getters: {

        find_by_id: state => (board_id) => {
            return state.boards.find( board => board._id === board_id )
        }

    },

    mutations: {

        save ( state, data ) {
            if ( data && data.boards ) state.boards = data.boards 
        },

        find_by_id_and_save ( state, data ) {

            const state_index = state.boards.findIndex( board => board._id === data.board_id )
            if ( state_index !== null && state_index !== undefined ) state.boards.splice(state_index, 1, data.board)
            
        },

        add_and_save ( state, data ) {
            if ( data.board ) state.boards.push( data.board )
        },

        remove_by_id_and_save ( state, data ) {
            if ( data.board_id ) {
                const state_index = state.boards.findIndex( board => board._id === data.board_id )
                if ( state_index !== null && state_index !== undefined ) state.boards.splice(state_index, 1)
            }
        }

    },

    actions: {

        async reload ( { commit }, user_id ) {

            return new Promise( (resolve, reject) => {

                BoardService.find_by_user( user_id ).then( boards => {

                    if ( boards.data && boards.data.length >= 1 ) commit('save', {
                        boards: boards.data
                    })

                    resolve(boards.data)

                }).catch( e => reject(e) )

            })

        },

        async find_by_id_and_reload ( { commit }, board_id ) {

            return new Promise( (resolve, reject) => {

                BoardService.find_by_id( board_id ).then( board => {
                    if ( board ) commit('find_by_id_and_save', {
                        board_id: board_id,
                        board: board.data
                    })

                    resolve(board)

                }).catch( e => reject(e) )
            })
        },

        async add ( { commit }, data ) {

            return new Promise( (resolve, reject) => {
                if ( data ) {

                    BoardService.add( data ).then( results => {

                        if ( results ) commit('add_and_save', {
                            board: results.data
                        })

                        resolve(results)

                    }).catch( e => reject(e) )

                } else reject()
                
            })
        },

        async find_by_id_and_update ( { commit }, data ) {

            return new Promise ( (resolve, reject) => {

                if ( data.board_id && data.data ) BoardService.find_by_id_and_update( data.board_id, data.data.value ).then( results => {
                    
                    if ( results ) commit('find_by_id_and_save', {
                        board_id: data.board_id,
                        board: results.data
                    })
                    resolve(results)
                    
                }).catch( e => reject(e) )
            })
        },

        async find_by_id_and_delete ( { commit }, board_id ) {

            return new Promise ( (resolve, reject) => {

                if ( board_id ) {

                    BoardService.find_by_id_and_delete( board_id ).then( results => {

                        commit('remove_by_id_and_save', {
                            board_id: board_id
                        })
                        resolve(results)

                    }).catch( e => reject(e) )
                }
            })
            
        },
             
    }
}