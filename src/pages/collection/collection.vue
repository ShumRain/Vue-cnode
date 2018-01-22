<template>
	<section v-if="collections">
		<div class="topic-list">
			<div v-for="item of collections" class="topic-item" :key="item.id">
				<div class="topic-item-header">
					<h2 class="topic-item-title">
						<router-link :to="{name: 'articleRoute', params: {id: item.id}}">{{ item.title }}</router-link>
					</h2>
					<div class="topic-tag">
						<div class="topic-item-tag topic-top" v-if="item.top">{{ tabTranslate('top') }}</div>
						<div class="topic-item-tag topic-top" v-if="item.good">{{ tabTranslate('good') }}</div>
						<div class="topic-item-tag" v-if="!item.good">{{ tabTranslate(item.tab) }}</div>
					</div>
				</div>
				<div class="topic-item-footer">
					<router-link :to="{name: 'userRoute', params: {loginname: item.author.loginname}}"><img :src="item.author.avatar_url"></router-link>
					<div class="point"></div>
					<span>{{ getTime(item.last_reply_at) }}</span>
					<div class="point"></div>
					<div>
						<span class="reply-count">{{ item.reply_count }}</span>
						/
						<span class="visit-count">{{ item.visit_count }}</span>
					</div>			
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import getTime from 'js/getTime.js'
	import tabTranslate from 'js/tabTranslate.js'
	import { mapState } from 'vuex'

	export default {
		data() {
			return {
				collections: ''
			}
		},
		mounted() {
			this.axios.get(`https://cnodejs.org/api/v1/topic_collect/${this.userInfo.loginname}`)
			.then((res) => {
				console.log(res.data)
				this.collections = res.data.data
			})
			.catch((err) => {
				console.log('collection: ', err)
			})
		},
		updated() {
			this.$store.commit('notLoad')
		},
		computed: {
			...mapState({
				userInfo: 'userInfo'
			})
		},
		methods: {
			getTime,
			tabTranslate,
		}
	}
</script>

<style lang="scss" scoped>
	section {
		width: 680px;
		margin: 0 auto;
		padding-top: 20px;
	}

	.topic-list {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.topic-item {
		padding: 15px 10px;
		border-radius: 3px;
		&:hover {
			background: #f6f7f7;
		}
		a:hover {
			text-decoration: underline;
		}
	}

	.topic-item-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 8px;
	}

	.topic-item-title {
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

	.topic-tag {
		display: flex;
	}

	.topic-item-tag {
		margin: 0 3px;
		font-size: 13px;
		color: #565b65;
		border: 1px solid #e1e1e1;
		background: #e8e8e8;
		border-radius: 3px;
		padding: 1px 3px 2px;
		line-height: 1.4;
	}

	.topic-item-tag.topic-top {
		background: #1a65d7;
		color: #fff;
	}

	.topic-item-footer {
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


