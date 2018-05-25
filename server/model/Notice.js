const mongoose = require('mongoose')
const config = require('../../config/notice.json')
const Notice = new mongoose.Schema(
	{
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
		type: {
			type: String,
			required: true,
			enum: config.type,
			lowercase:true
		}
	},
	{
		collection: 'Notice',
		timestamps: true,
		safe: true,
		wtimeout: 10000
	}
)
Notice.set('toJSON', { getters: true, virtuals: true })
Notice.set('toObect', { getters: true, virtuals: true })


module.exports = mongoose.model('Notice',Notice)
