import Vue from 'vue'

let userInfo = {
    info: {

    },
    token: '',
    unionid: '',
    init() {
        if (typeof localStorage['UserInfo'] != 'undefined') {
            this.setInfo(JSON.parse(localStorage.getItem('UserInfo')))
        }
        if (typeof localStorage['token'] != 'undefined') {
            this.setToken(localStorage['token']);
        }
    },
    setUnionid(unionid) {
        this.unionid = unionid;
    },
    setInfo(info) {
        info.U_OperatorId = 3;
        this.info = info;
        localStorage.setItem('UserInfo', JSON.stringify(info));
    },
    getInfo() {
        return this.info;
    },
    setItem(k, v) {
        this.info[k] = v;
    },
    getItem(key) {
        if (typeof this.info == 'object') {
            if (typeof this.info[key] == 'undefined') {
                return false;
            } else {
                return this.info[key];
            }
        } else {
            return false;
        }
    },
    setToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    },
    getToken() {
        return this.token;
    }
}
userInfo.init();
Vue.prototype.$userInfo = userInfo.info;

export default userInfo;