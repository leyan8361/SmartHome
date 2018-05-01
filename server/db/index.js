const path = require('path')
import config from 'config'
const mongoose = require('mongoose')
mongoose.set('debug', (coll, method, query, doc, options) => {
	let set = {
		coll: coll,
		method: method,
		query: query,
		doc: doc,
		options: options
	}
	console.log(set)
})
mongoose.Promise = global.Promise

const connection = mongoose.connection
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
connection.openUri(config.dbUrl, options)

connection.once('open', () => {
	console.log('连接数据库成功 :)')
})

connection.on('error', () => {
	console.log('连接失败')
})
