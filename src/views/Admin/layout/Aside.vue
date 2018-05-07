<template lang="pug">
el-aside
	el-menu(:default-openeds="['1','3']")
		el-submenu(index="1")
			template(slot="title")
				i.el-icon-message
				| 导航一
			el-menu-item-group(title="分组一")
				el-menu-item(index="1-1") 选项1
				el-menu-item(index="1-2") 选项2
			el-menu-item-group(title="分组二")
				el-menu-item(index="1-3") 选项3
			el-submenu(index="1-4")
				template(slot="title") 选项4
				el-menu-item(index="1-4-1") 选项4-1
		el-submenu(index="2")
			template(slot="title")
				i.el-icon-menu
				| 导航二
			el-menu-item-group
				template(slot="title") 分组一
				el-menu-item(index="2-1") 选项一
				el-menu-item(index="2-2") 选项二
			el-menu-item-group(title="分组2")
				el-menu-item(index="2-3") 选项3
			el-submenu(index="2-4")
				template(slot="title") 选项4
				el-menu-item(index="2-4-1") 选项4-1

</template>

<script>
import {Component,Vue} from 'vue-property-decorator'

@Component
export default class Aside extends Vue{

}
</script>

<style lang="stylus">

</style>
