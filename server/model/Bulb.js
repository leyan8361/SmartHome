const mongoose = require('mongoose')
const Bulb = new mongoose.Schema(
	{
		ClientID: {
			type: String,
			trim: true,
			required:true
		},
		Color: {
			type: String,
			required: false,
			enum: ['暖白光', '自然光', '正白光','冷白光'],
			default: '自然光',
			trim:true
		},
		Brightness: { //亮度
			type: Number,
			required: true,
			max: 300,
			min: 0
		},
		Life: { //寿命 ，单位小时
			type: Number,
			required: false,
			min: 0,
			default:55000
		},
		Power: { //功率 3~10
			type: Number,
			required: false,
			min: 0,
			max: 15,
			default:10
		},
		Voltage: { //电压 12v、110v、220v、85v-265v
			type: Number,
			required: false,
			min: 0,
			max: 300,
			default:220

		},
		ElectricCurrent: { //电流 毫安
			type: Number,
			required: false,
			default: 20,
			min:0
		}
	},
	{
		collection: 'Bulb',
		timestamps: true,
		safe: true,
		wtimeout: 10000
	}
)
Bulb.set('toJSON', { getters: true, virtuals: true })
Bulb.set('toObect', { getters: true, virtuals: true })

module.exports = mongoose.model('Bulb', Bulb)
