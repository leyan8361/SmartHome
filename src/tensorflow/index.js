const TRAINCOUNT = 300
const LEARNCOUNT = 10

import * as tf from '@tensorflow/tfjs'

import data from './data'

import { life } from 'config/bulb'

// 定义线性衰退模型
const model = tf.sequential()

// add方法添加一个图层实例
// tf.layers.dense 创建一个输入输出维度为1的层
model.add(tf.layers.dense({ units: 1, inputShape: [1] }))

// 指定损失函数和优化器
model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' })

// 模拟一些数据用以训练
const xs = tf.tensor2d(data.usedTime, [10, 1])
// // ys代表每一次的结果
const ys = tf.tensor2d(data.remainingLife, [10, 1])

//训练模型
model.fit(xs, ys, { epochs: LEARNCOUNT })

export default usedTime => {
	return model.predict(tf.tensor2d([usedTime], [1, 1]))
}
