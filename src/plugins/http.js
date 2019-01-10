import axios from 'axios';
import url from './url.js';
import userInfo from '../modus/UserInfo/UserInfo.js';


let _axios = axios.create({
    baseURL: url.serverUrl,
    transformRequest: [function (data) {
        if (data) {
            data = JSON.parse(JSON.stringify(data));
            let ret = [];
            Object.keys(data).forEach(k => {
                if (typeof data[k] == "object") {
                    data[k] = JSON.stringify(data[k]);
                }
                ret.push(encodeURIComponent(k) + '=' + encodeURIComponent(data[k]));
            });;
            return ret.join("&")
        }
    }],
});

// 添加一个请求拦截器
_axios.interceptors.request.use(function (conf) {

    console.warn(conf);

    conf.headers.Authorization = "token " + userInfo.getToken();
    if (conf.method == 'get') {
        if (!conf.params) conf.params = {};
    }
    return conf;
}, function (error) {
    return Promise.reject(error);
});

// 添加一个响应拦截器
_axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    console.warn(error);
    if (error.response.status == 401) {
        // 未登录
    }
    return Promise.reject(error);
});


export default _axios;