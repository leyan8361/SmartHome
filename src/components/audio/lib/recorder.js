import WavEncoder from './wav-encoder'
import { convertTimeMMSS } from './utils'

export default class {
	constructor(options = {}) {
		this.bufferSize = 4096
		this.record = null
		this.samples = []

		this.isPause = false
		this.isRecording = false

		this.duration = 0
		this.volume = 0

		this._duration = 0
		this.size = 0
	}
	reset() {
		this.isPause = false
		this.isRecording = false
		this._duration = 0
		this.duration = 0
		this.samples = []
	}

	start() {
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then(this._handleCaptured.bind(this))
			.catch(this._handleError.bind(this))
		this.isPause = false
		this.isRecording = true
	}

	stop() {
		this.exitRecord()

		const encoder = new WavEncoder({
			bufferSize: this.bufferSize,
			sampleRate: this.context.sampleRate,
			samples: this.samples
		})

		const audioBlob = encoder.getData()
		// const audioBlob = this.encodeWAV()
		const audioUrl = URL.createObjectURL(audioBlob)

		this.record = {
			blob: audioBlob,
			url: audioUrl,
			duration: convertTimeMMSS(this.duration)
		}

		this.reset()
	}

	pause() {
		this.exitRecord()
		this._duration = this.duration
		this.isPause = true
	}

	exitRecord() {
		this.stream.getTracks().forEach(track => track.stop())
		this.input.disconnect()
		this.processor.disconnect()
		this.context.close()
	}

	_handleCaptured(stream) {
		this.context = new (window.AudioContext || window.webkitAudioContext)()
		this.input = this.context.createMediaStreamSource(stream)
		this.processor = this.context.createScriptProcessor(this.bufferSize, 1, 1)
		this.duration = this._duration
		this.stream = stream

		this.inputSampleRate = this.context.sampleRate //输入采样率 默
		this.outputSampleRate = 16000
		this.inputSampleBits = 16
		this.oututSampleBits = 16

		this.processor.onaudioprocess = ev => {
			const sample = ev.inputBuffer.getChannelData(0)
			let sum = 0.0

			for (let i = 0; i < sample.length; ++i) {
				sum += sample[i] * sample[i]
			}

			this.duration =
				parseFloat(this._duration) +
				parseFloat(this.context.currentTime.toFixed(2))
			this.volume = Math.sqrt(sum / sample.length).toFixed(2)

			this.samples.push(new Float32Array(sample))
			this.size += sample.length
		}

		this.input.connect(this.processor)
		this.processor.connect(this.context.destination)
	}

	_handleError(error) {
		console.error(error)
	}
	compress() {
		let data = new Float32Array(this.size)
		let offset = 0
		for (let i = 0; i < this.samples.length; i++) {
			data.set(this.samples[i], offset)
			offset += this.samples[i].length
		}
		//压缩
		let compression = parseInt(this.inputSampleRate / this.outputSampleRate)
		let length = data.length / compression
		let result = new Float32Array(length)
		let index = 0,
			j = 0
		while (index < length) {
			result[index] = data[j]
			j += compression
			index++
		}
		return result
	}
	encodeWAV() {
		let sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate)
		let sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits)
		let bytes = this.compress()
		let dataLength = bytes.length * (sampleBits / 8)
		let buffer = new ArrayBuffer(44 + dataLength)
		let data = new DataView(buffer)

		let channelCount = 1 //单声道
		let offset = 0

		let writeString = function(str) {
			for (let i = 0; i < str.length; i++) {
				data.setUint8(offset + i, str.charCodeAt(i))
			}
		}

		// 资源交换文件标识符
		writeString('RIFF')
		offset += 4
		// 下个地址开始到文件尾总字节数,即文件大小-8
		data.setUint32(offset, 36 + dataLength, true)
		offset += 4
		// WAV文件标志
		writeString('WAVE')
		offset += 4
		// 波形格式标志
		writeString('fmt ')
		offset += 4
		// 过滤字节,一般为 0x10 = 16
		data.setUint32(offset, 16, true)
		offset += 4
		// 格式类别 (PCM形式采样数据)
		data.setUint16(offset, 1, true)
		offset += 2
		// 通道数
		data.setUint16(offset, channelCount, true)
		offset += 2
		// 采样率,每秒样本数,表示每个通道的播放速度
		data.setUint32(offset, sampleRate, true)
		offset += 4
		// 波形数据传输率 (每秒平均字节数) 单声道×每秒数据位数×每样本数据位/8
		data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true)
		offset += 4
		// 快数据调整数 采样一次占用字节数 单声道×每样本的数据位数/8
		data.setUint16(offset, channelCount * (sampleBits / 8), true)
		offset += 2
		// 每样本数据位数
		data.setUint16(offset, sampleBits, true)
		offset += 2
		// 数据标识符
		writeString('data')
		offset += 4
		// 采样数据总数,即数据总大小-44
		data.setUint32(offset, dataLength, true)
		offset += 4
		// 写入采样数据
		if (sampleBits === 8) {
			for (let i = 0; i < bytes.length; i++, offset++) {
				let s = Math.max(-1, Math.min(1, bytes[i]))
				let val = s < 0 ? s * 0x8000 : s * 0x7fff
				val = Number.parseInt(255 / (65535 / (val + 32768)))
				data.setInt8(offset, val, true)
			}
		} else {
			for (let i = 0; i < bytes.length; i++, offset += 2) {
				let s = Math.max(-1, Math.min(1, bytes[i]))
				data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true)
			}
		}
		return new Blob([data], { type: 'audio/wav' })
	}
}
