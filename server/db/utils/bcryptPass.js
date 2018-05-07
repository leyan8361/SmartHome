const bcrypt = require('bcryptjs')
const {SALT_WORK_FACTOR} = require('../../../config/auth')
module.exports = user => {
	if (!user.isModified('password')) { return }
	user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(Number.parseInt(SALT_WORK_FACTOR)))
}
