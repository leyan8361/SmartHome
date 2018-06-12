<template lang="pug">
el-cascader.cascader(:options="CityInfo" v-model="selections" placeholder="请仔细填写地址" @change="fillAddress" change-on-select expand-trigger="click" clearable )
</template>

<script>
	import { Component, Vue, Watch} from 'vue-property-decorator'
	import CityInfo from '@/assets/js/city'

	@Component({
		props:{
			isInit:Boolean
		}
	})
	export default class CitySelect extends Vue {
		selections = []
		CityInfo = CityInfo


		@Watch('isInit')
		toInit(value, oldValue) {
			this.selections = []
		}
		fillAddress() {
			if(!this.selections[0]){return}
			const address = {
				province: this.selections[0],
				city: this.selections[1],
				county: this.selections[2]
			}

			area:
			for (let province of CityInfo) {
				if (province.value === address.province) {
					if (!address.city) {
						address.code = province.code
						break area
					} else {
						for (let city of province.children) {
							if (city.value === address.city) {
								if (!address.county) {
									address.code = city.code
									break area
								} else {
									for (let county of city.children) {
										if (county.value === address.county) {
											address.code = county.code
											break area
										}
									}
								}
							}
						}
					}
				}
			}
			this.$emit('update:address', address)
		}
	}
</script>

<style lang="stylus">
.cascader
	width 100%
</style>
