const fs = require('fs')
const config = require('config/file')

module.exports = {
	async writeImg({avatar,name}) {
		if (!avatar) { return config.avatar.family }
		const imgData = avatar.split(',')
		const imgEtx = imgData[0].match(/:(.*?);/)[1].split('/')[1]
		const img = `/avatar.${imgEtx}`
		const folderPath = config.avatar.path.family + name
		const filePath = folderPath + img

		await (!fs.existsSync(folderPath) && fs.mkdirSync(folderPath))

		await fs.writeFileSync(filePath, Buffer.from(imgData[1],'base64'))

		return config.avatar.url.family + name + img
	}
}
