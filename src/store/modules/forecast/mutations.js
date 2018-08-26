import faker from '@/utils/faker'
export default {
	setSingleBulb(state, singleBulb) {
		// state.singleBulb = singleBulb
		// TODO: 模拟假数据
		state.singleBulb = faker.getSingleBulbData()
	},
	setAllBulb(state, allBulb) {
		// state.allBulb = allBulb
		if(!state.allBulb.length){
			state.allBulb = faker.getAllBulbData()
		}
	}
}
