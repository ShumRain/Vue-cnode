// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store/index'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

const userSessionStorage = window.sessionStorage.userInfo
// 登录后用刷新
if (userSessionStorage) {
	store.dispatch('setUserInfo', JSON.parse(userSessionStorage))
}

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
