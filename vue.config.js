const path = require('path')
module.exports = {
	configureWebpack: {
		resolve: {
			extensions: ['.vue', '.js', '.ts', '.css', '.styl','.json'],
			alias: {
				'@': path.resolve('src'),
				'~': '@/components',
				img: '@/assets/img',
				plugins: '@/plugins',
				server: path.resolve('server'),
				model: 'server/model',
				config: path.resolve('config'),
				api: 'server/api'
			}
		}
	},

	// vue-loader 选项
	// 查阅 https://vue-loader.vuejs.org/zh-cn/options.html
	// vueLoader: {},

	// 是否为生产环境构建生成 source map？
	productionSourceMap: true,

	// CSS 相关选项
	css: {
		// 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
		extract: true,

		// 是否开启 CSS source map？
		sourceMap: false,

		// 为预处理器的 loader 传递自定义选项。比如传递给
		// sass-loader 时，使用 `{ sass: { ... } }`。
		loaderOptions: {}

		// 为所有的 CSS 及其预处理文件开启 CSS Modules。
		// 这个选项不会影响 `*.vue` 文件。
		// modules: false
	},

	// 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
	// 在多核机器下会默认开启。
	parallel: require('os').cpus().length > 1,
	// 是否使用 `autoDLLPlugin` 分割供应的包？
	// 也可以是一个在 DLL 包中引入的依赖的显性的数组。
	// 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#dll-模式
	// dll: false,
	// PWA 插件的选项。
	// 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli-plugin-pwa/README.md
	pwa: {
		name: 'Smart Bulb',
		themeColor: '#2e54a5',
		msTileColor: '#00aba9'
	},

	// // 配置 webpack-dev-server 行为。
	devServer: {
		// open: process.platform === 'darwin',
		host: '127.0.0.1',
		port: 8080,
		// https: false,
		hotOnly: true,
		hot: true,
		open: true,
		// 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
		// proxy: {
		// 	'/api': {
		// 		target: 'http://127.0.0.1:3000/',
		// 		changeOrigin: true,
		// 		secure: false,
		// 	}
		// }, // string | Object
		// before: app => {
			// `app` 是一个 express 实例
		// }
	},

	// 三方插件的选项
	pluginOptions: {
		// ...
	}
}
