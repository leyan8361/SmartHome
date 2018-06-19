const mongoose = require('mongoose')

const Usagelog = new mongoose.Schema(
	{
		master: {
			type: String,
			required: true,
			trim:true
		},
		id: {
			type: String,
			required: true,
			trim:true
		},
		operating: {
			status: {
				type: Boolean,
				default:false
			},
			name:{
				type: String,
				trim: true,
				required:false,
				default:'灯泡'
			},
			color: {
				type: String,
				required: false,
				enum: ['暖白光', '自然光', '正白光','冷白光'],
				default: '自然光',
				trim:true
			},
			brightness: { //亮度
				type: Number,
				required: true,
				max: 300,
				min: 0
			}
		}
	},
	{
		collection: 'Usagelog',
		timestamps: true,
		safe: true,
		wtimeout: 10000
	}
)
Usagelog.set('toJSON', { getters: true, virtuals: true })
Usagelog.set('toObect', { getters: true, virtuals: true })


module.exports = mongoose.model('Usagelog',Usagelog)
