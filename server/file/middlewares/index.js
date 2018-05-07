const fs = require('fs')
module.exports = app => {
  const files = fs.readdirSync(__dirname)
	for (let file of files) {
		if (file === 'index.js') { continue }
		require('./' + file)(app)
  }
}
