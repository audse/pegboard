
import http from './http'

class BoardService {

    add ( data ) {
        return http.post('/board', data).catch( e => {
            if(e.response) console.log(e.response.data)
        })
    }

    find_by_user ( user_id ) {
        return http.get(`/board/user/${user_id}`).catch( e => {
            if(e.response) console.log(e.response.data)
        })
    }

    find_by_id ( id ) {
        return http.get(`/board/${id}`).catch( e => {
            if(e.response) console.log(e.response.data)
        })
    }

    find_by_id_and_update ( id, data ) {
        return http.put(`/board/${id}`, data).catch( e => {
            if(e.response) console.log(e.response.data)
        })
    }

    find_by_id_and_delete ( id ) {
        return http.delete(`/board/${id}`).catch( e => {
            if(e.response) console.log(e.response.data)
        })
    }

}

export default new BoardService()