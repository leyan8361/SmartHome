require('module-alias/register')
const log = require('utils/log')

const schedule = require('node-schedule')
const judgeConsumption = require('./judge')

module.exports = async () => {
	await schedule.scheduleJob('0 0 0 * * *', judgeConsumption)
	log.success('统计电量功能开启成功')
}
