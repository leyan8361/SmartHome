import Index from '@/views/Home/Index.vue'
import Error from '@/views/Error/404.vue'
import Home from '@/views/Admin/Index.vue'
import User from '@/views/Admin/pages/user/Index.vue'
import UserModify from '@/views/Admin/pages/user/ModifyInfo.vue'
import FamilySearch from '@/views/Admin/pages/family/Search.vue'
import FamilyInvite from '@/views/Admin/pages/family/Invite.vue'
import NoticeFamily from '@/views/Admin/pages/notice/Family.vue'
import NoticeElectric from '@/views/Admin/pages/notice/Electric.vue'
import Template from '@/views/Admin/pages/Index.vue'
export default [{
  path: '/',
  name: 'Index',
  component: Index
}, {
  path: '*',
  name: '404',
  component: Error
}, {
  path: '/home',
  name: 'Home',
  component: Home,
  children: [{
    path: 'user',
    name: 'User',
    redirect: '/home',
    component: Template,
    children: [{
      path: 'profile',
      name: 'UserProfile',
      component: User,
    }, {
      path: 'modify',
      name: 'UserModify',
      component: UserModify,
    }]
  }, {
    path: 'family',
    name: 'Family',
    redirect: '/home',
    component: Template,
    children: [{
      path: 'search',
      name: 'FamilySearch',
      component: FamilySearch,
    }, {
      path: 'invite',
      name: 'FamilyInvite',
      component: FamilyInvite
    }]
  }, {
    path: 'notice',
    name: 'Notice',
    redirect: '/home',
    component: Template,
    children: [{
      path: 'family',
      name: 'NoticeFamily',
      component: NoticeFamily,
    },{
      path: 'electric',
      name: 'NoticeElectric',
      component: NoticeElectric,
    }]
  }]

}]
