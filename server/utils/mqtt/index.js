const AsyncMQTT = require('./async-mqtt')
const { localIP, port, clientId, subscribeTopics, username, password } = require('config/mqtt')

const Client = AsyncMQTT.connect(
	`mqtt://${localIP}`,
	{
		port,
		clientId,
		username,
		password,
		will: {
			topic: 'offline',
			payload: '客户端已离线',
			qos: 1,
			retain: false
		}
	}
)

Client.on('connect', connack => {
	console.log('已连接到MQTT服务器:')
	console.log(connack)

	// Client.subscribe(subscribeTopics).then(e => {

	// }).catch(error => {
	// 	console.error('[订阅] 发生错误')
	// 	console.error(error)
	// })

	// setInterval(() => Client.publish('testMQTT', '30'), 3000)
})

Client.on('error', error => {
	console.error('发生错误')
	console.error(error)
})

Client.on('reconnect', () => {
	console.log('正在重新连接')
})

Client.on('close', () => {
	console.log('客户端已关闭')
})

Client.on('offline', () => {
	console.log('客户端已离线')
})

/* 客户端 发送任何主题时触发 */
Client.on('packetsend', packet => {
	console.log('-----------------------主题发送-------------------')
	console.info(packet)
	console.log('-----------------------发送完毕-------------------')

})

/* 客户端 收到任何主题时触发 */
Client.on('packetreceive', packet => {
	console.log('-----------------------主题接收-------------------')
	console.log(packet)
	console.log('-----------------------接收完毕-------------------')
})

Client.on('message', (topic, payload, packet) => {
	console.log('-------------------接收消息----------------------')
	console.log([topic, payload].join(': '))
	console.log('-------------------接收完毕----------------------')
})

module.exports = Client
