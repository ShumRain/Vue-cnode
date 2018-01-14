<template>
	<div id="app">
		<commonHeader></commonHeader>
		<router-view/>
	</div>
</template>

<script>
	import commonHeader from 'components/header'

	export default {
		name: 'app',
		components: {
			commonHeader,
		}
	}
</script>

<style lang="scss">
	@import '~css/common.scss';
</style>
