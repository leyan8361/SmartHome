const Client = mqtt.connect(
	`mqtt://${IP}`,
	{ port, clientId }
)

Client.on('connect', function() {
	Client.subscribe('light')
	setInterval(() => Client.publish('testMQTT', '30'), 3000)
})

Client.on('message', function(topic, message) {
	console.log('-------------------接收消息----------------------')
	console.log(message.toString())
	console.log(topic.toString())
	console.log('-------------------接收完毕----------------------')
})
