const fs = require('fs')
const config = require('../../../../config/file')
const bcrypt = require('bcryptjs')
const { SALT_WORK_FACTOR } = require('../../../../config/auth')
module.exports = {
	async writeImg(user) {
		if (!user.avatar) { return config.defaultAvatarUrl }
		const imgData = user.avatar.split(',')
		const imgEtx = imgData[0].match(/:(.*?);/)[1].split('/')[1]
		const img = `/avatar.${ imgEtx}`
		const folderPath = config.path + user.account
		const filePath = folderPath + img

		await (!fs.existsSync(folderPath) && fs.mkdirSync(folderPath))

		await fs.writeFileSync(filePath, Buffer.from(imgData[1],'base64'))

		return config.url + user.account + img
	},
	async bcryptPass (user) {
		const salt = await bcrypt.genSaltSync(Number.parseInt(SALT_WORK_FACTOR))
		return bcrypt.hashSync(user.password, salt)
	}
}
