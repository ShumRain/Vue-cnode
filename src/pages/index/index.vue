<template>
	<section>
		<div class="topic-list">
			<div v-for="item of topicItems" class="topic-item" :key="item.id">
				<div class="topic-item-header">
					<h2 class="topic-item-title">
						<router-link :to="{name: 'articleRoute', params: {id: item.id}}">{{ item.title }}</router-link>
					</h2>
					<div class="topic-item-tag">{{ item.tab }}</div>
				</div>
				<div class="topic-item-footer">
					<router-link to="melo.vc"><img :src="item.author.avatar_url"></router-link>
					<div class="point"></div>
					<span>2小时前</span>
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
	export default {
		data() {
			return {
				topicItems: []
			}
		},
		created() {
			this.axios.get('https://cnodejs.org/api/v1/topics', {
				params: {
					page: 1,
					limit: 10,
					merender: 'false'
				}
			})
			.then((res) => {
				console.log(res)
				this.topicItems = res.data.data
			})
			.catch((err) => {
				console.log('index: ', err)
			})
		}
	}
</script>

<style lang="scss" scoped>
	section {
		width: 680px;
		margin: 20px auto 0;
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