const fs = require('fs')

fs.readFile('./code.txt', 'utf-8',(err, data) => {
	if (err) {
		return console.error('文件读取失败！')
	}
	const area = []
	const provinces = []
	let citys = []
	const second = []
	const regex = /^(?<code>\d+) (?<county>[^\s]+) (?<province>[^\s]+) (?<city>[^\s]+)$/gm

	const address = data.replace(regex, (...e) => {
		const info = e.pop()
		const { code, county, province, city } = info
		// console.log(info)

		/* 是一个新的省份 */
		if (!provinces.includes(province)) {
			provinces.push(province)
			citys = [city]
			if (city === province) {
				second.push(city)
				area.push({
					value: province,
					label: province,
					code: code,
					children: []
				})
			}else{
				area.push({
					value: province,
					label: province,
					code: code,
					children: [{
						value: city,
						label: city,
						code: code,
						children: []
					}]
				})
			}

		} else {
			/* 有了一个新的城市 */
			if (!citys.includes(city)) {
				citys.push(city)
				for (let a of area) {
					if (province === a.value) {
						a.children.push({
							value: city,
							label: city,
							code: code,
							children: []
						})
					}
				}
			} else {

				for (let a of area) {
					if (province === a.value) {
						if (second.includes(city)) {
							a.children.push({
								value: county,
								label: county,
								code: code
							})
						} else {
							for (let b of a.children) {
								if (b.value === city) {
									b.children.push({
										value: county,
										label: county,
										code: code
									})
								}
							}
						}

					}
				}
			}
		}
	})
	fs.writeFile('./city.js', JSON.stringify(area), error => {
		if (error) {
			return '写入失败'
		}
	})
})
