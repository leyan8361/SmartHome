const path = require('path')
const mongoose = require('mongoose')

const Furniture = new mongoose.Schema(
	{
		name: String
	},
	{
		collection: 'Furniture'
	}
)

module.exports = mongoose.model('Furniture', Furniture)
