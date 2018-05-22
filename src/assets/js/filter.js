const fs = require('fs')
const citys = require('./city')

const _clone = citys
// fs.writeFileSync('./area.js', _clone)

for (let province of citys) {
	for (let city of province.children) {
		if (city.value === province.value) {
			province.children = city.children
		}
	}
}
for (let province of citys) {
	for (let city of province.children) {
		if (city.value === province.value) {
			province.children
		}
	}
}
