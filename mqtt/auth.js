const AuthModel = require('model/Auth')

class Auth extends Array {
	constructor(data) {
		super(data)
	}
	getUser(clientID) {
		return this.find(e => e.clientID === clientID)
	}
	checkAuth(client, topic, tip) {
		console.log(`权限${tip}: ${client} topic: ${topic}`)
		let user = this.getUser(client.id)
		if (!user) {
			console.log('用户列表中，暂无此用户')
			return false
		}
		const topics = tip === '订阅' ? user.subscribeTopics : user.publishTopics
		if (!topics.includes(topic)) {
			console.log(`${tip}： 没有找到该主题: ${topic}`)
			return false
		}
		console.log(`${tip} : ${topic}`)
		return true
	}
	authenticate(client, username, password, callback) {
		console.log(`client： ${client} username: ${username} password:${password}`)
		const user = this.find(
			e => username === e.username && password === e.password
		)
		if (!user) {
			return console.error('用户列表中，暂无此用户')
		}
		console.log('用户验证成功')
	}
	authorizePublish(client, topic, payload, callback) {
		if (!this.checkAuth(client, topic, '发布')) {
			return
		}
		// do something...
	}
	authorizeSubscribe(client, topic, callback) {
		if (!this.checkAuth(client, topic, '订阅')) {
			return
		}
		// do something...
	}
}

module.exports = (users => new Auth(users))(AuthModel.find())
