import AsyncMQTT from './async-mqtt'
import config from 'config/mqtt'
const { localIP, port, clientId, subscribeTopics, username, password } = config

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
	console.log(`已连接到MQTT服务器: ${connack}`)

	Client.subscribe(subscribeTopics).then(e => {

	}).catch(error => {
		console.error('[订阅] 发生错误')
		})

	// setInterval(() => Client.publish('testMQTT', '30'), 3000)
})

Client.on('error', error => {
	console.error(`发生错误：${error}`)
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
	console.log(`主题发送：${packet}`)
})

/* 客户端 收到任何主题时触发 */
Client.on('packetreceive', packet => {
	console.log(`主题接收：${packet}`)
})

Client.on('message', (topic, payload, packet) => {
	console.log('-------------------接收消息----------------------')
	console.log([topic, payload].join(': '))
	console.log('-------------------接收完毕----------------------')
})
