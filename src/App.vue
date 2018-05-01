<template lang="pug">
#app
	transition(name="fade")
		router-view
</template>
<style lang="stylus">
.fade-enter-active, .fade-leave-active
  transition opacity .5s

.fade-enter, .fade-leave-to
  opacity 0
</style>
