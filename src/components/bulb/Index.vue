<template lang="pug">
	el-row.set-bulb(:span="24" type="flex" align="middle" justify="center")
		.bulb
			bulb-svg(:bulb="bulb")
		.bulb-info
			el-row.bulb-info-name(:span="24" v-text="bulbStatus")
</template>

<script>
	import { Component, Vue } from 'vue-property-decorator'
	import BulbSvg from '~/bulb/BulbSvg'
	@Component({
		props: {
			bulb: Object
		},
		components: {
			BulbSvg
		}
	})
	export default class SetBulb extends Vue {
		get bulbStatus() {
			return `${this.bulb.name}(${this.bulb.status ? '开' : '关'})`
		}
		get bulbInfo(){
			return `
				亮度：${this.bulb.brightness}
				颜色：${this.bulb.color}
				自动模式：${this.bulb.automodel}
			`
		}
	}
</script>

<style lang="stylus">
	.bulb {
		margin-top: 80px;
	}

	.bulb-info {
		font-beautify();
		position: absolute;
		font-size: 0.9em;
		color #fff
	}

	.bulb-info-name {
		top: 200px;
	}
	.bulb-info-tip
		position absolute
</style>
