<template>
	<section>
		<form>
			<input type="text" placeholder="输入Access Token" v-model="accessToken">
			<button @click.prevent="clickLogin">登录</button>
		</form>
	</section>
</template>

<script>
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
			this.axios.post(`https://cnodejs.org/api/v1/accessToken`, {
				accesstoken: this.accessToken
			})
			.then((res) => {
				this.$store.dispatch('setUserInfo', res.data)
				window.sessionStorage.userInfo = JSON.stringify(res.data)
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


