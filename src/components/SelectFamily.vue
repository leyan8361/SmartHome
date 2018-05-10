<template lang="pug">
el-select(v-model="relation" clearable placeholder="选择与您的关系" allow-create filterable no-data-text="其他家人" blur="updateShip")
	el-option(v-for="item in family" :key="item.value" :label="item.label" :value="item.value")
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SelectFamily extends Vue {
	relation = ''
	updateShip(){
		alert(1)
		this.relation && this.$emit('update:relation', relation)
	}
	family = [
		{
			value:'选项1',
			label:'亲爱的'
		},
		{
			value: '选项2',
			label: '爸爸'
		},
		{
			value: '选项3',
			label: '妈妈'
		},
		{
			value: '选项4',
			label: '儿子'
		},
		{
			value: '选项5',
			label: '女儿'
		},{
			value:'选项6',
			label:'同居密友',
		},{
			value: '选项7',
			label: '其他家人'
		}
	]
}
</script>

<style lang="stylus">
</style>
