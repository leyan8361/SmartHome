export default {
  fcounty(county) {
    if (!county) return
    if (county.length >= 3) {
      const last = county.length - 1
      if (county[last] === '市' || county[last] === '区' || county[last] === '县') {
				return { address: county.substr(0, last), level: 'county' }
			} else {
				return { address: county, level: 'county' }
			}
    } else {
      if (county !== '城区' && county !== '郊区') {
        return { address: county, level: 'county' }
      }
    }
  },
  fcity(city) {
    if (!city) return
    if (city.length >= 3) {
    	const last = city.length - 1
    	if (city[last] === '市') {
    		return { address: city.substr(0,last), level: 'city' }
			}
    }
    return  { address: city, level: 'city' }
	},
	match(data, address, level) {
		let search
		let skip
		if (level === 'city') {
			search = 'parent_city'
			skip = 'province'
		} else {
			search = 'admin_area'
			skip = 'county'
		}
		let result = {success:false}
		data.forEach((e, index) => {
			for (let [key, value] of Object.entries(address)) {
				if(key===skip) continue
				if (value.indexOf(e[search]) !== -1 || (e[search][0] === value[0] && e[search][1] === value[1])) {
					return result = {success:true,index}
				}
			}
		})
		return result
	}
}
