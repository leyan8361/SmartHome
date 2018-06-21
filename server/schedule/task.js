const schedule = require('node-schedule')
const log = require('utils/log')
const Duration = require('./lib/duration')
const Codition = require('./lib/codition')
const Job = require('./lib/job')

class Task{
	constructor(job,codition, duration,indentify) {
		for (let [key, value] of Object.entries(indentify)) {
			this[key] = value
		}

		this._run = schedule.scheduleJob
		this.schedules = null

		if (codition.weather && codition.weather.length > 0 && codition.startExec && codition.relation) {
			this.relation = true
			this.hour = codition.startExec.hour
			this.minute = codition.startExec.minutes
			this.second = codition.startExec.second
		}

		//如果存在天气 每15分钟需要重新解析一下
		if (codition.weather && codition.weather.length > 0) {
			this.weatherJob = schedule.scheduleJob('15 * * * *', async () => {
				this.weatherCodition = await Codition.ResolveWeather(codition.weather, this.address)
				this.runWithWeather()
			})
		}

		this.execCodition = Codition.ResolveExec(codition.startExec)

		this.durationJob = schedule.scheduleJob('0 0 0 * * *', () => {
			// '是否处在指定日期范围'
			const {start,end,specific} = duration
			if (specific && specific.start && Object.value(specific.start).length > 0) {
				this.duration = Duration.ResolveSpecific(specific)
			} else {
				this.duration = Duration.ResolveDuration(start, end)
			}
			!this.duration && this.stop()
		})

		this.job = Job.Resolve(job, this.account)
	}
	debug() {
		if (!this.codition) {
			this.message = '任务的运行条件未定义！'
		}
		if (!this.job) {
			this.message = '任务的具体工作未定义！'
		}
		if (!this.duration) {
			this.message = '任务的运行时间未定义！'
		}
		if (this.message) {
			this.disabled = true
			log.error(this.message)
		}
	}
	run() {
		this.debug()
		if (this.disabled) {
			return {message:this.message,success:false}
		}
		this.runWithWeather()
		this.runWithExec()

		this.message = `${this.id} 号任务已运行！`
		log.success(this.message)
		return {message:this.message,success:true}
	}
	runWithWeather() {
		if (!this.weatherCodition || this.weatherCodition.length === 0) {
			return
		}
		if (this.relation) {
			const time = new Date()
			if (time.getHours() < this.hour) {
				return
			}
			if (time.getHours() === this.hour && time.getMinutes() < this.minute) {
				return
			}
		}
		// 目前处于晴天或者阴天，符合运行条件，直接运行
		if (this.weatherCodition[0] === 'run') {
			this.job()
			this.weatherCodition.shift()
		}
		['sunUp', 'sunDown'].forEach(e => {
			if (this.weatherCodition[0]) {
				this.schedules[e] && this.schedules[e].cancel()
				this.schedules[e] = this._run(this.weatherCodition[0], this.job)
				this.weatherCodition.shift()
			}
		})
	}
	runWithExec() {
		if (!this.execCodition) {
			return
		}
		if (this.relation && (!this.weatherCodition || this.weatherCodition.length === 0)) {
			return
		}
		this.schedules.execTime && this.schedules.execTime.cancel()
		this.schedules.execTime = this._run(this.execCodition, this.job)
	}
	stopByTask(task) {
		if (!this.schedules) {
			this.message = '暂无运行中的任务！'
			log.error(this.message)
			return {success:false,message:this.message}
		}
		for (let [key, value] of Object.entries(this.schedules)) {
			if (key === task) {
				value.cancel()
			}
		}
		this.message = `${task} 任务暂停成功`
		log.success(this.message)
		return {message:this.message,success:true}
	}
	stop() {
		const tasks = Object.values(this.schedules)
		if (!tasks || tasks.length === 0) {
			return
		}
		tasks.forEach(task => {
			task.cancel()
		})
	}
}
