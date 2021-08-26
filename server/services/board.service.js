
import http from './http'

class BoardService {

    add ( data ) {
        return http.post('/board', data)
    }

    find_by_user ( user_id ) {
        return http.get(`/board/user/${user_id}`)
    }

    find_by_id ( id ) {
        return http.get(`/board/${id}`)
    }

    find_by_id_and_update ( id, data ) {
        return http.put(`/board/${id}`, data)
    }

    find_by_id_and_delete ( id ) {
        return http.delete(`/board/${id}`)
    }

}

export default new BoardService()