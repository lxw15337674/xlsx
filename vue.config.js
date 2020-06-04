const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin; //Webpack包文件分析器

module.exports = {
  //基本路径
  publicPath: './',
  outputDir: 'dist',
  lintOnSave: true,
  assetsDir: 'static',
  pages: undefined,
  runtimeCompiler: false,
  parallel: require('os').cpus().length > 1,
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias.set('src', path.join(__dirname, 'src'));
  },
  configureWebpack: (config) => {
    //生产and测试环境
    let pluginsPro = [
      // new CompressionPlugin({ //文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
      //     filename: '[path].gz[query]',
      //     algorithm: 'gzip',
      //     test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$', ),
      //     threshold: 8192,
      //     minRatio: 0.8,
      // }),
      //	Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
      new BundleAnalyzerPlugin(),
    ];
    //开发环境
    let pluginsDev = [
      // //移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
      // new vConsolePlugin({
      //     filter: [], // 需要过滤的入口文件
      //     enable: true // 发布代码前记得改回 false
      // }),
    ];
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
      config.plugins = [...config.plugins, ...pluginsPro];
    } else {
      // 为开发环境修改配置...
      config.plugins = [...config.plugins, ...pluginsDev];
    }
  },
  css: {
    // 启用 CSS modules
    requireModuleExtension: true,
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps，一般不建议开启
    sourceMap: false,
    // css预设器配置项
    // loaderOptions: {
    //     sass: {
    //         //设置css中引用文件的路径，引入通用使用的scss文件（如包含的@mixin）
    //         data: `
    // 		$baseUrl: "/";
    // 		@import '@/assets/scss/_common.scss';
    // 		`
    //         //data: `
    //         //$baseUrl: "/";
    //         //`
    //     }
    // }
  },
  // webpack-dev-server 相关配置 https://webpack.js.org/configuration/dev-server/
  devServer: {
    // host: 'localhost',
    // host: "0.0.0.0",
    port: 8001, // 端口号
    open: true,
    hotOnly: true, // 热更新
    compress: true,
    hot: true,
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [path.resolve(__dirname, 'src/assets/stylus/variables.styl')],
    },
  },
};
