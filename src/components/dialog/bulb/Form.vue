<template lang="pug">
el-dialog(title="设置" :visible="isShowBulb" width="28%" top="15vh" custom-class="bulb-dialog"
:before-close="handleClose" lock-scroll center append-to-body)
	el-form.bulb-setting(:span="24" type="flex" align="middle" justify="center" :model="bulb" label-width="100px"  center status-ico)
		el-form-item(label="状态")
			bulb-check-box(:status.sync="bulb.status")
		el-form-item(label="备注")
			el-input(type="text" v-model.trim="bulb.name" auto-complete='on' placeholder="最多16位字符" clearable)
		el-form-item(label="亮度")
			el-slider(v-model="bulb.brightness")
		el-form-item(label="颜色")
			bulb-color-select(:color.sync="bulb.color")
	.dialog-bulb--footer(slot="footer")
		el-row(:span="24" type="flex" align="middle" justify="center")
			el-button(type="primary" @click="submitForm" v-loading.fullscreen.lock="isLoading" element-loading-text="正在更新") 更新状态
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import BulbCheckBox from '~/bulb/CheckBox'
import BulbColorSelect from '~/bulb/ColorSelect'
import { mapActions } from 'vuex'
import notice from '@/utils/ui/notice'

@Component({
	props: {
		isShowBulb: {
			type: Boolean,
			required: false,
			default: false
		},
		bulb: Object,
		index:Number
	},
	components: {
		BulbCheckBox,
		BulbColorSelect
	},
	methods: {
		...mapActions('electrics', ['updateBulb'])
	}
})
export default class BulbForm extends Vue {
	isLoading = false
	_bulb = {}
	created(){
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
		this.bulb.index = this.index
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
	.bulb-dialog {
		font-beautify();
		z-index: 99999 !important;
		box-shadow: 0 10px 50px rgb(233, 233, 233) !important;
		padding: 0.7vw 2vw 0;
		border-radius: 10px !important;
		left: 7.2%;
	}
	.dialog-bulb--footer
		margin-bottom 10px
		margin-top -10px
	.el-form-item
		margin-right 10px
	.el-form-item__label
		margin-left -15px
</style>
