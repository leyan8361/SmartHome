const path = require('path')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
import Regular from '../../utils/regular'
const SALT_WORK_FACTOR = 10

const User = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			validate: value => {
				return value.length >= 2 && value.length <= 8
			}
		},
		account: {
			type: String,
			required: true,
			trim: true,
			validate: value => {
				return Regular.phone(value) || Regular.email(value)
			}
		},
		password: {
			type: String,
			required: true,
			trim: true,
			validate: value => {
				return Regular.password(value)
			}
		},
		address: {
			province: {
				type: String,
				required: true,
				trim: true
			},
			city: {
				type: String,
				required: false,
				trim: true
			},
			county: {
				type: String,
				required: false,
				trim: true
			}
		},
	},
	{
		timestamps: true,
		safe: true,
		wtimeout: 10000
	}
)
User.set('toJSON', { getters: true, virtuals: true })
User.set('toObject', { getters: true, virtuals: true })

User.virtual('address.full').get(() => {
	return `${this.address.province} ${this.address.city} ${this.address.county}`
})

User.pre('save', function(next) {
	const user = this
	if (!user.isModified('password')) return next()

	bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
		if (err) return next(err)
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) return next(err)
			user.password = hash
			next()
		})
	})
})

User.methods = {
	comparePassword(newPass, hadBcryptPass) {
		return new Promise((resolve, reject) => {
			bcrypt.compare(newPass, hadBcryptPass, (err, isMatch) => {
				if (!err) {
					resolve(isMatch)
				} else {
					reject(err)
				}
			})
		})
	},
}

module.exports = mongoose.model('User', User)
