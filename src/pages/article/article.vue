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
			</div>
		</div>
		<div class="article-content">
			<div v-html="article.content"></div>
		</div>
		<div class="article-comment">
			<div class="comment-title">
				<span>评论区</span><span class="comment-count">{{ article.reply_count }}</span>
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
						<a href="javascript:;" @click="clickUp">点赞<span v-show="reply.ups.length > 0">{{ reply.ups.length }}</span></a>
						<div v-if="false">
							<span class="point"></span>
							<a href="javascript:;"><span>回复</span></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>


<script>
	import getTime from 'js/getTime.js'
	import tabTranslate from 'js/tabTranslate.js'
	import hljs from 'highlight.js'

	export default {
		data() {
			return {
				article: null
			}
		},
		created() {
			let path = this.$route.path

			this.axios.get(`https://cnodejs.org/api/v1/${path}`)
			.then((res) => {
				console.log(res.data.data)
				this.article = res.data.data
			})
			.catch((err) => {
				console.log('article: ' ,err)
			})
		},
		mounted() {
			setTimeout(() => {
				let blocks = Array.from(this.$el.querySelectorAll('pre'))
				blocks.forEach((i) => {
					hljs.highlightBlock(i)
				})
			}, 500)
		},
		methods: {
			getTime,
			tabTranslate,
			clickUp() {
				alert('请先登录，登录后即可点赞')
			}
		}
	}
</script>

<style lang="scss">
	@import '~css/markdown.scss';

	section {
		width: 680px;
		margin: 30px auto 0;
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
</style>


