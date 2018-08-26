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
		}

		this.input.connect(this.processor)
		this.processor.connect(this.context.destination)
	}

	_handleError(error) {
		console.error(error)
	}
}
