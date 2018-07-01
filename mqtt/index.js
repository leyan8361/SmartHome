require('module-alias/register')

const mosca = require('mosca')
const Auth = require('./auth')

const { dbUrl: url } = require('config/db')
const { localIP: host, port, clientId } = require('config/mqtt')
const log = require('utils/log')

const Server = new mosca.Server({
	port,
	host,
	backend: {
		type: 'mongo',
		url,
		pubsubCollection: 'mqtt',
		mongo: {}
	},
	persistence: {
		factory: mosca.persistence.Mongo,
		url
	},
	http: {
		bundle: true
	}
})

Server.on('ready', async () => {
	// Server.authenticate = Auth.authenticate
	// Server.authorizePublish = Auth.authorizePublish
	// Server.authorizeSubscribe = Auth.authorizeSubscribe
	log.success(`MQTT Server is Runing at ${port}`)
})

Server.on('clientConnected', client => {
	console.log('客户端连接: ', client.id)
})

Server.on('subscribed', (topic, client) => {
	console.log(`客户端订阅信息: ${topic}`)
})

Server.on('published', (packet, client) => {
	console.log(`客户端推送信息: ${packet.payload}`)
})

Server.on('clientDisconnecting', client => {
	console.log(`客户端正在断开连接: ${client}`)
})

Server.on('clientDisconnected', client => {
	console.log(`客户端已经断开连接: ${client}`)
})

Server.on('unsubscribed', (topic, client) => {
	console.log(`客户端取消订阅信息: ${client} 主题: ${topic}`)
})
