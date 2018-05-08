module.exports = ()=> {
	let render = ctx => {
		return (msg = 'success', data = {}) => {
			ctx.set('Content-Type', 'application/json')
			ctx.body = JSON.stringify({
				success:true,
				...data,
				message: msg
			})
		}
	}
	let renderError = ctx => {
		return msg => {
			ctx.set('Content-Type', 'application/json')
			ctx.body = JSON.stringify({
				success:false,
				message: msg
			})
		}
	}
	return async (ctx, next) => {
		ctx.send = render(ctx)
		ctx.sendError = renderError(ctx)
		await next()
	}
}
