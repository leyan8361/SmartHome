require('module-alias/register')
const config = require('config/bulb')
const fs = require('fs')

const JudgeModel = (x)=>config.life - x

const data = {
	usedTime:[],
	remainingLife:[]
}

for(let i = 0;i < 10;++i){
	// const num = Math.floor(1 + Math.random() * 10000)
	const num = i

	data.usedTime.push(num)
	data.remainingLife.push(JudgeModel(num))
}

fs.writeFileSync('./data.json',JSON.stringify(data))
