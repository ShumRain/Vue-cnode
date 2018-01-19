<template>
	<div id="app">
		<commonHeader></commonHeader>
		<loading v-if="isLoading"></loading>
		<transition :name="transitionName">
			<keep-alive include="home">
				<router-view class="child-view"></router-view>
			</keep-alive>
		</transition>
	</div>
</template>

<script>
	import commonHeader from 'components/header'
	import loading from 'components/loading'
	import { mapState } from 'vuex'

	export default {
		data() {
			return {
				transitionName: 'slide-leff'
			}
		},
		name: 'app',
		components: {
			commonHeader,
			loading,
		},
		computed: {
			...mapState({
				isLoading: 'isLoading',
			})
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

	#app {
		height: 100%;
	}

	.child-view {
		height: calc(100% - 50px);
		opacity: 1;
		transition: all .3s ease-out;
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
