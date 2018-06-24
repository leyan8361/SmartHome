const mongoose = require('mongoose')

const Family = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true
		},
		displayName: {
			type: String,
			required: false,
			trim:true
		},
		avatar: {
			type: String,
			required: false,
			trim:true
		},
		founder: {
			type: String,
			required: true,
			trim:true
		},
		admins: {
			type: [String],
			required: false
		},
		users: {
			type: [String],
			required: false
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
