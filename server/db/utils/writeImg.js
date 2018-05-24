const fs = require('fs')
const fileServer = require('../../../config/file')
module.exports = async user => {
	if (!user.avatar) { return fileServer.defaultAvatarUrl }
	const imgData = user.avatar.split(',')
	const imgEtx = imgData[0].match(/:(.*?);/)[1].split('/')[1]
  const img = `/avatar.${ imgEtx}`
  const folderPath = fileServer.path + user.account
  const filePath = folderPath + img

  await (!fs.existsSync(folderPath) && fs.mkdirSync(folderPath))

	await fs.writeFileSync(filePath, Buffer.from(imgData[1],'base64'))

	return fileServer.url + user.account + img
}
