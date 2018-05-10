const chalk = require('chalk')
const log = console.log
module.exports = (function() {

  const logs = [{
    type: 'error',
    func: chalk.bold.white.bgRed
  }, {
    type: 'warn',
    func: chalk.bold.white.bgRedBright
  }, {
    type: 'info',
    func: chalk.bold.white.bgBlue
  }, {
    type: 'success',
    func: chalk.bold.white.bgGreen
  }, {
    type: 'debug',
    func: chalk.bold.white.bgGreenBright
		}]
  const isDebug = process.execArgv[0] && process.execArgv[0].indexOf('inspect') !== -1
  const toLog = isDebug ? () => text => text : function(){return this.func}

  const result = {}
  logs.forEach(e => {
    result[e.type] = text => { log(toLog.call(e).call(null, text)) }
	})
	return result
})()
