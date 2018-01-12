<template>
	<div id="app">
		<commonHeader></commonHeader>
		<router-view/>
	</div>
</template>

<script>
	import commonHeader from './components/header'

	export default {
		name: 'app',
		components: {
			commonHeader,
		}
	}
</script>

<style lang="scss">
	@import url('./css/common.scss');

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}
</style>
