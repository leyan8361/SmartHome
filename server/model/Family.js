const mongoose = require('mongoose')

const Family = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim:true
		},
		account: {
			type: String,
			required: true,
			trim:true
		},
		record: {
			user: {
				type: String,
				required: true,
				trim:true
			},
			operating: {
				type: String,
				required: true,
				trim:true
			}
		}
	},
	{
		collection: 'Family',
		timestamps: true,
		safe: true,
		wtimeout: 10000
	}
)
Family.set('toJSON', { getters: true, virtuals: true })
Family.set('toObect', { getters: true, virtuals: true })


module.exports = mongoose.model('Family',Family)
