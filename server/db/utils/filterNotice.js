const config = require('../../../config/notice.json')
const moment = require('moment')
module.exports = (notice, account) => {
	if (notice.length === 0) { return }
	const result = {}
	config.type.forEach(e => {
		result[e]={receive:[],send:[]}
	})
	notice.forEach(e => {
		if (e.sender === account) {
			[].push.call(result[e.type].send,{
				receiver: e.receiver,
        message: e.message,
        time: moment(e.createdAt).fromNow()
			})
		} else if (e.receiver === account) {
			[].push.call(result[e.type].receive,{
				sender: e.sender,
        message: e.message,
        time: moment(e.createdAt).fromNow()
			})
		}
	})
	/* REVIEW: notice.family.send[0].message*/
  return result
}
