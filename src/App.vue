<template>
	<div id="app">
		<commonHeader></commonHeader>
		<loading :show="isLoading"></loading>
		<transition :name="transitionName">
			<router-view class="child-view"></router-view>
		</transition>
	</div>
</template>

<script>
	import commonHeader from 'components/header'
	import loading from 'components/loading'

	export default {
		data() {
			return {
				isLoading: true,
				transitionName: 'slide-leff'
			}
		},
		name: 'app',
		components: {
			commonHeader,
			loading,
		},
		mounted() {
			setTimeout(() => {
				this.isLoading = false
			}, 300)
		},
		watch: {
			'$route' (to, from) {
				const toDepth = to.path.split('/').length
				const fromDepth = from.path.split('/').length
				this.transitionName = toDepth < fromDepth ? 'slide-right' :
				'slide-left'
			}
		}
	}
</script>

<style lang="scss">
	@import '~css/common.scss';

	.child-view {
		transition: all .5s cubic-bezier(.55,0,.1,1);
	}
	.slide-left-enter, .slide-right-leave-active {
		opacity: 0;
		-webkit-transform: translate(30px, 0);
		transform: translate(30px, 0);
	}
	.slide-left-leave-active, .slide-right-enter {
		opacity: 0;
		-webkit-transform: translate(-30px, 0);
		transform: translate(-30px, 0);
	}
</style>
