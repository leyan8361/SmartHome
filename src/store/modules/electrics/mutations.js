export default{
  setBulbs(state,bulbs){
		state.bulbs = bulbs
		bulbs.forEach((e,i)=>{
			state.bulbs[i].showStatus = e.status ? '开' : '关'
		})
  }
}
