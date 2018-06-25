const Task = require('./task')

class Tasks extends Array{
	constructor() {
		super()
	}
	async add(job, codition, duration, indentify) {
		const task = await new Task().save(job, codition, duration, indentify)
		await task.run()
		this.push(task)
		return this
	}
	runById(id) {
		this.find(t => t.id === id).run()
		return this
	}
	runAll() {
		this.forEach(t => { t.run() })
		return this
	}
	stopById(id) {
		this.find(t => t.id === id).stop()
		return this
	}
	stopAll() {
		this.forEach(t => { t.stop() })
		return this
	}
	deleteById(id) {
		this.forEach((t,i) => {
			if (t.id === id) {
				t.stop()
				this.splice(i, 1)
				t = null
			}
		})
		return this
	}
	disabledToggleById(id) {
		this.forEach(t => {
			if (t.id === id) {
				t[t.disabled ? 'run' : 'stop']()
				t.disabled = !t.disabled
			}
		})
		return this
	}
}

global.Tasks = global.Tasks || new Tasks()
