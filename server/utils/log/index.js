const chalk = require('chalk')
const logObj = (function() {
	const { log } = console

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

  const isDebug = process.execArgv[0] && process.execArgv[0].includes('inspect',5)
  const toLog = isDebug ? () => text => text : function(){return this.func}

	return logs.reduce((_log,e) => {
		_log[e.type] = text => { log(toLog.call(e).call(null, text)) }
		return _log
	}, {})
}())

module.exports = logObj
