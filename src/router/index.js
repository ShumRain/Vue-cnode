import Vue from 'vue'
import Router from 'vue-router'
import Index from 'pages/index/index'
import Article from 'pages/article/article'
import User from 'pages/user/user'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'indexRoute',
			component: Index
		}, {
			path: '/topic/:id',
			name: 'articleRoute',
			component: Article
		}, {
			path: '/user/:loginname',
			name: 'userRoute',
			component: User
		}
	]
})
