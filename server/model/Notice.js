const mongoose = require('mongoose')
const config = require('config/notice')
const User = require('model/User')

const Notice = new mongoose.Schema(
	{
		id: {
			type: String,
			trim: true,
			required:true
		},
		receiver: {
			account: {
				type: String,
				required: true,
				trim:true
			},
			name: {
				type: String,
				required: true,
				trim:true
			}
		},
		message: {
			type: String,
			required: false,
			trim:true
		},
		sender: {
			account: {
				type: String,
				required: true,
				trim:true
			},
			name: {
				type: String,
				required: true,
				trim:true
			}
		},
		families: [{ // 邀请加入家庭通知 的 家庭信息
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
		type: {
			type: String,
			required: true,
			enum: config.type,
			lowercase:true
		},
		status: {
			type: String,
			required: false,
			enum: ['已加入', '已拒绝', '未回应'],
			default:'未回应'
		},
		system: {
			type: Boolean,
			default:false
		},
		sysMessage: {
			sender: {
				type: String,
				required: false,
				trim:true
			},
			receiver: {
				type: String,
				required: false,
				trim:true
			}
		}
	},
	{
		collection: 'Notice',
		timestamps: true,
		safe: true,
		wtimeout: 10000
	}
)
Notice.pre('save', async function (next) {
	const { account } = this.receiver
	const news = `news.${this.type}`
	await User.updateOne({ account }, { $inc: { [news]: 1 } })
	next()
})
Notice.set('toJSON', { getters: true, virtuals: true })
Notice.set('toObect', { getters: true, virtuals: true })


module.exports = mongoose.model('Notice',Notice)
