const moment = require('moment')

export default {
	setUsagelogs(state, usagelogs) {
		if (!usagelogs || !usagelogs.length) {
			return
		}
		moment.locale('zh-cn')

		state.usagelogs = usagelogs.reduce((result, curr) => {
			curr.date = moment(curr.createdAt).fromNow()
			if (curr.brightness) {
				curr.brightness += '%'
			} else {
				curr.brightness = '保持原状'
			}
			curr.isScript = curr.script ? '是' : '否'
			result.push(curr)
			return result
		},[])
	}
}
