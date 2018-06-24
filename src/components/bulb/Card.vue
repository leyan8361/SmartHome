<template lang="pug">
.bulb-card
	el-row.bulb-set(:span="24" type="flex" align="middle" justify="center")
		.bulb-svg
			bulb-svg(:bulb="bulb")
		.bulb-info
			el-row.bulb-info-name(:span="24" v-text="bulbStatus")
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import BulbSvg from '~/bulb/Svg'
@Component({
	props: {
		bulb: Object
	},
	components: {
		BulbSvg
	}
})
export default class BulbCard extends Vue {
	get bulbStatus() {
		return `${this.bulb.name}(${this.bulb.showStatus})`
	}
}
</script>

<style lang="stylus">
.bulb-svg
	margin-top 80px
.bulb-info
	font-beautify()
	position absolute
	font-size 0.9em
	color #fff
	&-name
		top 200px
</style>
