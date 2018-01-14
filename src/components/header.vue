<template>
	<header>
		<nav>
			<div class="logo">
				<router-link to="/">
					<img src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg">
				</router-link>
			</div>
		</nav>
	</header>
</template>

<script>
</script>

<style lang="scss" scoped>
	header {
		height: 50px;
		background: #444;
		display: flex;
		justify-content: center;
	}

	nav {
		width: 750px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		font-size: 16px;
	}

	.logo {
		width: 120px;
	}
</style>