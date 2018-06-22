import Index from '@/views/Home/Index'
import Error from '@/views/Error/404'
import Home from '@/views/Admin/Index'

import User from '@/views/Admin/pages/user/Index'
import UserModify from '@/views/Admin/pages/user/ModifyInfo'
import UserElectrics from '@/views/Admin/pages/user/Electrics'
import UserFamily from '@/views/Admin/pages/user/Family'
import UserFeedback from '@/views/Admin/pages/feedback/Index'

import FamilySearch from '@/views/Admin/pages/family/Search'
import FamilyInvite from '@/views/Admin/pages/family/Invite'

import NoticeFamily from '@/views/Admin/pages/notice/Family'
import NoticeElectric from '@/views/Admin/pages/notice/Electric'

import ElectricAdmin from '@/views/Admin/pages/electric/Admin'
import ElectricView from '@/views/Admin/pages/electric/View'

import ScriptsAdmin from '@/views/Admin/pages/scripts/Admin'
import ScriptsAdd from '@/views/Admin/pages/scripts/Add'

import WeatherInfo from '@/views/Admin/pages/weather/Index'
import WeatherForecast from '@/views/Admin/pages/weather/Forecast'

import Card from '@/views/Admin/wrap/Card'
// const Card = () =>
//   import ('@/views/Admin/pages/Index')
export default [
	{
		path: '/',
		name: 'Index',
		component: Index
	},
	{
		path: '*',
		name: '404',
		component: Error,
		meta: {
			title: '404 - 页面未找到'
		}
	},
	{
		path: '/home',
		name: 'Home',
		component: Home,
		meta: {
			title: '主页'
		},
		children: [
			{
				path: 'user',
				name: 'User',
				redirect: '/home',
				component: Card,
				children: [
					{
						path: 'profile',
						name: 'UserProfile',
						component: User,
						meta: {
							title: '我的主页'
						}
					},
					{
						path: 'modify',
						name: 'UserModify',
						component: UserModify,
						meta: {
							title: '修改信息'
						}
					},
					{
						path: 'electrics',
						name: 'UserElectrics',
						component: UserElectrics,
						meta: {
							title: '电器信息'
						}
					},
					{
						path: 'family',
						name: 'UserFamily',
						component: UserFamily,
						meta: {
							title: '家庭信息'
						}
					},
					{
						path: 'feedback',
						name: 'UserFeedback',
						component: UserFeedback,
						meta: {
							title: '意见反馈'
						}
					}
				]
			},
			{
				path: 'family',
				name: 'Family',
				redirect: '/home',
				component: Card,
				children: [
					{
						path: 'search',
						name: 'FamilySearch',
						component: FamilySearch,
						meta: {
							title: '搜索用户'
						}
					},
					{
						path: 'invite',
						name: 'FamilyInvite',
						component: FamilyInvite,
						meta: {
							title: '邀请共享'
						}
					}
				]
			},
			{
				path: 'notice',
				name: 'Notice',
				redirect: '/home',
				component: Card,
				children: [
					{
						path: 'family',
						name: 'NoticeFamily',
						component: NoticeFamily,
						meta: {
							title: '家庭消息'
						}
					},
					{
						path: 'electric',
						name: 'NoticeElectric',
						component: NoticeElectric,
						meta: {
							title: '设备消息'
						}
					}
				]
			},
			{
				path: 'electric',
				name: 'electric',
				redirect: '/home',
				component: Card,
				children: [
					{
						path: 'admin',
						name: 'ElectricAdmin',
						component: ElectricAdmin,
						meta: {
							title: '管理电器'
						}
					},
					{
						path: 'views',
						name: 'ElectricView',
						component: ElectricView,
						meta: {
							title: '设置电器'
						}
					}
				]
			},
			{
				path: 'weather',
				name: 'weather',
				redirect: '/home',
				component: Card,
				children: [
					{
						path: 'info',
						name: 'WeatherInfo',
						component: WeatherInfo,
						meta: {
							title: '天气信息'
						}
					},
					{
						path: 'forecast',
						name: 'WeatherForecast',
						component: WeatherForecast,
						meta: {
							title: '天气预报'
						}
					}
				]
			},
			{
				path: 'scripts',
				name: 'scripts',
				redirect: '/home',
				component: Card,
				children: [
					{
						path: 'admin',
						name: 'ScriptsAdmin',
						component: ScriptsAdmin,
						meta: {
							title: '管理指令'
						}
					},
					{
						path: 'add',
						name: 'ScriptsAdd',
						component: ScriptsAdd,
						meta: {
							title: '添加指令'
						}
					}
				]
			}
		]
	}
]
