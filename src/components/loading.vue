<template>
	<div class="loading-container">
		<div class="loading"></div>
	</div>
</template>

<script>
	export default {
	}
</script>

<style lang="scss" scoped>
	.loading-container {
		width: 100%;
		height: 100%;
		position: absolute;
		background: #fff;
		padding: 20px 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.loading {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		border: 3px solid #1191e1;
		border-bottom-color: transparent;
		animation: rotate 1s infinite ease-out;
	}

	@keyframes rotate {
		from {transform:rotate(0deg);}
		to {transform:rotate(360deg);}	
	}
</style>
