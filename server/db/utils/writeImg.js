const fs = require('fs')
const fileServer = require('../../../config/file')
module.exports = user => {
	if (!user.avatar) { user.avatar = fileServer.defaultAvatarUrl;return }
	const imgData = user.avatar.split(',')
	const imgEtx = imgData[0].match(/:(.*?);/)[1].split('/')[1]
  const img = '/avatar.' + imgEtx
  const folderPath = fileServer.path + user.account
  const filePath = folderPath + img

  !fs.existsSync(folderPath) && fs.mkdirSync(folderPath)
  const buf = Buffer.from(imgData[1],'base64')

  fs.writeFileSync(filePath, buf)
	user.avatar = fileServer.url + user.account + img

}
