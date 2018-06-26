export default{
	setBulbs(state, bulbs) {
		bulbs.forEach(e =>{
			e.showStatus = e.status ? '开' : '关'
		})
		state.bulbs = bulbs
	},
	setTheBulb(state, bulb) {
		const { index } = bulb
		state.bulbs[index] = bulb
		state.bulbs[index].showStatus = bulb.status ? '开' : '关'
	},
	setBulbsStatus(state, status) {
		state.bulbs.forEach(e => {
			e.status = status
			e.showStatus = status ? '开' : '关'
		})
	},
	setAllBulbs(state, bulb) {
		const isAll = bulb.ids.includes('0')
		bulb.ids.forEach(currId => {
			const e = state.bulbs.find(o=>o.id === currId)
			if (e || isAll) {
				if (bulb.status) {
					e.status = bulb.status
					e.showStatus = bulb.status ? '开' : '关'
				}
				if (bulb.brightness) {
					e.brightness = bulb.brightness
				}
				if (bulb.color) {
					e.color = bulb.color
				}
			}
		})

	},
	deleteBulbById(state, id) {
		state.bulbs.forEach((e, i) => {
			if (e.id === id) {
				state.bulbs.splice(i,1)
			}
		})
	},
	renameBulbById(state, bulb) {
		state.bulbs.forEach(e => {
			if (e.id === bulb.id) {
				e.name = bulb.name
			}
		})
	},
	addBulb(state, bulb) {
		state.bulbs.push(bulb)
	}
}
