export default{
  setBulbs(state,bulbs){
		state.bulbs = bulbs
		bulbs.forEach(e =>{
			e.showStatus = e.status ? '开' : '关'
		})
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
		state.bulbs.forEach(e => {
			Object.keys(bulb).forEach(key => {
				e[key] = bulb[key]
			})
			e.showStatus = e.status ? '开' : '关'
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
