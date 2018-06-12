<template lang="pug">
el-dialog(title="设置" :visible="isShowBulb" width="28%" top="15vh" custom-class="bulb-dialog"
:before-close="handleClose" @open="Init" lock-scroll center append-to-body)
	el-form.bulb-setting(:span="24" type="flex" align="middle" justify="center" :model="bulb" label-width="100px"  center status-ico)
		el-form-item(label="状态" prop="status")
			bulb-check-box.bulb-checkbox(:status.sync="bulb.status")
		el-form-item(label="昵称" prop="name")
			el-input(type="text" v-model.trim="bulb.name" auto-complete='on' placeholder="最多16位字符" clearable)
		el-form-item(label="亮度" prop="brightness")
			el-slider(v-model="bulb.brightness")
		el-form-item(label="颜色" prop="color")
			el-select(v-model="bulb.color" placeholder="请选择" clearable)
				el-option(v-for="color in colors" :key="color.value" :label="color.label" :value="color.value")
	.dialog-bulb--footer(slot="footer")
		el-row(:span="24" type="flex" align="middle" justify="center")
			el-button.login(type="primary" @click="submitForm" v-loading.fullscreen.lock="isLoading" element-loading-text="正在更新") 更新状态
</template>

<script>
	import { Component, Vue } from 'vue-property-decorator'
	import BulbCheckBox from '~/bulb/CheckBox'
	import { mapActions } from 'vuex'
	import notice from '@/utils/ui/notice'

	@Component({
		props: {
			isShowBulb: {
				type: Boolean,
				required: false,
				default: false
			},
			bulb: Object
		},
		components: {
			BulbCheckBox
		},
		methods: {
			...mapActions('electrics', ['updateBulb'])
		}
	})
	export default class BulbForm extends Vue {
		isLoading = false
		colors = [
			{ value: '暖白光', label: '暖白光' },
			{ value: '自然光', label: '自然光' },
			{ value: '冷白光', label: '冷白光' },
			{ value: '正白光', label: '正白光' }
		]
		_bulb = {}
		Init(){
			this._bulb = JSON.parse(JSON.stringify(this.bulb))
		}
		handleClose() {
			this.$emit('update:isShowBulb', false)
			this.$emit('update:bulb',this._bulb)
		}

		submitForm() {
			!this.bulb.name && (this.bulb.name = this._bulb.name)
			if(JSON.stringify(this.bulb) === JSON.stringify(this._bulb)){
				return
			}
			this.isLoading = true
			this.updateBulb(this.bulb).then(e=>{
				this.isLoading = false
				if(e.success){
					notice.success(e.message,'成功')
					this._bulb = JSON.parse(JSON.stringify(this.bulb))
					this.$emit('update:isShowBulb', false)
				}else{
					notice.error(e.message,'失败')
				}
			})
		}
	}
</script>

<style lang="stylus">
	@import '../../../assets/css/func.styl';

	.bulb-dialog {
		font-beautify();
		z-index: 99999 !important;
		box-shadow: 0 10px 50px rgb(233, 233, 233) !important;
		padding: 0.7vw 2vw 0;
		border-radius: 10px !important;
		left: 7.2%;
	}
	.bulb-checkbox
		transform  translateX(-50px)
	.dialog-bulb--footer
		margin-bottom 10px
		margin-top -10px
	.el-form-item
		margin-right 10px
	.el-form-item__label
		margin-left -15px
</style>
