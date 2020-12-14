
import request from '../request.js'
import domain from '../../public/domain.js'

const menu = {
    addMenu (data) {
        return request.post(domain.url + '/api/v2/didadi/addMenu', data);
    },
    selectMenu (params) {
        return request.get(domain.url + '/api/v2/didadi/selectMenu', params);
    },
    updateMenu (data) {
        return request.put(domain.url + '/api/v2/didadi/updateMenu', data);
    },
    removeMenu (data) {
        return request.delete(domain.url + '/api/v2/didadi/removeMenu', data);
    }
}

export default menu