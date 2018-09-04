require('module-alias/register')
const fs = require('fs')

// LIFE: 平均寿命
const { life: LIFE } = require('config/bulb')

// 数据量
const DATACOUNT = 100000

/**
 * S 季节影响因子: 冬天 S = 1.1 日照短 功耗高 10月份 - 2月份
 *
 * 							 夏天 S = 0.9 日照长 功耗低 7月份 - 9月份
 *
 * T 温度 影响因子: 导电体 在接近室温的温度,良导体的电阻值,通常与温度成正比
 * 								P = U*I
 * 								P = I*I*R
 * 								经查阅 标准温度为 24度
 *
 * X 寿命 影响因子: 越旧的电器 在热功耗的损失 越大
 */

const JudgeModel = (S, T, X) => S * X * T * (LIFE - X) / LIFE

const RandomSeason = () => Math.random() < 0.5 ? 1.1 : 0.9

const RandomTemperature = () => Math.floor(Math.random() * 32)

const data = {
	remainingLife: [],
	usedTime: []
}

for (let i = 0; i < DATACOUNT; ++i) {

	const num = i

	const season = RandomSeason()
	const temperature = RandomTemperature()
	const result = JudgeModel(season, temperature, num).toFixed(2)

	data.usedTime.push(num)
	data.remainingLife.push(result)
}

fs.writeFileSync('./data.json', JSON.stringify(data))
