<template lang="pug">
.bulb-checkbox
	el-tooltip(:content="`${status?'已开启':'已关闭'}`")
		input.l(type="checkbox" v-model="status" @change="$emit('update:status',status)")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
@Component({
	props:{
		status:{
			type:Boolean,
			required:false,
			default:true
		}
	},
	model:{
		prop:'checked',
		event:'change'
	}
})
export default class BulbCheckBox extends Vue{}
</script>

<style lang="stylus">
.bulb-checkbox {
	text-align: center;
	transform  translateX(-50px)
}
.l {
	background-color: rgba(0,0,0,0.7);
	border-radius: 0.75em;
	box-shadow: 0.125em 0.125em 0 0.125em rgba(0,0,0,0.3) inset;
	color: #fdea7b;
	font-size: 1.2em;
	display: inline-flex;
	align-items: center;
	margin: auo;
	padding: 0.15em;
	width: 3em;
	height: 1.5em;
	transition: background-color 0.1s 0.3s ease-out, box-shadow 0.1s 0.3s ease-out;
	appearance: none;
}
.l:before, .l:after {
	content: "";
	display: block;
}
.l:before {
	background-color: #d7d7d7;
	border-radius: 50%;
	width: 1.2em;
	height: 1.2em;
	transition: background-color 0.1s 0.3s ease-out, transform 0.3s ease-out;
	z-index: 1;
}
.l:after {
	background:
		linear-gradient(transparent 50%, rgba(0,0,0,0.15) 0) 0 50% / 50% 100%,
		repeating-linear-gradient(90deg,#bbb 0,#bbb,#bbb 20%,#999 20%,#999 40%) 0 50% / 50% 100%,
		radial-gradient(circle at 50% 50%,#888 25%, transparent 26%);
	background-repeat: no-repeat;
	border: 0.25em solid transparent;
	border-left: 0.4em solid #d8d8d8;
	border-right: 0 solid transparent;
	transition: border-left-color 0.1s 0.3s ease-out, transform 0.3s ease-out;
	transform: translateX(-22.5%);
	transform-origin: 25% 50%;
	width: 1.2em;
	height: 1em;
}

.l:checked {
	background-color: rgba(0,0,0,0.45);
	box-shadow: 0.125em 0.125em 0 0.125em rgba(0,0,0,0.1) inset;
}
.l:checked:before {
	background-color: currentColor;
	transform: translateX(125%)
}
.l:checked:after {
	border-left-color: currentColor;
	transform: translateX(-2.5%) rotateY(180deg);
}
.l:focus {
	outline: 0;
}
</style>
