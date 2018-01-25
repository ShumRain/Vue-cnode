<template>
	<section>
		<form>
			<input type="text" placeholder="输入Access Token" v-model="accessToken">
			<button @click.prevent="clickLogin">登录</button>
		</form>
	</section>
</template>

<script>
	import apiprefix from 'js/apiPrefix.js'	
	
export default {
	data() {
		return {
			accessToken: ''
		}
	},
	mounted() {
		this.$store.commit('notLoad')
	},
	methods: {
		clickLogin() {
			if (!this.accessToken) {
				alert('不能为空')
				return
			}
			this.axios.post(`${apiprefix}/accessToken`, {
				accesstoken: this.accessToken
			})
			.then((res) => {
				let userInfo = {
					loginname: res.data.loginname,
					avatar_url: res.data.avatar_url,
					uid: res.data.id,
					accessToken: this.accessToken
				}
				this.$store.dispatch('setUserInfo', userInfo)
				window.sessionStorage.userInfo = JSON.stringify(userInfo)
				let redirect = decodeURIComponent(this.$route.query.redirect || '/')
				this.$router.push({
					path: redirect
				})
			})
			.catch((err) => {
				err.response.status === 401 && 
				alert(err.response.data.error_msg)
				console.log('login: ', err)
			})
		}
	},
	// 登录后 不能进入login页面 跳转user/loginname
	beforeRouteEnter(to, from, next) {
		if (window.sessionStorage.userInfo) {
			next(vm => {
				vm.$router.push({
					name: 'userRoute',
					params: {
						loginname: JSON.parse(window.sessionStorage.userInfo).loginname
					}
				})
			})
			return
		}
		next()
	}
}
</script>

<style lang="scss" scoped>
	form {
		width: 300px;
		height: 90px;
		margin: 20px auto;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	input,button {
		height: 30px;
		line-height: 30px;
		outline: none;
	}

	input {
		width: 200px;
		padding-left: 10px;
	}

	button {
		width: 100px;
	}
</style>


