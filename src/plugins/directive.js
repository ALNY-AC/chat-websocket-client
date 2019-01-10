// @ts-nocheck
import Vue from 'vue'

//自定义指令

function focus(el, binding) {
    if (binding.value) {
        $(el).focus();
    } else {
        $(el).blur();
    }
}

function img(el, binding) {
    if (binding.value) {
        var img = Vue.prototype.$getUrl(binding.value);
        $(el).attr('src', img);
    }
}

Vue.directive('focus', {
    inserted: focus,
    update: focus,
    componentUpdated: focus,
})
Vue.directive('img', {
    inserted: img,
    update: img,
    componentUpdated: img,
})


Vue.filter('isNull', function (value) {

})

