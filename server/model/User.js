const mongoose = require('mongoose')

const log = require('../utils/log')
const bcryptPass = require('../db/utils/bcryptPass')
const writeImg = require('../db/utils/writeImg')
const bcrypt = require('bcryptjs')
const notice = require('../../config/notice.json')

const User = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		account: {
			type: String,
			required: true,
			trim: true,
			unique: true
		},
		password: {
			type: String,
			required: true,
			trim: true
		},
		avatar: {
			type: String,
      trim: true
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
			},
			code: {
				type: String,
				required: true,
				trim:true
			}
		},
		private: {
			type: [String],
			required: false
		},
		news: {
			[notice.type[0]]: {
				type: Number,
				min: 0,
				required: false,
				default: 0,
				max:9999
			},
			[notice.type[1]]: {
				type: Number,
				min: 0,
				required: false,
				default: 0,
				max:9999
			},
			[notice.type[2]]: {
				type: Number,
				min: 0,
				required: false,
				default: 0,
				max:9999
			}
		}
	},
	{
		collection: 'User',
		timestamps: true,
		safe: true,
		wtimeout: 10000
	}
)
User.set('toJSON', { getters: true, virtuals: true })
User.set('toObect', { getters: true, virtuals: true })

User.pre('save', async function (next) {

	const [avatar, password] = await Promise.all([writeImg(this), bcryptPass(this)])
	this.avatar = avatar
	this.password = password

	next()
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
	}
}
User.statics = {
	fetch: function(cb) {
		return this.find({})
			.sort('update_at')
			.exec(cb)
	},
	findById: function(id, cb) {
		return this.findOne({ _id: id }).exec(cb)
	},
	hasExisted: async function(account) {
		let result = true
		await this.findOne({ account: account }, (err, data) => {
			result = !!data
		})
		return result
	}
}

module.exports = mongoose.model('User', User)
