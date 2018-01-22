<template>
	<section v-if="messages">
		<div><h2>我的消息</h2></div>
		<div>
			<h3>新消息</h3>
			<ul v-if="messages.hasnot_read_messages.length > 0">
				<li v-for="msg of messages.hasnot_read_messages" :key="msg.id">
					<router-link :to="{name: 'userRoute', params: {loginname: msg.author.loginname}}">{{ msg.author.loginname }}</router-link>
					<span>在话题</span>
					<router-link :to="{name: 'articleRoute', params: {id: msg.topic.id}}">{{ msg.topic.title }}</router-link>
					<span>中{{ msg.type }}了你</span>
				</li>
			</ul>
			<p v-else>暂无新消息</p>
		</div>
		<div>
			<h3>历史消息</h3>
			<ul v-if="messages.has_read_messages.length > 0">
				<li v-for="msg of messages.has_read_messages" :key="msg.id">
					<router-link :to="{name: 'userRoute', params: {loginname: msg.author.loginname}}">{{ msg.author.loginname }}</router-link>
					<span>在话题</span>
					<router-link :to="{name: 'articleRoute', params: {id: msg.topic.id}}">{{ msg.topic.title }}</router-link>
					<span>中{{ msg.type }}了你</span>
				</li>
			</ul>
			<p v-else>暂无新消息</p>
		</div>
	</section>
</template>

<script>
	import { mapState } from 'vuex'
// hasnot_read_messages
// has_read_messages
export default {
	data() {
		return {
			messages: ''
		}
	},
	created() {
		this.axios.get('https://cnodejs.org/api/v1/messages', {
			params: {
				accesstoken: this.userInfo.accessToken,
				mdrender: false
			}
		})
		.then((res) => {
			this.messages = res.data.data
			console.log(this.messages)
		})
		.catch((err) => {
			console.log('userMessage: ', err)
		})
	},
	updated() {
		this.$store.commit('notLoad')
	},
	computed: {
		...mapState({
			userInfo: 'userInfo'
		})
	}
}
</script>

<style lang="scss" scoped>
	section {
		width: 680px;
		margin: 20px auto;
		display: flex;
		flex-direction: column;
		div + div {
			margin-top: 10px;
		}
	}
</style>


