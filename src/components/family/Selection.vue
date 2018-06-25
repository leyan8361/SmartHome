<template lang="pug">
.family-selection
	el-select.family-selection(v-model="family" placeholder="请选择所要共享家庭" @change="$emit('update:family',family)" clearable multiple )
		el-option.family-selection-item(v-for="(item,index) in allFamily" :key="index" :label="item.label" :value="item.value")
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
				value:e.name,
				label:e.displayName
			})
		})
	}
}
</script>

<style lang="stylus">
.family-selection-item
	width 240px
</style>
