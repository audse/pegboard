
import http from './http'

class ListService {

    add ( data ) {
        return http.post('/list', data)
    }

    find_by_board ( board_id ) {
        return http.get(`/list/user/${board_id}`)
    }

    find_by_id ( id ) {
        return http.get(`/list/${id}`)
    }

    find_by_id_and_update ( id, data ) {
        return http.put(`/list/${id}`, data)
    }

    find_by_id_and_delete ( id ) {
        return http.delete(`/list/${id}`)
    }

}

export default new ListService()