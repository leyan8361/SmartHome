<template lang="pug">
.family-selection
	el-tooltip(content="被禁用的选项代表对方已在该家庭" :disabled="!hasConflict()")
		el-select.family-selection(v-model="family" placeholder="请选择所要共享家庭" @change="$emit('update:family',family)" clearable multiple )
			el-option.family-selection-item(v-for="(item,index) in allFamily" :key="index" :label="item.label" :value="item.value" :disabled="item.hasExisted")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'

@Component({
	props:{
		family:Array,
		userFamilies:Array,
		otherUserFamilies:{
			type:Array,
			default:[]
		}
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
				label:e.displayName,
				hasExisted: !!this.otherUserFamilies.find(o=>o.name === e.name)
			})
		})
	}
	hasConflict(){
		return new Set([...this.userFamilies,...this.otherUserFamilies]).size !== this.userFamilies.length + this.otherUserFamilies
	}
}
</script>

<style lang="stylus">
.family-selection-item
	width 240px
</style>
