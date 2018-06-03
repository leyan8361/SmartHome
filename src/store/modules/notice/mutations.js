import notice from 'config/notice'
import moment from 'moment'

export default {
	[notice.type[0]](state, family) {
		state[notice.type[0]] = family
	},
	[notice.type[1]](state,weather ) {
		state[notice.type[1]] = weather
	},
	[notice.type[2]](state, electric) {
		state[notice.type[2]] = electric
	},
	addNotice(state, { message, receiver }, type) {
		const date = moment().fromNow();
		[].push.call(state[type].send,{ date, message, receiver })
	}
}
