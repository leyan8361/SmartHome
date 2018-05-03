const fs = require('fs')
const mongoose = require('mongoose')
module.exports = config => {
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
		user: config.dbUser,
		pass: config.dbPass,
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
	connection.openUri(config.dbUrl, options)

	connection.once('open', () => {
		console.log('连接数据库成功 :)')
	})

	connection.on('error', () => {
		console.log('连接失败')
	})
}
