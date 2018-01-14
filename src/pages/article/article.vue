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
	</section>
</template>


<script>
	export default {
		data() {
			return {
				article: {
					content: ''
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
</style>


