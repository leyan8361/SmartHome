import http from '@/utils/http'
import weather from 'config/weather'
import weatherInfo from '@/utils/http/weather'
import addressFilter from '@/store/plugin/address'
export default {
	async addRemote({ state }) {
		return await http.get(weather.cityID, {
			params: {
				location: state.search.address,
				key: weather.key,
				group: weather.group
			},
			withCredentials: false,
		}).then(({ HeWeather6: { "0": result } }) => {
			return result
		})
	},
	async getCityID({ dispatch,state,rootGetters,commit}) {
		await dispatch('addRemote').then(({ status , basic }) => {
			console.log(basic)
			if (status === 'ok') {
				if (basic.length > 1) {
					if (state.search.level === 'county') {
						const match = addressFilter.match(basic, rootGetters.address,'city')
						if (!match.success) { return 1 }
						return basic[match.index].cid
					} else if (state.search.level === 'city') {
						const match = addressFilter.match(basic, rootGetters.address,'province')
						if (!match.success) { return 0 }
						return basic[match.index].cid
					}
				} else { return	basic[0].cid }
			} else if (status.indexOf('unknown') !== -1) { return 1 } else return 0
		}).then(key => {
			if (!!key === false) {
				commit('Enable', false)
				console.error('无法获取天气情况！')
			}
			if (key === 1) {
				if (state.search.level === 'province') {
					commit('Enable', false)
					console.warn('偏僻地区无法获取天气情况！')
				} else {
					if (state.search.level === 'county') {
						commit('Search', {address:rootGetters.address['city'],level:'city'})
					} else if (state.search.level === 'city') {
						commit('Search', {address:rootGetters.address['province'],level:'province'})
					}
					dispatch('getCityID')
				}
			} else {
				commit('CityID', key)
				dispatch('setWeatherInfo')
			}
		}).catch(err => {
			console.error(err)
			commit('Enable',false)
		})
	},
	async getWeatherInfo({ state,commit, dispatch,rootGetters }) {
		/* 地级 是大于三个字 最后是 市 区 县 的去掉，地级a查找的结果要筛选，选最匹配的那个！ */
		if (!state.cityID) {
			const address = rootGetters.address
			const searchAddress = addressFilter.fcounty(address.county) || addressFilter.fcity(address.city) || { address: address.province, level: 'province' }
			commit('Search',searchAddress)
			await dispatch('getCityID')
			if (!state.enable) { return }
		} else {
			dispatch('setWeatherInfo')
		}
	},

	async setWeatherInfo({ commit }) {
		weatherInfo().then(({ weatherInfo, sunInfo, airInfo }) => {
			commit('Weather',weatherInfo)
			commit('Sun',sunInfo)
			commit('Air',airInfo)
		}).catch(err => {
			console.error(err)
			commit('Enable',false)
		})
	}
}
