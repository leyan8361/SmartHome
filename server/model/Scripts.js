const mongoose = require('mongoose')

const Scripts = new mongoose.Schema(
	{
		master: {
			type: String,
			required: true,
			trim:true
		},
		scriptID: {
			type: String,
			trim: true,
			required:true
		},
		disabled: {
			type: Boolean,
			default:false
		},

		address: {
			type: String,
			required: true,
			trim:true
		},

		ids: {
			type: [String],
			required: true
		},
		name:{
			type: [String],
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

		weather: {
			type: [String],
			required:false
		},
		startExec: {
			hour: {
				type: String,
				required:false
			},
			minutes: {
				type: String,
				required:false
			},
			second: {
				type: String,
				required:false
			}
		},
		relation: {
			type: Boolean,
			default:false
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
		specificDuration: {
			start: {
				year: {
					type: String,
					required:false
				},
				month: {
					type: String,
					required:false
				},
				day: {
					type: String,
					required:false
				}
			},
			end: {
				year: {
					type: String,
					required:false
				},
				month: {
					type: String,
					required:false
				},
				day: {
					type: String,
					required:false
				}
			}
		},
		showName: {
			type: String,
			trim:true
		},
		showStatus: {
			type: String,
			enum:['开','关'],
			default: '开',
			trim:true
		},
		showBrightness: {
			type: String,
			default: '100%',
			trim:true
		},
		showDuration: {
			type: String,
			trim:true
		},
		showCodition: {
			type: String,
			trim:true
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

const ScriptsModel = mongoose.models.Scripts || mongoose.model('Scripts',Scripts)
module.exports = ScriptsModel
