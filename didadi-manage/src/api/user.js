
import request from '../request.js'
import domain from '../../public/domain.js'

const user = {
    loginByToken () {
        return request.post(domain.url + '/api/v2/didadi/loginByToken');
    },
    loginByInfo (data) {
        return request.post(domain.url + '/api/v2/didadi/loginByInfo', data);
    }
}

export default user