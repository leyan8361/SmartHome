const bcrypt = require('bcryptjs')
const {SALT_WORK_FACTOR} = require('../../../config/auth')
module.exports = async user => {
	const salt = await bcrypt.genSaltSync(Number.parseInt(SALT_WORK_FACTOR))
	return bcrypt.hashSync(user.password, salt)
}
