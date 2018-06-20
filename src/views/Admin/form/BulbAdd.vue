<template lang="pug">
el-dialog(title="增加电器" :visible="isShowAddDialog" width="28%" top="15vh" custom-class="bulb-dialog"
:before-close="handleClose" lock-scroll center append-to-body)
	el-form.bulb-add-setting(:span="24" type="flex" align="middle" justify="center" :model="bulb" label-width="100px"  center status-ico)
		el-form-item(label="ID")
			el-input(type="text" v-model.trim="bulb.id" auto-complete='on' placeholder="产品上面的 ID 号" clearable)
		el-form-item(label="备注")
			el-input(type="text" v-model.trim="bulb.name" auto-complete='on' placeholder="最多16位字符" clearable)
		el-form-item(label="状态")
			bulb-check-box.bulb-checkbox(:status.sync="bulb.status")
		el-form-item(label="亮度")
			el-slider(v-model="bulb.brightness")
		el-form-item(label="颜色")
			bulb-color-select(:color.sync="bulb.color")
	.dialog-bulb--footer(slot="footer")
		el-row(:span="24" type="flex" align="middle" justify="center")
			el-button(type="primary" @click="submitForm" v-loading.fullscreen.lock="isLoading" element-loading-text="正在增加") 增加电器
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import BulbCheckBox from '~/bulb/CheckBox'
import BulbColorSelect from '~/bulb/ColorSelect'

import { mapActions,mapState } from 'vuex'
import notice from '@/utils/ui/notice'

@Component({
	components: {
		BulbCheckBox,
		BulbColorSelect
	},
	props: {
		isShowAddDialog: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	methods: {
		...mapActions('electrics', ['addBulb'])
	}
})
export default class BulbAdd extends Vue{
	bulb={
		name:'',
		id:'',
		status:true,
		brightness:100,
		color:'自然光'
	}
	isLoading = false
	handleClose(){
		this.$emit('update:isShowAddDialog', false)
	}
	submitForm() {
		if(!this.bulb.id || this.bulb.id.length > 16){
			return notice.warning('请输入正确的产品 ID 号','错误')
		}
		if(!this.bulb.name || this.bulb.name.length > 16){
			return notice.warning('请输入正确的备注','错误')
		}
		this.isLoading = true
		this.bulb.showStatus = this.bulb.status ? '开' : '关'
		this.addBulb(this.bulb).then(e=>{
			this.isLoading = false
			if(e.success){
				notice.success(e.message,'成功')
				this.$emit('update:isShowAddDialog', false)
			}else{
				notice.error(e.message,'失败')
			}
		})
	}
}
</script>

<style lang="stylus">
</style>
