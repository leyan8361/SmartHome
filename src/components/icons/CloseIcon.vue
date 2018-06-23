<template lang="pug">
.user-close(@click="$router.push({name:'Home'})"): i.el-icon-close
</template>
<style lang="stylus">
.user-close
	position absolute
	top 15px
	right 15px
	transform scale(1.2)
	text-shadow 0 0 1px #ccc
	cursor pointer
	transition .2s
	&:hover
		transform scale(1.3)
		text-shadow 0 0 2px #99
</style>
