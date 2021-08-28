
import http from './http'

class CardService {

    add ( data ) {
        return http.post('/card', data).catch( e => {
            if(e.response) console.log(e.response)
        })
    }

    find_by_board ( board_id, user_id ) {
        return http.get(`/card/user/${user_id}/board/${board_id}`).catch( e => {
            if(e.response) console.log(e.response)
        })
    }

    find_by_list ( board_id, list_id, user_id ) {
        return http.get(`/card/user/${user_id}/board/${board_id}/list/${list_id}`).catch( e => {
            if(e.response) console.log(e.response)
        })
    }

    find_by_user ( user_id ) {
        return http.get(`/card/user/${user_id}`).catch( e => {
            if(e.response) console.log(e.response)
        })
    }

    find_by_id ( id ) {
        return http.get(`/card/${id}`).catch( e => {
            if(e.response) console.log(e.response)
        })
    }

    find_by_id_and_update ( id, data ) {
        return http.put(`/card/${id}`, data).catch( e => {
            if(e.response) console.log(e.response)
        })
    }

    find_by_id_and_delete ( id ) {
        return http.delete(`/card/${id}`).catch( e => {
            if(e.response) console.log(e.response)
        })
    }

}

export default new CardService()