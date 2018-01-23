<template>
	<section v-if="article">
		<div class="article-header">
			<h1>{{ article.title }}</h1>
			<div class="article-info">
				<span>{{ getTime(article.create_at) }}</span>
				<span class="point"></span>
				<span>
					作者
					<router-link :to="{name: 'userRoute', params: {loginname: article.author.loginname}}">{{ article.author.loginname }}</router-link>
				</span>
				<span class="point"></span>
				<span>{{ article.visit_count }}次浏览</span>
				<span class="point"></span>
				<span>来自 {{ tabTranslate(article.tab) }}</span>
				<a 
				href="javascript:;" 
				v-if="userInfo.loginname"
				@click="collectionTopic(isCollect)"
				>
				<span class="point"></span>				
				{{ isCollect ? '取消收藏' : '收藏' }}
				</a>
			</div>
		</div>
		<div class="article-content">
			<div v-html="article.content"></div>
		</div>
		<div class="article-comment">
			<div class="comment-title">
				<h3>评论区<span class="comment-count">{{ article.reply_count }}</span></h3>
			</div>
			<div class="comment-item" v-for="reply of article.replies" :key="reply.id">
				<router-link :to="{name: 'userRoute', params: {loginname: reply.author.loginname}}" class="avatar"><img :src="reply.author.avatar_url"></router-link>
				<div>
					<div class="comment-header">
						<router-link :to="{name: 'userRoute', params: {loginname: reply.author.loginname}}">{{ reply.author.loginname }}</router-link>
						<span class="point"></span>
						<span>{{ getTime(reply.create_at) }}</span>
					</div>
					<div v-html="reply.content" class="comment-body"></div>
					<div class="comment-footer">
						<a href="javascript:;" @click="clickUp(reply.id)">
							点赞
							<span v-show="reply.ups.length > 0">{{ reply.ups.length }}</span>
							</a>
						<div v-if="userInfo.loginname">
							<span class="point"></span>
							<a href="javascript:;" @click="addReply(reply.id, reply.author.loginname)"><span>回复</span></a>
						</div>
					</div>
					<form class="comment-box" v-if="curReplyId === reply.id">
						<h3>发表评论</h3>
						<textarea placeholder="开始讨论…" v-model="replyContent"></textarea>
						<div><button @click.prevent="addComment(replyContent, curReplyId)">发表评论</button></div>
					</form>
				</div>
			</div>
		</div>
		<form class="comment-box">
			<h3>发表评论</h3>
			<textarea placeholder="开始讨论…" v-model="commentContent"></textarea>
			<div><button @click.prevent="addComment(commentContent, null)">发表评论</button></div>
		</form>
	</section>
</template>


<script>
	import getTime from 'js/getTime.js'
	import tabTranslate from 'js/tabTranslate.js'
	import { mapState } from 'vuex'
	import hljs from 'highlight.js'

	export default {
		data() {
			return {
				article: null,
				commentContent: '',
				curReplyId: '',
				replyContent: '',
				collections: '',
				isCollect: ''
			}
		},
		beforeCreate() {
			this.$store.commit('load')
		},
		created() {
			this.getData()
		},
		updated() {
			let blocks = Array.from(this.$el.querySelectorAll('pre'))
			blocks.forEach(i => hljs.highlightBlock(i))
			this.$store.commit('notLoad')
		},
		methods: {
			getTime,
			tabTranslate,
			getData() {
				let path = this.$route.path

				this.axios.get(`https://cnodejs.org/api/v1/${path}`)
				.then((res) => {
					console.log(res.data.data)
					this.article = res.data.data
				})
				.then(() => {
					this.checkCollect()
				})
				.catch((err) => {
					console.log('article: ' ,err)
				})
			},
			clickUp(replyId) {
				if (!this.userInfo.loginname) {
					alert('请先登录，登录后即可点赞')
					return
				}

				this.axios.post(`https://cnodejs.org/api/v1/reply/${replyId}/ups`, {
					accesstoken: this.userInfo.accessToken
				})
				.then((res) => {
					this.getData()
				})
				.catch((err) => {
					err.response.status === 403 && alert(err.response.data.error_msg)
					console.log('clickup: ', err)
				})
			},
			addComment(commentContent, replyId) {
				this.axios.post(`https://cnodejs.org/api/v1/topic/${this.article.id}/replies`, {
					accesstoken: this.userInfo.accessToken,
					content: commentContent,
					reply_id: replyId
				})
				.then(res => {
					this.getData()
					this.commentContent = ''
					this.curReplyId = '',
					this.replyContent= ''
				})
				.catch(err => {
					console.log('reply: ', err)
				})
			},
			addReply(replyId, loginname) {
				this.curReplyId = replyId
				this.replyContent = '@' + loginname + ' '
			},
			checkCollect() {
				if (!this.userInfo.loginname) return
				this.axios.get(`https://cnodejs.org/api/v1/topic_collect/${this.userInfo.loginname}`)
				.then((res) => {
					this.collections = res.data.data
					this.collections.forEach(i => {
						i.id === this.article.id && (this.isCollect = true)
					})
				})
				.catch((err) => {
					console.log('articleCollection ', err)
				})
			},
			collectionTopic(isCollect) {
				let action = isCollect ? 'de_collect' : 'collect'

				this.axios.post(`https://cnodejs.org/api/v1/topic_collect/${action}`, {
					accesstoken: this.userInfo.accessToken,
					topic_id:  this.article.id
				})
				.then((res) => {
					this.getData()
					res.data.success ?
					this.isCollect = !isCollect :
					alert('操作失败')
				})
				.catch((err) => {
					console.log(err)
				})
			}
		},
		computed: {
			...mapState({
				userInfo: 'userInfo'
			})
		},

	}
</script>

<style lang="scss">
	@import '~css/markdown.scss';

	section {
		width: 680px;
		margin: 0 auto;
		padding: 30px 0;
	}

	.article-header {
		padding: 0 1.1rem;
		margin-bottom: 1rem;

		h1 {
			font-size: 24px;
		}
	}

	.article-info {
		font-size: 13px;
		color: #838383;
		.point {
			background: #838383;
		}
	}

	.article-content {
		padding-bottom: 10px;
		img {
			max-width: 100%;
		}
	}

	.article-comment {
		padding-top: 10px;
		border-bottom: 1px solid #d6d6d6;
		margin-bottom: 20px;
	}

	.comment-title {
		padding-bottom: 5px;
		font-size: 16px;
		border-bottom: 1px solid #d6d6d6;
	}

	.comment-count {
		margin-left: 4px;
		font-size: 12px;
	}

	.comment-item {
		padding: 12px;
		border-radius: 3px;
		display: flex;
		p {
			padding: 0;
			margin: 0;
		}
		blockquote {
			margin: 1rem 0;
		}
		.avatar {
			display: block;
			width: 48px;
			height: 48px;
			margin-right: 12px;
			padding-top: 6px;
			img {
				width: 48px;
				height: 48px;
				border-radius: 3px;
				box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
			}
		}
		&>div {
			width: 100%;
		}
	}

	.comment-header {
		a {
			font-size: 13px;
			font-weight: 700;
		}
		span {
			color: #656c7a;
			font-weight: 500;
			font-size: 12px;
		}
	}

	.comment-body {
		img {
			vertical-align: middle;
			max-width: 100%;
		}
	}

	.comment-footer {
		display: flex;
		a {
			font-size: 13px;
			color: #656c7a;
			font-weight: 500;
			transition: all .3s ease-out;
			&:hover {
				color: #2a2e2e;
			}
		}
		.point {
			background: #656c7a;
		}

	}

	.comment-box {
		display: flex;
		flex-direction: column;
		textarea {
			width: 100%;
			height: 120px;
			border: 2px solid #dbdfe4;
			position: relative;
			border-radius: 4px;
			outline: none;
			padding: 10px;
			font-size: 15px;
			resize: none;
			&::-webkit-input-placeholder {
				color: #687a86;
				font-size: 15px;
			}
		}
		div {
			width: 100%;
			height: 36px;
			text-align: right;
			background: #f6f8f9;
			border-radius: 0 0 2px 2px;
			border: solid 2px #dbdfe4;
			border-top: none;
			opacity: 1;
			position: relative;
		}
		button {
			height: 38px;
			line-height: 38px;
			border: none;
			outline: none;
			background: #778289;
			display: inline-block;
			padding: 0 16px;
			color: #fff;
			border-radius: 3px;
			font-weight: 500;
			transition: background .2s;
			text-shadow: none;
			position: absolute;
			right: -2px;
			top: -2px;
			&:hover {
				background: rgba(29,47,58,.7);
			}
		}
	}
</style>


