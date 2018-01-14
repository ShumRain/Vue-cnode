<template>
	<section>
		<div class="article-header">
			<h1>{{ article.title }}</h1>
			<div class="article-info">
				<span>发布于3天前</span>
				<span class="point"></span>
				<span>作者{{ article.author.loginname }}</span>
				<span class="point"></span>
				<span>{{ article.visit_count }}次浏览</span>
				<span class="point"></span>
				<span>来自{{ article.tab }}</span>
			</div>
		</div>
		<div class="article-content">
			<div v-html="article.content"></div>
		</div>
		<div class="article-comment">
			<div class="comment-item" v-for="reply of article.replies" :key="reply.id">
				<div><img :src="reply.author.avatar_url"></div>
				<div>
					<div class="comment-header">
						<a href="melo.vc">{{ reply.author.loginname }}</a>
						<span class="point"></span>
						<span>1天前</span>
					</div>
					<div v-html="reply.content" class="comment-body"></div>
					<div class="comment-footer">
						<a href="javascript:;"><span>点赞</span></a>
						<span class="point"></span>
						<a href="javascript:;"><span>回复</span></a>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>


<script>
	export default {
		data() {
			return {
				article: {
					title: '',
					visit_count: '',
					tab: '',
					content: '',
					author: {
						loginname: '',
					},
					replies: []
				}
			}
		},
		created() {
			let path = this.$route.path

			this.axios.get(`https://cnodejs.org/api/v1/${path}`)
			.then((res) => {
				this.article = res.data.data
				console.log(this.article)
			})
			.catch((err) => {
				console.log(err)
			})
		}
	}
</script>

<style>
</style>


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
		border-bottom: 1px solid #d6d6d6;
		padding-bottom: 20px;
	}

	.comment-item {
		padding: 12px;
		border-radius: 3px;
		display: flex;
		p {
			padding: 0;
			margin: 0;
		}
		img {
			width: 48px;
			height: 48px;
			border-radius: 3px;
			margin-right: 12px;
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

	.comment-footer {
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


