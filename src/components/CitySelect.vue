<template lang="pug">
el-cascader.cascader(:options="CityInfo" v-model="selections" placeholder="请仔细填写地址" @change="fillAddress" change-on-select expand-trigger="click" clearable )
</template>

<script>
import { Component, Vue,Watch } from 'vue-property-decorator'
import CityInfo from '@/assets/js/city'
@Component({
	props:{
		isInit:{
			type:Boolean,
			default:false
		}
	}
})
export default class CitySelect extends Vue {
	selections = []
	CityInfo = CityInfo
	@Watch('isInit')
	toInit(value,oldValue){
		if(value){
			this.selections = []
		}
	}
	fillAddress() {
		const s = this.selections
		const data = this.CityInfo
		const address = {}
		area: for (let province in data) {
			if (data[province].value == s[0]) {
				address.province = data[province].label
				if (!s[1]) {
					break area
				}
				for (let city in data[province].children) {
					if (data[province].children[city].value == s[1]) {
						address.city = data[province].children[city].label
						if (!s[2]) {
							break area
						}
						for (let county in data[province].children[city].children) {
							if (
								data[province].children[city].children[county].value == s[2]
							) {
								address.county =
									data[province].children[city].children[county].label
								break area
							}
						}
					}
				}
			}
		}
		address && this.$emit('update:address', address)
	}
}
</script>

<style lang="stylus">
.cascader
	width 100%
</style>
