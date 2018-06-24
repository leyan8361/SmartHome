<template lang="pug">
.family-selection
	el-select.family-select-item(v-model="family" placeholder="请选择所要共享家庭" @change="selectHandle" clearable multiple )
		el-option(v-for="(item,index) in allFamily" :key="index" :label="item.label" :value="item.value")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'

@Component({
	props:{
		family:Array,
		userFamilies:Array
	}
})
export default class FamilySelection extends Vue{
	allFamily=[]
	created(){
		if(!this.userFamilies || !this.userFamilies.length){
			return
		}
		this.userFamilies.forEach(e=>{
			this.allFamily.push({
				value:e,
				label:e
			})
		})
		if(this.allFamily.length < 2){
			return
		}
		this.allFamily.push({
			label:'全部',
			value:'全部'
		})
	}
	selectHandle(){
		if(this.family.includes('全部')){
			this.family = ['全部']
		}
		this.$emit('update:family',this.family)
	}
}
</script>

<style lang="stylus">

</style>
