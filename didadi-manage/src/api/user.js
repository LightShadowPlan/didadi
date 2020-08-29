
import request from '../request.js'
import domain from '../../public/domain.js'

const user = {
    loginByToken() {
        return request.post(domain.url + '/api/v1/didadi/loginByToken');
    },
    loginByInfo(data) {
        return request.post(domain.url + '/api/v1/didadi/loginByInfo', data);
    }
}

export default user