<template lang="pug">
	.ar
		.ar__overlay(v-if="isUploading")
		.ar-spinner(v-if="isUploading")
			.ar-spinner__dot
			.ar-spinner__dot
			.ar-spinner__dot

		.ar-content(:class="{'ar__blur': isUploading}")
			.ar-recorder
				icon-button(
					class="ar-icon ar-icon__lg"
					:name="iconButtonType"
					:class="{ 'ar-icon--rec': isRecording, 'ar-icon--pulse': isRecording && volume > 0.02 }"
					@click.native="toggleRecorder")
				el-tooltip(content='上传语音')
					icon-button(
						class="ar-icon ar-icon__sm ar-recorder__stop"
						name="save"
						@click.native="stopRecorder")

			.ar-recorder__duration(v-text="recordedTime")

			div(:class="uploadStatusClasses" v-if="uploadStatus")
				| {{uploadStatus==='success'?'指令发布成功':'指令发布失败'}}
</template>

<script>
  import IconButton from './components/IconButton'
  import Recorder from './lib/recorder'
  import { convertTimeMMSS } from './lib/utils'
	import notice from '@/utils/ui/notice'

	import { Component, Vue } from 'vue-property-decorator'
	import { mapActions } from 'vuex'

	@Component({
		components: {
      IconButton
    },
		computed: {

      iconButtonType () {
        return this.isRecording && this.isPause ? 'mic' : this.isRecording ? 'pause' : 'mic'
      },
      isPause () {
        return this.recorder.isPause
      },
      isRecording () {
        return this.recorder.isRecording
			},

      recordedTime () {
        return convertTimeMMSS(this.recorder.duration)
      },
      uploadStatusClasses () {
        const classes = ['ar__upload-status']
        classes.push(this.uploadStatus === 'success' ? 'ar__upload-status--success' : 'ar__upload-status--fail')
        return classes.join(' ')
      },
      volume () {
        return Number.parseFloat(this.recorder.volume)
      }
		},
		methods: {
			...mapActions('audio', ['sendAudio'])
		}
	})
	export default class Recoder extends Vue {
		recorder = new Recorder()
		isUploading = false
		uploadStatus = null

		toggleRecorder () {

			if (!this.isRecording || this.isRecording && this.isPause) {
				this.recorder.start()
			} else {
				this.recorder.pause()
			}
		}
		stopRecorder () {
			if(!this.isRecording){
				return notice.warning('请先录制语音！')
			}

			if (Number.parseInt(this.recordedTime.split(':')[0]) >= 1){
				this.recorder.stop()
				return notice.warning('录制时间不能大于一分钟！')
			}
			this.recorder.stop()
			this.uploadRecorder(this.recorder.record)
		}

		uploadRecorder(record){

			this.onStartUpload()

			const reader = new FileReader()
			reader.readAsDataURL(record.blob)
			reader.onloadend = () => {
				const audio = reader.result

				this.sendAudio({audio}).then(e=>{
					this.onEndUpload(e.success)
					notice.success('指令发布成功','成功')
				}).catch(e=>{
					this.onEndUpload(false)
				})
			}
		}

		onStartUpload () {
			this.isUploading = true
		}
		onEndUpload (status) {
			this.isUploading = false
			this.uploadStatus = status ? 'success' : 'failure'
			setTimeout(() => {this.uploadStatus = null}, 1500)
		}
	}
</script>

<style lang="stylus">
.ar {
	width: 400px;
	font-family: 'Roboto', sans-serif;
	border-radius: 16px;
	box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.17);
	position: fixed;
	top 75%
	left 72%

	&-content {
		padding: 16px 16px 0px;
		margin-bottom -10px
		display: flex;
		flex-direction: column;
		align-items: center;
	}


	&-recorder {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;

		&__duration {
			color: #AEAEAE;
			font-size: 32px;
			font-weight: 500;
			margin-top: 20px;
			margin-bottom: 16px;
		}

		&__stop {
			position: absolute;
			top: 10px;
			right: -52px;
		}

		&__time-limit {
			position: absolute;
			color: #AEAEAE;
			font-size: 12px;
			top: 128px;
		}

		&__records-limit {
			position: absolute;
			color: #AEAEAE;
			font-size: 12px;
			top: 78px;
		}
	}

	&-spinner {
		display: flex;
		height: 30px;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 144px;
		z-index: 10;

		&__dot {
			display: block;
			margin: 0 8px;
			border-radius: 50%;
			width: 30px;
			height: 30px;
			background: #05CBCD;
			animation-name: blink;
			animation-duration: 1.4s;
			animation-iteration-count: infinite;
			animation-fill-mode: both;
		}
	}

	&:nth-child(2) {
		animation-delay: 0.2s;
	}

	&:nth-child(3) {
		animation-delay .4s {
			@keyframes blink {
				0%;
			}
		}

		opacity .2 {
			20%;
		}

		opacity 1 {
			100%;
		}

		opacity: 0.2;
	}

	&__text {
		color: rgba(84, 84, 84, 0.5);
		font-size: 16px;
	}

	&__blur {
		filter: blur(2px);
		opacity: 0.7;
	}

	&__overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 10;
	}

	&__upload-status {
		text-align: center;
		font-size: 10px;
		padding: 2px;
		letter-spacing: 1px;
		position: absolute;
		bottom: 0;

		&--success {
			color: green;
		}

		&--fail {
			color: red;
		}
	}
}

@import './style/icons';
</style>
