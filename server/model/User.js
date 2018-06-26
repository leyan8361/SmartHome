const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { writeImg, bcryptPass } = require('utils/db/user')

const notice = require('config/notice')

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
		families: [{
			name:{
				type: String,
				required: false,
				trim:true
			},
			displayName:{
				type: String,
				required: false,
				trim:true
			}
		}],
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
		},
		electricity: [{ // 使用总电量 date为日期，consumption 为那日期的使用电量,单位度
			date: {
				type:String,
				required:false
			},
			consumption: {
				type: Number,
				required: false,
				min:0
			}
		}]
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
	},
	getTotalElectricity() {
		return this.electricity.reduce((total, { consumption }) => {
			total += consumption
			return total
		},0)
	}
}

module.exports = mongoose.model('User', User)
