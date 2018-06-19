<template lang="pug">
el-dialog(title="状态设置" :visible="isShowSetting" width="28%" top="15vh" custom-class="bulb-dialog"
:before-close="handleClose" lock-scroll center append-to-body)
	el-form.bulb-setting(:span="24" type="flex" align="middle" justify="center" :model="bulb" label-width="100px"  center status-ico)
		el-form-item(label="状态" prop="status")
			bulb-check-box.bulb-checkbox(:status.sync="bulb.status")
		el-form-item(label="亮度" prop="brightness")
			el-slider(v-model="bulb.brightness")
		el-form-item(label="颜色" prop="color")
			el-select(v-model="bulb.color" placeholder="请选择" clearable)
				el-option(v-for="color in colors" :key="color.value" :label="color.label" :value="color.value")
		el-form-item(label="电器" prop="selectBulbs")
			el-select.bulb-select-item(v-model="bulb.selectBulbs" placeholder="请选择" @change="selectSomeBulbs" clearable multiple )
				el-option(v-for="(item,index) in allBulbs" :key="index" :label="item.label" :value="item.value")
	.dialog-bulb--footer(slot="footer")
		el-row(:span="24" type="flex" align="middle" justify="center")
			el-button.login(type="primary" @click="submitForm" v-loading.fullscreen.lock="isLoading" element-loading-text="正在更新") 更新状态
</template>

<script>
	import { Component, Vue } from 'vue-property-decorator'
	import BulbCheckBox from '~/bulb/CheckBox'
	import { mapActions,mapState } from 'vuex'
	import notice from '@/utils/ui/notice'

	@Component({
		props: {
			isShowSetting: {
				type: Boolean,
				required: false,
				default: false
			}
		},
		components: {
			BulbCheckBox
		},
		methods: {
			...mapActions('electrics', ['switchBulbs'])
		},
		computed:{
			...mapState('electrics',['bulbs'])
		}
	})
	export default class StatusSetting extends Vue {
		isLoading = false
		colors = [
			{ value: '暖白光' },
			{ value: '自然光' },
			{ value: '冷白光' },
			{ value: '正白光' }
		]
		bulb={
			selectBulbs:[],
			status:true,
			brightness:100,
			color:'自然光'
		}
		allBulbs=[]
		created(){
			if(this.allBulbs.length !== 0){
				return
			}
			this.bulbs.forEach(e=>{
				this.allBulbs.push({
					value:e.id,
					label:e.name
				})
			})
			this.allBulbs.push({
				label:'全部',
				value:'0'
			})
		}
		selectSomeBulbs(){
			if(this.bulb.selectBulbs.includes('0')){
				this.bulb.selectBulbs = ['0']
			}
		}
		handleClose() {
			this.$emit('update:isShowSetting', false)
		}

		submitForm() {
			if(this.bulb.selectBulbs.length === 0){
				return notice.warning('请选择一个电器','错误')
			}
			this.switchBulbs(this.bulb).then(e=>{
				if(e.success){
					notice.success(e.message,'成功')
					this.$emit('update:isShowSetting', false)
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
	.bulb-checkbox
		transform  translateX(-50px)
	.dialog-bulb--footer
		margin-bottom 10px
		margin-top -10px
	.el-form-item
		margin-right 10px
	.el-form-item__label
		margin-left -15px
	.bulb-select-item
		text-shadow none
		font-weight bold
</style>
