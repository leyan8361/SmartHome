<template lang="pug">
.share-component
	el-row.share-title(:span="24" type="flex" align="middle" justify="center")
		| 分享列表
	ul.share-list
		li(v-for="(way,index) in Object.keys(shareList)" :key="index")
			el-tooltip(:content="`分享到${shareList[way].title}`")
				a(:class="way" target="_blank" :href="shareList[way].link" :data-title="shareList[way].title")
					icon-svg(:name="shareList[way].icon" size="1.5")
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import {website,title,describe} from 'config/share'

@Component
export default class SocialSharing extends Vue {
	title = '智能家居管理系统'
	website = 'https://tomotoes.com'
	shareList = {
		weibo: {
			link: `http://service.weibo.com/share/share.php?url=${website}&title=${title}`,
			icon: 'weibo1',
			title:'微博'
		},
		qq:{
			link:`http://connect.qq.com/widget/shareqq/index.html?url=${website}&title=${title}&source=${describe}`,
			icon:'qq',
			title:'QQ'
		},
		facebook:{
			link:`https://www.facebook.com/sharer/sharer.php?u=${website}`,
			icon:'facebook1',
			title:'Facebook'
		},
		twitter:{
			link:`https://twitter.com/intent/tweet?text=${title}&url=${website}&via=${website}`,
			icon:'twitter',
			title:'Twitter'
		},
		google:{
			link:`https://plus.google.com/share?url=${website}`,
			icon:'google',
			title:'Google+'
		}
	}
}
</script>

<style lang="stylus">
color-weibo = #e6162d
color-qq =  #3d95d5
color-facebook = #4862a3
color-twitter = #55acee
color-google-plus = #db4437
.share-component
	font-beautify()
	.share-title
		margin-bottom 10px
	li
		list-style-type none !important
		display inline-block
	a
		color #fff
		display inline-block
		margin 2px 5px
		border-radius 4px
		box-shadow 2px 1px 5px #ccc
		transition .3s
		font-size 1.2em
		&:hover
			transform scale(1.2) translateY(-3px)
			box-shadow 2px 1px 10px #ccc
	.weibo
		background color-weibo
	.qq
		background color-qq
	.facebook
		background color-facebook
	.twitter
		background color-twitter
	.google
		background color-google-plus
</style>
