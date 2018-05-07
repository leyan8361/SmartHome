const serve = require('koa-static')
module.exports = app => {
	const file = 'files'
	app.use(serve(file))
}
