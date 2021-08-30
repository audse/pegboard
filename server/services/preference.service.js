
import http from './http'

class PreferenceService {

    add ( data ) {
        return http.post('/preference', data).catch( e => {
            if(e.response) return e.response
        })
    }

    find_by_user_id ( user_id ) {
        return http.get(`/preference/${user_id}`).catch( e => {
            if(e.response) return e.response
        })
    }

    find_by_user_id_and_update ( user_id, data ) {
        return http.put(`/preference/${user_id}`, data).catch( e => {
            if(e.response) return e.response
        })
    }

}

export default new PreferenceService()