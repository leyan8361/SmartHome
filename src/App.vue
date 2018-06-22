<template lang="pug">
#app
	transition(name="fade")
		router-view
	night-model
</template>
<script>
import {Component,Vue} from 'vue-property-decorator'
import NightModel from '~/element/NightModel'
@Component({
	components:{
		NightModel
	}
})
export default class App extends Vue{}
</script>
<style lang="stylus">
.fade-enter-active, .fade-leave-active
  transition opacity .5s

.fade-enter, .fade-leave-to
  opacity 0
</style>
