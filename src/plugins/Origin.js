// @ts-nocheck
import Vue from 'vue';
import U from './url.js';
import getSystem from './System.js';
let loading = null;

Vue.prototype.$loading = function (a = false, b = '') {
  let mask, message;
  if (typeof a == "boolean") {
    mask = a;
    message = b;
  } else {
    mask = b;
    message = a;
  }
  loading = this.$toast.loading({
    duration: 0,
    mask: mask,
    message: message
  });
}



Vue.prototype.$getSystem = getSystem


Vue.prototype.$closeLoading = function () {
  loading.clear();
}

Vue.prototype.$setTitle = function (str = '') {
}

Vue.prototype.$isLogin = function (argument) {
  return this.$userInfo.user_id >= 0;
}

Vue.prototype.$getUrl = function (url = '') {
  if (!url) {
    return '';
  }
  if (url.indexOf('./') >= 0) {
    return url;
  }
  var _url;
  if (url.indexOf('http') == -1) {
    _url = U.imageUrl + url;
  } else {
    _url = url;
  }
  return _url;
}


// 页面跳转相关 ======================================================

Vue.prototype.$push = function (url = '') {

  if (this.$getSystem() == 'mini') {
    if (this.isTime) {
      wx.miniProgram.navigateTo({
        url: `/pages/openService/openService?source=2&bagsourceid=1&servicebagid=1`
      })
    } else {
      wx.miniProgram.navigateTo({
        url: `/pages/openService/openService?source=1&bagSourceType=1&bagsourceid=${this.feedback.DoctorUserId}&servicebagid=${this.ServiceBag.Id}`
      })
    }
  }

}