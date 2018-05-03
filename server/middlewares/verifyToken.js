const path = require('path')
const jwt = require('jsonwebtoken')

const verifyToken = async (ctx, next) => {
	const token = ctx.header.authorization
	await jwt.verify(
		token,
		path.resolve('config/rsa_private_key.pem'),
		(err, decode) => {
			if (err) {
				//  时间失效的时候/ 伪造的token
			} else {
				// rq.decode = decode;
				console.log(decode.name) // today  is  a  good  day
				next()
			}
		}
	).catch(err => {
		
	})
}
export default verifyToken
