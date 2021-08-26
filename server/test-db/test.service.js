
import http from './http-common'

class TestService {

    create ( data ) {
        return http.post('/', data )
    }

}

export default new TestService()