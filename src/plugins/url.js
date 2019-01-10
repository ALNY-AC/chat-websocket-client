
import Vue from 'vue';

let Url = {
    serverUrl: 'http://blog.origin.cn/api/',
    imageUrl: 'https://pic.ruibei365.com/',
    ThisUrl: 'http://h5dev.ruibei365.com/'
}

Vue.prototype.$Url = Url;

export default Url;
