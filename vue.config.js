const path = require('path');
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

module.exports = {
  //基本路径
  publicPath: './',
  outputDir: 'dist',
  lintOnSave: true,
  assetsDir: 'static',
  pages: undefined,
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias.set('src', path.join(__dirname, 'src')).end()

  },
  configureWebpack: (config) => {
    let definePlugin = new webpack.DefinePlugin({
      ENV: JSON.stringify(process.env.NODE_ENV),
    })
    let pro = {
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: [
              'ts-loader'
            ],
            exclude: /node_modules/,
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              'file-loader',
              {
                loader: 'image-webpack-loader',
                options: {
                  mozjpeg: { progressive: true, quality: 65 },
                  optipng: { enabled: false },
                  pngquant: { quality: [0.65, 0.90], speed: 4 },
                  gifsicle: { interlaced: false }
                },
              },
            ],
          }]
      },
      plugins: [

        definePlugin,
        // gzip
        new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$',),
          threshold: 8192,
          minRatio: 0.8,
        }),
      ],
      optimization: {
        splitChunks: {
          cacheGroups: {
            common: {
              name: 'chunk-common',
              chunks: 'initial',
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 1,
              reuseExistingChunk: true,
              enforce: true
            },
            vendors: {
              name: 'chunk-vendors',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'initial',
              priority: 2,
              reuseExistingChunk: true,
              enforce: true
            },
            elementUI: {
              name: 'chunk-elementui',
              test: /[\\/]node_modules[\\/]element-ui[\\/]/,
              chunks: 'all',
              priority: 3,
              reuseExistingChunk: true,
              enforce: true
            },
          }
        },
      },
    }
    let dev = {
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: [
              'ts-loader'
            ],
            exclude: /node_modules/,
          },
        ]
      },
      plugins: [
        definePlugin
      ]
    }

    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
      return pro
    } else {
      // 为开发环境修改配置...
      return dev
    }
  },
  css: {
    requireModuleExtension: true,
    sourceMap: false,
  },
  // webpack-dev-server 相关配置 https://webpack.js.org/configuration/dev-server/
  devServer: {
    // host: 'localhost',
    // host: "0.0.0.0",
    port: 8888, // 端口号
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
