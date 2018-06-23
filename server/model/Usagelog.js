const mongoose = require('mongoose')
const User = require('model/User')

const Usagelog = new mongoose.Schema(
	{
		master: {
			type: String,
			required: true,
			trim:true
		},
		name:{
			type:String,
			trim:true,
			required:false
		},
		id: {
			type:String,
			trim:true,
			required:false
		},
		status: {
			type: Boolean,
			default: false
		},
		showStatus: {
			type: String,
			trim:true,
			default: false
		},
		color: {
			type: String,
			required: false,
			enum: ['暖白光', '自然光', '正白光','冷白光','保持原状'],
			default: '保持原状',
			trim:true
		},
		brightness: {
			required: false
		},
		script: {
			type: Boolean,
			required: false,
			default:false
		},
		family: {
			type: [String],
			required:false
		}
	},
	{
		collection: 'Usagelog',
		timestamps: true,
		safe: true,
		wtimeout: 10000
	}
)
Usagelog.pre('save', async function (next) {
	const account = this.master
	await User.updateOne({ account}, { $inc: { 'news.electric': 1 } })
	next()
})
Usagelog.set('toJSON', { getters: true, virtuals: true })
Usagelog.set('toObect', { getters: true, virtuals: true })


module.exports = mongoose.model('Usagelog',Usagelog)
