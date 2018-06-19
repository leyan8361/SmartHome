<template lang="pug">
el-dialog(title="增加电器" :visible="isShowAddDialog" width="28%" top="15vh" custom-class="bulb-dialog"
:before-close="handleClose" lock-scroll center append-to-body)
	el-form.bulb-add-setting(:span="24" type="flex" align="middle" justify="center" :model="bulb" label-width="100px"  center status-ico)
		el-form-item(label="ID" prop="id")
			el-input(type="text" v-model.trim="bulb.id" auto-complete='on' placeholder="产品上面的 ID 号" clearable)
		el-form-item(label="昵称" prop="name")
			el-input(type="text" v-model.trim="bulb.name" auto-complete='on' placeholder="最多16位字符" clearable)
		el-form-item(label="状态" prop="status")
			bulb-check-box.bulb-checkbox(:status.sync="bulb.status")
		el-form-item(label="亮度" prop="brightness")
			el-slider(v-model="bulb.brightness")
		el-form-item(label="颜色" prop="color")
			el-select(v-model="bulb.color" placeholder="请选择" clearable)
				el-option(v-for="color in colors" :key="color.value" :label="color.label" :value="color.value")
	.dialog-bulb--footer(slot="footer")
		el-row(:span="24" type="flex" align="middle" justify="center")
			el-button.login(type="primary" @click="submitForm" v-loading.fullscreen.lock="isLoading" element-loading-text="正在增加") 增加电器
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import BulbCheckBox from '~/bulb/CheckBox'

import { mapActions } from 'vuex'
import notice from '@/utils/ui/notice'

@Component({
	components: {
		BulbCheckBox
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
	colors = [
		{ value: '暖白光' },
		{ value: '自然光' },
		{ value: '冷白光' },
		{ value: '正白光' }
	]
	isLoading = false
	handleClose() {
		this.$emit('update:isShowAddDialog', false)
	}
	submitForm() {
		if(!this.bulb.name || this.bulb.name.length > 16){
			return notice.warning('请输入正确的备注','错误')
		}
		if(!this.bulb.id || this.bulb.id.length > 16){
			return notice.warning('请输入正确的产品 ID 号','错误')
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
