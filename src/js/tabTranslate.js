const translate = (tab) => {
	let tabMap = {
		'ask': '问答',
		'share': '分享',
		'job': '招聘',
		'good': '精华',
		'top': '置顶',
		'dev': '测试'
	}

	return tabMap[tab]
}

export default translate