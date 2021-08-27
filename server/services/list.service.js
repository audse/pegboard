
import http from './http'

class ListService {

    add ( data ) {
        return http.post('/list', data).catch( e => {
            if(e.response) console.log(e.response.data)
        })
    }

    find_by_board ( board_id, user_id ) {
        return http.get(`/list/user/${user_id}/board/${board_id}`).catch( e => {
            if(e.response) console.log(e.response.data)
        })
    }

    find_by_id ( id ) {
        return http.get(`/list/${id}`).catch( e => {
            if(e.response) console.log(e.response.data)
        })
    }

    find_by_id_and_update ( id, data ) {
        return http.put(`/list/${id}`, data).catch( e => {
            if(e.response) console.log(e.response.data)
        })
    }

    find_by_id_and_delete ( id ) {
        return http.delete(`/list/${id}`).catch( e => {
            if(e.response) console.log(e.response.data)
        })
    }

}

export default new ListService()