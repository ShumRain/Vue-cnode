import Vue from 'vue'
import Router from 'vue-router'
import Index from 'pages/index/index'
import Article from 'pages/article/article'
import User from 'pages/user/user'
import Login from 'pages/login/login'
import CreateTopic from 'pages/create-topic/create-topic'

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
		}, {
			path: '/login',
			name: 'loginRoute',
			component: Login
		}, {
			path: '/create',
			name: 'createTopicRoute',
			component: CreateTopic
		}
	],
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
})
