<template lang="pug">
.bulb-colorselect
	el-select(v-model="color" placeholder="请选择" @change="$emit('update:color',color)" clearable)
		el-option(v-for="color in colors" :key="color.value" :label="color.label" :value="color.value")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'

@Component({
	props:{
		color:{
			type:String,
			required:false,
			default:'自然光'
		}
	}
})
export default class BulbColorSelect extends Vue{
	colors = [
		{ value: '暖白光' },
		{ value: '自然光' },
		{ value: '冷白光' },
		{ value: '正白光' }
	]
}
</script>
