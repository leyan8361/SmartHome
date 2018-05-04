const chalk = require('chalk')
const log = console.log

module.exports = {
	error(text) {
		log(chalk.bold.white.bgRed(text))
	},
	warning(text) {
		log(chalk.bold.white.bgRedBright(text))
	},
	info(text) {
		log(chalk.bold.white.bgBlue(text))
	},
	success(text) {
		log(chalk.bold.white.bgGreen(text))
	},
	debug(text) {
		log(chalk.bold.white.bgGreenBright(text))
	}
}
