import Index from '@/views/Home/Index.vue'
import Error from '@/views/Error/404.vue'
import Home from '@/views/Admin/Index.vue'
import User from '@/views/Admin/pages/user/Index.vue'
import UserModify from '@/views/Admin/pages/user/ModifyInfo.vue'
import FamilySearch from '@/views/Admin/pages/family/Search.vue'
import FamilyInvite from '@/views/Admin/pages/family/Invite.vue'
import NoticeFamily from '@/views/Admin/pages/notice/Family.vue'
import NoticeElectric from '@/views/Admin/pages/notice/Electric.vue'
import ElectricAdmin from '@/views/Admin/pages/electric/Admin.vue'
import ElectricView from '@/views/Admin/pages/electric/View.vue'
import Card from '@/views/Admin/wrap/Card.vue'
// const Card = () =>
//   import ('@/views/Admin/pages/Index.vue')
export default [{
  path: '/',
  name: 'Index',
  component: Index
}, {
  path: '*',
  name: '404',
  component: Error,
  meta: {
    title: '404 - 页面未找到'
  }
}, {
  path: '/home',
  name: 'Home',
  component: Home,
  meta: {
    title: '主页'
  },
  children: [{
    path: 'user',
    name: 'User',
    redirect: '/home',
    component: Card,
    children: [{
      path: 'profile',
      name: 'UserProfile',
      component: User,
      meta: {
        title: '个人主页'
      }
    }, {
      path: 'modify',
      name: 'UserModify',
      component: UserModify,
      meta: {
        title: '修改信息'
      }
    }]
  }, {
    path: 'family',
    name: 'Family',
    redirect: '/home',
    component: Card,
    children: [{
      path: 'search',
      name: 'FamilySearch',
      component: FamilySearch,
      meta: {
        title: '搜索用户'
      }
    }, {
      path: 'invite',
      name: 'FamilyInvite',
      component: FamilyInvite,
      meta: {
        title: '邀请共享'
      }
    }]
  }, {
    path: 'notice',
    name: 'Notice',
    redirect: '/home',
    component: Card,
    children: [{
      path: 'family',
      name: 'NoticeFamily',
      component: NoticeFamily,
      meta: {
        title: '家庭消息'
      }
    }, {
      path: 'electric',
      name: 'NoticeElectric',
      component: NoticeElectric,
      meta: {
        title: '设备消息'
      }
    }]
		}, {
			path: 'electric',
			name:'electric',
			redirect: '/home',
			component: Card,
			children: [{
				path: 'admin',
				name: 'ElectricAdmin',
				component: ElectricAdmin,
				meta: {
					title: '管理设备'

				}
			},{
				path: 'views',
				name: 'ElectricView',
				component: ElectricView,
				meta: {
					title:'查看设备'
				}
			}]
	}]

}]
