<template lang="pug">
el-select(v-model="weather" placeholder="请选择触发的天气" @change="$emit('update:weather',weather)" clearable multiple)
	el-option(v-for="(item,index) in weathers" :key="index" :label="item.value" :value="item.value")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'

@Component
export default class CoditionWeather extends Vue{
	weather=[]
	weathers = [
		{value:'阴天'},
		{value:'晴天'},
		{value:'太阳下山'},
		{value:'太阳升起'}
	]
}
</script>

<style lang="stylus">

</style>
