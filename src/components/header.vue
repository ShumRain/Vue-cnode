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
				<li class="user" v-if="userInfo.loginname" @mouseenter="isDrop = true" @mouseleave="isDrop = false">
					<a href="javascript:;">
						<img :src="userInfo.avatar_url">
						<span class="dropdown-icon"></span>
					</a>
					<transition name="dropdown">
						<div class="drop-box" v-if="isDrop">
							<ul @click="closeDrop">
								<li>
									<router-link :to="{name: 'userRoute', params: {loginname: userInfo.loginname}}">
										个人中心
									</router-link>
								</li>
								<li><router-link :to="{name: 'createTopicRoute'}">发布话题</router-link></li>
								<li>
									<router-link :to="{name: 'userMessageRoute'}">
										我的消息
										<span v-if="messageCount > 0" class="message-count">{{ messageCount }}</span>
									</router-link>
								</li>
								<li><router-link :to="{name: 'collectionRoute', params: {loginname: userInfo.loginname}}">我的收藏</router-link></li>
								<li><a href="javascript:;" @click="signOut">退出</a></li>
							</ul>
						</div>
					</transition>
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
				tabs: ['good' ,'ask', 'share', 'job', 'dev'],
				isDrop: false,
				messageCount: ''
			}
		},
		updated() {
			if (!this.userInfo || this.messageCount) return
			this.axios.get('https://cnodejs.org/api/v1/message/count', {
				params: {
					accesstoken: this.userInfo.accessToken
				}
			})
			.then((res) => {
				this.messageCount = res.data.data
			})
			.catch((err) => {
				console.log('messageCount: ', err)
			})
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
			},
			signOut() {
				window.sessionStorage.removeItem('userInfo')
				window.location.reload()
			},
			closeDrop() {
				this.isDrop = false
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

	.user {
		display: flex;
		align-items: center;
		position: relative;

		img {
			width: 30px;
			height: 30px;
			border-radius: 50%;
			vertical-align: middle;
		}
		.dropdown-icon {
			display: inline-block;
			width: 0;
			height: 0;
			vertical-align: middle;
			content: "";
			border: 4px solid;
			border-right-color: transparent;
			border-bottom-color: transparent;
			border-left-color: transparent;
		}
		.drop-box {
			width: 120px;
			position: absolute;
			top: calc(100% - 2px);
			left: -50%;
			z-index: 100;
			padding-top: 5px;
			padding-bottom: 5px;
			margin-top: 2px;
			list-style: none;
			background-color: #fff;
			background-clip: padding-box;
			border: 1px solid rgba(27,31,35,0.15);
			border-radius: 4px;
			box-shadow: 0 3px 12px rgba(27,31,35,0.15);
			li {
				&:hover {
					background: #1a65d7;
				}	
			}
			a {
				display: block;
				padding: 4px 10px 4px 15px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: #586069;
			}
			&::before {
				top: -16px;
				right: calc(50% - 15px);
				border: 8px solid transparent;
				border-bottom-color: #fff;
				position: absolute;
				display: inline-block;
				content: "";
			}
		}
	}

	.dropdown-enter-active, .dropdown-leave-active {
		transition: all .3s ease-out;
	}

	.dropdown-enter, .dropdown-leave-to {
		opacity: 0;
		transform: translateY(-10px);
	}

	.message-count {
		color: rgb(189, 29, 112);
	}

</style>