import axios from 'axios'
import router from '@/router';
import {
    Message,
    Loading
} from 'element-ui'

// 初始化设置语言
let lang = sessionStorage.lang || 'zh-CN';
sessionStorage.lang = lang;

let loadingInstance = null //这里是loading
//使用create方法创建axios实例
export const Service = axios.create({
    withCredentials: true,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept-language': `${lang}`,
        "Authorization": sessionStorage.userToken || "null"
    }
})

const response_200 = (data) => {
    Message.success({
        title: 'Success',
        message: data.message
    });
}
const response_300 = () => {
    router.push({ name: "login", query: {req: router.name } })
}
const response_400 = (data) => {
    Message.error({
        title: 'Error',
        message: data.message
    });
}
const response_default = (data) => {
    Message.error({
        title: 'Error',
        message: data.message
    });
}

// 添加请求拦截器
Service.interceptors.request.use(config => {
    loadingInstance = Loading.service({
        lock: true,
        text: 'loading...'
    })
    return config
})
// 添加响应拦截器
Service.interceptors.response.use(response => {
    switch (response.data.code) {
        case 200 : response_200(response.data); break;
        case 300 : response_300(response.data); break;
        case 400 : response_400(response.data); break;
        default : response_default(response.data); break;
    }
    loadingInstance.close()
    return response.data
}, error => {
    const msg = error.message !== undefined ? error.message : 'Error!'
    Notification.error({
        title: 'Error',
        message: msg
    });
    loadingInstance.close()
    return Promise.reject(error)
})

const request = {
    get: (url, params = {}) => {
        return Service({
            method: 'get',
            url: url,
            params: params
        })
    },
    post: (url, data = null, params = {}) => {
        return Service({
            method: 'post',
            url: url,
            data: data,
            params: params
        })
    }
}

export default request