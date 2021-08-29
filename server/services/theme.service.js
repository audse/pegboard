
import http from './http'

class ThemeService {

    add ( data ) {
        return http.post('/theme', data).catch( e => {
            if(e.response) console.log(e.response.data)
        })
    }

    find_by_user ( user_id ) {
        return http.get(`/theme/user/${user_id}`).catch( e => {
            if(e.response) console.log(e.response.data)
        })
    }

    find_by_id ( id ) {
        return http.get(`/theme/${id}`).catch( e => {
            if(e.response) console.log(e.response.data)
        })
    }

    find_by_id_and_update ( id, data ) {
        return http.put(`/theme/${id}`, data).catch( e => {
            if(e.response) console.log(e.response.data)
        })
    }

    find_by_id_and_delete ( id ) {
        return http.delete(`/theme/${id}`).catch( e => {
            if(e.response) console.log(e.response.data)
        })
    }

}

export default new ThemeService()