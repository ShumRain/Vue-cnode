import Vue from 'vue'
import Router from 'vue-router'
import index from 'pages/index/index'
import article from 'pages/article/article'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'indexRoute',
			component: index
		}, {
			path: '/topic/:id',
			name: 'articleRoute',
			component: article
		}
	]
})
