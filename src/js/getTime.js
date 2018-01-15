const getTime = (date) => {
	if (!date) return ''
	const cur = new Date()
	const time = cur - new Date(date)

	if (time < 0) {
		return ''
	} else if ((time / 60000) < 60) {
		return parseInt((time / 60000)) + ' 分钟前'
	} else if ((time / 3600000) < 24) {
		return parseInt(time / 3600000) + ' 小时前'
	} else if ((time / 86400000) < 31) {
		return parseInt(time / 86400000) + ' 天前'
	} else if ((time / 2592000000) < 12) {
		return parseInt(time / 2592000000) + ' 月前'
	} else {
		return parseInt(time / 31536000000) + ' 年前'
	}
}


export default getTime