const mutations = {
	load: state => state.isLoading = true,
	notLoad: state => state.isLoading = false,
	setUserInfo(state, userInfo) {
		state.userInfo = userInfo
	}
}

export default mutations