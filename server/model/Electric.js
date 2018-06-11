const mongoose = require('mongoose')
const Electric = new mongoose.Schema(
	{
		id: {
			type: String,
			trim: true,
			required:true
		},
		master: {
			type: String,
			trim: true,
			required:true
		},
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
		},
    autoModel:{
      type:Boolean,
      default:true,
      required:false
		},
		setting: {
			required:false
		}
	},
	{
		collection: 'Electric',
		timestamps: true,
		safe: true,
		wtimeout: 10000
	}
)
Electric.set('toJSON', { getters: true, virtuals: true })
Electric.set('toObect', { getters: true, virtuals: true })

module.exports = mongoose.model('Electric', Electric)
