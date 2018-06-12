export default weather => {
	const result = {}
	result.weather = weather.cond_txt
	result.code = weather.cond_code

	result.wind.direction = weather.wind_dir
	result.wind.power = weather.wind_sc
	result.wind.speed = weather.wind_spd

	result.humidity = weather.hum
	result.temperature = weather.tmp

	result.precipitation = weather.pcpn
	result.seeing = weather.vis

	return result
}
