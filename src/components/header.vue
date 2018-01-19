<template>
	<header>
		<nav>
			<div class="logo">
				<router-link to="/">
					<img src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg">
				</router-link>
			</div>

			<ul class="tab">
				<li v-for="tab of tabs" :key="tab">
					<router-link :to="{path: '/', query: {tab: tab}}">{{ tabTranslate(tab) }}</router-link>
				</li>
				<li v-if="!userInfo.loginname">
					<a href="javascript:;" @click="goEnter">登录</a>
				</li>
				<li class="login" v-if="userInfo.loginname">
					<router-link :to="{name: 'userRoute', params: {loginname: userInfo.loginname}}">
						<img :src="userInfo.avatar_url">
					</router-link>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script>
	import tabTranslate from 'js/tabTranslate.js'
	import { mapState } from 'vuex'

	export default {
		data() {
			return {
				tabs: ['good' ,'ask', 'share', 'job', 'dev']
			}
		},
		methods: {
			tabTranslate,
			goEnter() {
				this.$router.push({
					name: 'loginRoute',
					query: {
						redirect: encodeURIComponent(this.$route.path)
					}
				})
			}
		},
		computed: {
			...mapState({
				userInfo: 'userInfo'
			})
		}
	}
</script>

<style lang="scss" scoped>
	header {
		height: 50px;
		background: #444;
		display: flex;
		justify-content: center;
	}

	nav {
		width: 750px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		font-size: 16px;
	}

	.logo {
		width: 120px;
	}
	
	.tab {
		display: flex;
		align-items: center;
		li {
			line-height: 20px;
			a {
				display: block;
				text-shadow: none;
				color: #ccc;
				padding: 10px 15px;
				text-decoration: none;
				transition: all .15s;
				font-size: 14px;
				font-weight: 600;
				&:hover {
					color: #fff;
				}
			}
		}
	}

	.login {
		img {
			width: 30px;
			height: 30px;
			border-radius: 50%;
			vertical-align: middle;
		}
	}
</style>