const config = require('../../config/db.json')

const fs = require('fs')
const mongoose = require('mongoose')
const log = require('../utils/log')
module.exports = () => {
	mongoose.set('debug', (coll, method, query, doc, options) => {
		let logs = {
			collection: coll,
			method: method,
			query: query,
			doc: doc,
			options: options
		}
		console.log(logs)
	})
	mongoose.Promise = global.Promise
	const options = {
		user: config.user,
		pass: config.password,
		autoIndex: false,
		autoReconnect: true,
		reconnectTries: 10,
		reconnectInterval: 500,
		poolSize: 5,
		connectTimeoutMS: 1000,
		keepAlive: true,
		bufferMaxEntries: 0
	}
	const connection = mongoose.connection
	connection.openUri(config.url + config.db, options)

	connection.once('open', () => {
		log.success('数据库连接成功 :)')
	})

	connection.on('error', () => {
		log.error('数据库连接失败 :(')
	})
}
