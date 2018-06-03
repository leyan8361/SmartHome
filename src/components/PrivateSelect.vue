<template lang="pug">
el-tooltip(content="选中某些项后，信息将不会对外公开，为避免 被邀请进入家庭时的信息泄露" placement="bottom"  :disabled="disabled")
	el-select.private-select(v-model="selections" multiple placeholder="请选择" @change="selected")
		el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'

@Component
export default class PrivateSelect extends Vue{
	selections = ''
	disabled = false
	options = [{
		value:'avatar',
		label:'头像'
	},{
		value: 'address',
		label: '地址'
	},{
		value:'public',
		label: '全部公开'
	}]
	selected(){
		this.disabled = true
		if(this.selections.includes('public')){
			this.selections = ['public']
		}
		this.$emit('update:private',this.selections)
	}
}
</script>

<style lang="stylus">
.private-select
	width 100%
</style>
