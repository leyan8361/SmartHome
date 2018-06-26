const Scripts = require('model/Scripts')
const { generateTask } = require('utils/task')
const log = require('utils/log')

module.exports = async () => {
	const scripts = await Scripts.find({ disabled: false })
	if (!scripts || !scripts.length) {
		return
	}
	const syncGenerateTaskQueue = []
	scripts.forEach(script => {
		syncGenerateTaskQueue.push(generateTask(script))
	})
	await Promise.all(syncGenerateTaskQueue)
	log.success('用户指令全部开启成功')
}
