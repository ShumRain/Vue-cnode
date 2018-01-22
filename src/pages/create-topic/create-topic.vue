<template>
	<section>
		<form>
			<div>
				<h2>发布话题</h2>
			</div>
			<div>
				<label>选择板块：</label>
				<select name="tab" id="tab-value" v-model="tabValue">
					<option v-for="tab of tabs" :value="tab" :key="tab">{{ tabTranslate(tab) }}</option>
				</select>
			</div>
			<div>
				<input type="text" placeholder="标题字数十字以上" v-model="topicTitle">
			</div>
			<div>
				<textarea v-model="topicContent"></textarea>
			</div>
			<div>
				<button @click.prevent="createTopic" :class="{submiting: isSubmit}" :disabled="isSubmit">{{ isSubmit ? '提交中...' : '提交' }}</button>
			</div>
		</form>
	</section>
</template>

<script>
	import tabTranslate from 'js/tabTranslate.js'
	import { mapState } from 'vuex'

	export default {
		data() {
			return {
				topicTitle: '',
				topicContent: '',
				tabValue: 'dev',
				tabs: ['share', 'ask', 'job', 'dev'],
				isSubmit: false
			}
		},
		mounted() {
			this.$store.commit('notLoad')
		},
		methods: {
			tabTranslate,
			createTopic() {
				if (this.topicTitle.length < 10 || this.topicTitle.length > 30) {
					alert('标题字数太少或太多')
					return
				}

				if (/^[ ]+$/.test(this.topicContent) || this.topicContent == '' ) {
					alert('内容不能为空')
					return
				}

				this.isSubmit = true 

				this.axios.post('https://cnodejs.org/api/v1/topics', {
					accesstoken: this.userInfo.accessToken,
					title: this.topicTitle,
					tab: this.tabValue,
					content: this.topicContent
				})
				.then((res) => {
					this.$router.push({
						name: 'articleRoute',
						params: {
							id: res.data.topic_id
						}
					})
				})
				.catch((err) => {
					this.isSubmit = false
					alert(err.response.data.error_msg)
					console.log('create: ', err)
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
	section {
		width: 680px;
		margin: 20px auto;
	}
	input, textarea {
		width: 100%;
		border-radius: 4px;
		outline: none;
		border: none;
		border: 2px solid #dbdfe4;
		font-size: 15px;
		&::-webkit-input-placeholder {
			color: #687a86;
			font-size: 15px;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		div + div {
			margin-top: 10px;
		}
	}

	input {
		height: 30px;
		padding-left: 10px;
	}

	textarea {
		height: 500px;
		position: relative;
		padding: 10px;
		resize: none;
	}

	button {
		border-radius: 3px;
		background-color: #08c;
		border: none;
		display: inline-block;
		margin: 0;
		padding: 3px 10px;
		font-size: 14px;
		transition: all .2s ease-in-out;
		letter-spacing: 2px;
		box-shadow: none;
		line-height: 2em;
		vertical-align: middle;
		color: #fff;
		&:hover {
			background-color: #05c;
		}
	}

	button.submiting {
		background-color: #05c;
		cursor: not-allowed;
	}
</style>


