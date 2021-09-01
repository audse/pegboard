
import CardService from './../../server/services/card.service'

import { sort_by_order_and_updated  } from './../utils/sort.utils'

export default {

    namespaced: true,

    state: {
        cards: {}
    },

    getters: {
        
        find_by_id: state => (card_id, board_id) => {
            return state.cards[board_id] ? state.cards[board_id].find( card => card._id === card_id ) : null
        },

        find_by_board: state => (board_id) => {
            return state.cards[board_id]
        },

        find_by_list: state => (board_id, list_id) => {
            return state.cards[board_id] ? state.cards[board_id].filter( card => card.list_id === list_id ) : null
        },

        find_by_list_and_sort: state => (board_id, list_id) => {
            const card_list = state.cards[board_id] ? state.cards[board_id].filter( card => card.list_id === list_id ) : null
            if ( card_list ) return sort_by_order_and_updated(card_list)
        }

    },

    mutations: {

        find_by_board_and_save ( state, data ) {
            if ( data.board_id && data.cards ) {

                let new_data = {}
                new_data[data.board_id] = data.cards

                state.cards = Object.assign( {}, state.cards, new_data )
            }
        },

        find_by_list_and_save ( state, data ) {
            if ( data.board_id && data.list_id && data.cards ) {

                // Create a new array that contains only the cards that are not part of the not-yet-updated list.
                // Then, concat the just-reloaded list to it.
                let new_list =  state.cards[data.board_id] ? state.cards[data.board_id].filter( card => card.list_id !== data.list_id ) : []
                state.cards[data.board_id] = [].concat(new_list, data.cards)

            }
        },

        find_by_id_and_save ( state, data ) {
            if ( data.board_id && data.card ) {

                let index =  state.cards[data.board_id].findIndex( card => card._id === data.card._id )
                state.cards[data.board_id].splice(index, 1, data.card)

            }
        },

        add_and_save ( state, data ) {
            
            if ( data.board_id) {

                if ( state.cards[data.board_id] ) state.cards[data.board_id].push(data)

            }
        },

        remove_by_id_and_save ( state, data ) {
            if ( data._id ) {

                let index =  state.cards[data.board_id].findIndex( card => card._id === data._id )
                state.cards[data.board_id].splice(index, 1)

            }
        },

        find_by_list_and_update_order ( state, data ) {
            if ( data.board_id && data.list_id && data.cards ) {
                let new_list = state.cards[data.board_id] ? state.cards[data.board_id].filter( card => card.list_id !== data.list_id ) : []
                state.cards[data.board_id] = sort_by_order_and_updated([].concat(new_list, data.cards))
            }
        }
    },

    actions: {

        async find_by_board_and_reload ( { commit }, data ) {

            return new Promise( (resolve, reject) => {

                if ( data.board_id && data.user_id ) CardService.find_by_board( data.board_id, data.user_id ).then( results => {
                    if (results) commit('find_by_board_and_save', {
                        board_id: data.board_id,
                        cards: results.data
                    })

                    resolve(results.data)

                }).catch( e => reject(e) )

            }).catch( e => console.log(e) )
        },

        async find_by_list_and_reload ( { commit }, data ) {

            return new Promise( (resolve, reject) => {

                if ( data.board_id && data.list_id && data.user_id ) CardService.find_by_list( data.board_id, data.list_id, data.user_id ).then( results => {
                    if (results && results.data) {
                        commit('find_by_list_and_save', {
                            board_id: data.board_id,
                            list_id: data.list_id,
                            cards: results.data
                        })

                        resolve(results.data)
                    } else resolve(results)

                }).catch( e => reject(e) )

            }).catch( e => console.log(e) )
        },

        async add ( { commit }, data ) {

            return new Promise( (resolve, reject) => {

                if ( data ) CardService.add( data ).then( results => {

                    commit('add_and_save', results.data)

                    resolve(results.data)

                }).catch( e => console.log(e) )

                else reject()

            }).catch( e => console.log(e) )
        },

        async find_by_id_and_update ( { commit }, data ) {
            return new Promise( (resolve, reject) => {

                if ( data && data.card_id ) {

                    CardService.find_by_id_and_update( data.card_id, data.data ).then( results => {
                        if ( results ) commit('find_by_id_and_save', {
                            board_id: results.data.board_id,
                            card: results.data
                        })
                        resolve(results)

                    }).catch( e => console.log(e) )

                } else reject()

            }).catch( e => console.log(e) )
        },

        async find_by_id_and_update_without_saving ( { commit }, data ) {
            return new Promise( (resolve, reject) => {

                if ( data && data.card_id ) {

                    CardService.find_by_id_and_update( data.card_id, data.data ).then( results => {
                        
                        resolve(results)

                    }).catch( e => console.log(e) )

                } else reject()

            }).catch( e => console.log(e) )
        },

        async find_by_id_and_delete ( { commit }, data ) {
            return new Promise( (resolve, reject) => {

                if ( data._id ) CardService.find_by_id_and_delete( data._id ).then( result => {

                    commit('remove_by_id_and_save', data)
                    resolve(result)
                })

                else reject()
            }).catch( e => console.log(e) )
        },
    }

}
