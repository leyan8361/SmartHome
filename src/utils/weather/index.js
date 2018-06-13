const getType = type => {
	let result = '舒适度指数'
	switch (type) {
		case 'cw':
			result = '洗车指数'; break
		case 'drsg':
			result = '穿衣指数'; break
		case 'flu':
			result = '感冒指数';break
		case 'sport':
			result = '运动指数'; break
		case 'trav':
			result = '旅游指数'; break
		case 'uv':
			result = '紫外线指数'; break
		case 'air':
			result = '空气污染指数'; break
		case 'ac':
			result = '空调开启指数'; break
		case 'ag':
			result = '过敏指数'; break
		case 'gl':
			result = '太阳镜指数'; break
		case 'mu':
			result = '化妆指数'; break
		case 'airc':
			result = '晾晒指数'; break
		case 'ptfc':
			result = '交通指数'; break
		case 'fsh':
			result = '钓鱼指数'; break
		case 'spi':
			result = '防晒指数'; break
	}
	return result
}
export default weather => {
	if (Array.isArray(weather)) {
		return weather.map(e => {
			const type = getType(e.type)
			const {brf:level,txt:describe} = e
			return { type, level, describe }
		})
	}

	const result = {}
	result.weather = weather.cond_txt
	result.code = weather.cond_code

	result.wind = {}
	result.wind.direction = weather.wind_dir
	result.wind.power = weather.wind_sc
	result.wind.speed = weather.wind_spd

	result.humidity = weather.hum
	result.temperature = weather.tmp

	result.precipitation = weather.pcpn
	result.seeing = weather.vis

	return result
}

/*
weather='晴'
code=1
wind={
	direction:'西北', //风向
	power:3, //风力
	speed:15 //风速
}

temperature = 30 //温度
humidity = 40 //相对湿度

precipitation = 0 //降水量
seeing = 10 //能见度 单位公里
*/
