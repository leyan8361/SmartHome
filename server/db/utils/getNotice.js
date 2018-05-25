const config = require('../../../config/notice.json')
const moment = require('moment/min/moment-with-locales')
const Notice = require('../../model/Notice')
module.exports = async account => {
	const notice = await Notice.find({ $or: [{ 'receiver.account': account }, { 'sender.account': account }] })

	if (!notice || notice.length === 0) { return }
	const result = {}
	config.type.forEach(e => {
		result[e] = {receive:[],send:[]}
	})
	notice.forEach(e => {
		if (e.sender.account === account) {
			[].push.call(result[e.type].send,{
				receiver: e.receiver,
        message: e.message,
        date: moment(e.createdAt).fromNow()
			})
		} else if (e.receiver.account === account) {
			[].push.call(result[e.type].receive,{
				sender: e.sender,
        message: e.message,
        date: moment(e.createdAt).fromNow()
			})
		}
	})
	/* REVIEW: notice.family.send[0].message*/
  return result
}
