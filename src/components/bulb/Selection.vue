<template lang="pug">
el-select.bulb-select-item(v-model="ids" placeholder="请选择" @change="selectSomeBulbs" clearable multiple )
	el-option(v-for="(item,index) in allBulbs" :key="index" :label="item.label" :value="item.value")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'

@Component({
	props:{
		bulbs:Array
	}
})
export default class BulbSelection extends Vue{
	allBulbs=[]
	ids = []
	created(){
		if(this.allBulbs && this.allBulbs.length ){
			return
		}
		this.bulbs.forEach(e=>{
			this.allBulbs.push({
				value:e.id,
				label:e.name
			})
		})
		if(this.allBulbs.length < 2){
			return
		}
		this.allBulbs.push({
			label:'全部',
			value:'0'
		})
	}
	selectSomeBulbs(){
		if(this.ids.includes('0')){
			this.ids = ['0']
		}
		this.$emit('update:ids',this.ids)
	}
}
</script>

<style lang="stylus">
.bulb-select-item
	text-shadow none
	font-weight bold
</style>
