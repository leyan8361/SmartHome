import notice from 'config/notice'
export default {
	[notice.type[0]](state, family) {
		state[notice.type[0]] = family
	},
	[notice.type[1]](state,weather ) {
		state[notice.type[1]] = weather
	},
	[notice.type[2]](state, electric) {
		state[notice.type[2]] = electric
	}
}
