<template lang="pug">
.notice-family-component
	el-tabs(v-model="familyTab")
		el-tab-pane(label="收到消息" name="receive")
			notice-panel(:data="family.receive" :un-read-news="unReadNews")
		el-tab-pane(label="发送消息" name="send")
			notice-panel(:data="family.send")
</template>

<script>
import { Component,Vue } from 'vue-property-decorator'
import { mapState,mapActions,mapMutations } from 'vuex'
import NoticePanel from '~/notice/Family'
@Component({
	computed:{
		...mapState('user',['news']),
		...mapState('notice',['family']),
		...mapState('ui',['familyTab'])
	},
	methods:{
		...mapActions('user',['newsToZero']),
		...mapMutations('ui',['setFamilyTab'])
	},
	components:{
		NoticePanel
	}
})

export default class NoticeFamily extends Vue{
	unReadNews = 0
	created(){
		this.unReadNews = this.news.family
		!!this.news.family && this.newsToZero('family')
		if(this.familyTab === 'other'){
			this.setFamilyTab('send')
		}else if(this.familyTab === 'send'){
			this.sendFamilyTab('receive')
		}
	}
}
</script>

<style lang="stylus">
.notice-family-component
	margin-top 30px
</style>
