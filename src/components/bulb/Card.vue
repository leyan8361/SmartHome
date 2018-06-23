<template lang="pug">
	el-row.set-bulb(:span="24" type="flex" align="middle" justify="center")
		.bulb
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
