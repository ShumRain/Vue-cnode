<template>
	<section v-if="user">
		<div class="user-info">
			<div>
				<img :src="user.avatar_url">
			</div>
			<div>
				<h2>{{ user.loginname }}</h2>
				<p>注册时间 {{ getTime(user.create_at) }} </p>
				<p>积分：{{ user.score }}</p>
			</div>
		</div>

		<div>
			<h2>最近回复</h2>
			<div v-for="item in user.recent_replies" class="list-item" :key="item.id">
				<div class="list-item-header">
					<h2 class="list-item-title">
						<router-link :to="{name: 'articleRoute', params: {id: item.id}}">{{ item.title }}</router-link>
					</h2>
				</div>
				<div class="list-item-footer">
					<router-link :to="{name: 'userRoute', params: {loginname: item.author.loginname}}"><img :src="item.author.avatar_url"></router-link>
					<div class="point"></div>
					<span>{{ getTime(item.last_reply_at) }}</span>		
				</div>
			</div>
		</div>

		<div>
			<h2>最近创建</h2>
			<div v-for="item of user.recent_topics" class="list-item" :key="item.id">
				<div class="list-item-header">
					<h2 class="list-item-title">
						<router-link :to="{name: 'articleRoute', params: {id: item.id}}">{{ item.title }}</router-link>
					</h2>
				</div>
				<div class="list-item-footer">
					<router-link :to="{name: 'userRoute', params: {loginname: item.author.loginname}}"><img :src="item.author.avatar_url"></router-link>
					<div class="point"></div>
					<span>{{ getTime(item.last_reply_at) }}</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import getTime from 'js/getTime.js'

	export default {
		data() {
			return {
				user: null
			}
		},
		beforeCreate() {
			this.$store.commit('load')
		},
		created() {
			let path = this.$route.path
			this.axios.get(`https://cnodejs.org/api/v1${path}`)
			.then((res) => {
				this.user = res.data.data
			})
			.catch((err) => {
				console.log('user: ', err)
			})
		},
		updated() {
			this.$store.commit('notLoad')
		},
		beforeRouteUpdate(to, from, next) {
			this.axios.get(`https://cnodejs.org/api/v1${to.path}`)
			.then((res) => {
				this.user = res.data.data
			})
			.catch((err) => {
				console.log('user: ', err)
			})
			next()
		},
		methods: {
			getTime,
		},
	}
</script>

<style lang="scss" scoped>
	section {
		width: 680px;
		margin: 0 auto;
		padding-top: 20px;
	}

	.user-info {
		display: flex;
		margin-bottom: 10px;
		img {
			width: 120px;
			height: 120px;
			border-radius: 3px;
			box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
			margin-right: 10px;
		}	
	}
	.list-list {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.list-item {
		padding: 15px 10px;
		border-radius: 3px;
		&:hover {
			background: #f6f7f7;
		}
		a:hover {
			text-decoration: underline;
		}
	}

	.list-item-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 8px;
	}

	.list-item-title {
		width: 80%;
		font-size: 16px;
		line-height: 1.4;
		font-weight: 500;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		a { 
			color: #485763;
		}
	}

	.list-item-tag {
		margin: 0 3px;
		font-size: 13px;
		color: #565b65;
		border: 1px solid #e1e1e1;
		background: #e8e8e8;
		border-radius: 3px;
		padding: 1px 3px 2px;
		line-height: 1.4;
	}

	.list-item-footer {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		img  {
			width: 25px;
			height: 25px;
			border-radius: 50%;
			vertical-align: middle;
			box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
		}
	}

	.reply-count {
		font-size: 15px;
		color: #9e78c0;
	}

	.visit-count {
		color: #717b86;
	}
</style>
