const mongoose = require('mongoose')

const Scripts = new mongoose.Schema(
	{
		master: {
			type: String,
			required: true,
			trim:true
		},
		disable: {
			type: Boolean,
			default:false
		},
		id: {
			type: String,
			required: true,
			trim:true
		},
		name:{
			type: String,
			trim: true,
			required:false
		},
		relation: {
			type: Boolean,
			default:false
		},
		duration: {
			type: String,
			required: false,
			enum: ['每天', '仅今天', '仅明天','仅后天','每周几','每月几','指定时间'],
			default: '每天',
			trim:true
		},
		scriptID: {
			type: String,
			trim: true,
			required:true
		},
		status: {
			type: Boolean,
			default:false
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
		},
		startExec: {
			type: String,
			required:false
		},
		endExec: {
			type: String,
			required:false
		},
		startDuration: {
			type: String,
			required: false,
			default:'每天'
		},
		endDuration: {
			type: String,
			required:false
		},
		weather: {
			type: String,
			required:false
		}
	},
	{
		collection: 'Scripts',
		timestamps: true,
		safe: true,
		wtimeout: 10000
	}
)
Scripts.set('toJSON', { getters: true, virtuals: true })
Scripts.set('toObect', { getters: true, virtuals: true })


module.exports = mongoose.model('Scripts',Scripts)
