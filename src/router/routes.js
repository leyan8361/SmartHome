import Index from '@/views/Home/Index'
import Error from '@/views/Error/404'
import Home from '@/views/Admin/Index'

import User from '@/views/Admin/pages/user/Index'
import UserModify from '@/views/Admin/pages/user/Modify'
import UserElectrics from '@/views/Admin/pages/user/Electrics'
import UserFamily from '@/views/Admin/pages/user/Family'
import UserSearch from '@/views/Admin/pages/user/Search'
import UserFeedback from '@/views/Admin/pages/user/Feedback'

import FamilyCreate from '@/views/Admin/pages/family/Create'
import FamilyInvite from '@/views/Admin/pages/family/Invite'
import FamilyAdmin from '@/views/Admin/pages/family/Admin'
import FamilyJoin from '@/views/Admin/pages/family/Join'
import FamilySearch from '@/views/Admin/pages/family/Search'

import NoticeFamily from '@/views/Admin/pages/notice/Family'
import NoticeUsagelog from '@/views/Admin/pages/notice/Usagelog'

import ElectricAdmin from '@/views/Admin/pages/electric/Admin'
import ElectricView from '@/views/Admin/pages/electric/View'

import ScriptsAdmin from '@/views/Admin/pages/scripts/Admin'
import ScriptsAdd from '@/views/Admin/pages/scripts/Add'

import WeatherIndex from '@/views/Admin/pages/weather/Index'
import WeatherForecast from '@/views/Admin/pages/weather/Forecast'

import Card from '@/views/Admin/wrap/Card'
// const Card = () => import ('@/views/Admin/pages/Index')

export default [
	{
		path: '/',
		name: 'Index',
		component: Index,
		meta: {
			title: 'Smart Home'
		}
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
					},
					{
						path: 'search',
						name: 'UserSearch',
						component: UserSearch,
						meta: {
							title: '邀请家人'
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
						path: 'create',
						name: 'FamilyCreate',
						component: FamilyCreate,
						meta: {
							title: '创建家庭'
						}
					},
					{
						path: 'invite',
						name: 'FamilyInvite',
						component: FamilyInvite,
						meta: {
							title: '邀请共享'
						}
					},
					{
						path: 'admin',
						name: 'FamilyAdmin',
						component: FamilyAdmin,
						meta: {
							title: '家庭管理'
						}
					},
					{
						path: 'join',
						name: 'FamilyJoin',
						component: FamilyJoin,
						meta: {
							title: '加入家庭'
						}
					},
					{
						path: 'search',
						name: 'FamilySearch',
						component: FamilySearch,
						meta: {
							title: '搜索家庭'
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
						name: 'NoticeUsagelog',
						component: NoticeUsagelog,
						meta: {
							title: '操作日志'
						}
					}

				]
			},
			{
				path: 'electric',
				name: 'Electric',
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
				name: 'Weather',
				redirect: '/home',
				component: Card,
				children: [
					{
						path: 'info',
						name: 'WeatherIndex',
						component: WeatherIndex,
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
				name: 'Scripts',
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
