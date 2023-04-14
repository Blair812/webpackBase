
// webpack 默认只会处理js文件。处理不了其它后缀的问题件。
// 发现处理不了的文件时，会查找webpack.config.js的配置文件中的module.rules数组中是否配置了对应的loader加载器。
// css 文件先交给css-loader处理完毕。然后，再转交给style-loader。
// style-loader处理完毕之后，发现没有下一个loader了，就把结果转给webpack
// webpack 把style-loader处理的结果，合并到/dist/bundle.js中，最终生成打包好的文件

// webpack 处理不了的高级js语法(如装饰器等)，需要借助babel来处理

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const htmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html', // 源文件
    filename: './index.html' // copy到的目标位置
})

module.exports = {
    mode: 'development',
    // mode: 'production'
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/')
        },
        open: true, // 首次编译成功后自动打开浏览器
        port: 80,
        // host: '127.0.0.1'
    },
    plugins: [htmlPlugin, new CleanWebpackPlugin()],
    module: {
        rules: [
            {
                test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/, use: ['style-loader', 'css-loader']
            },
            {
                test: /\.png|gif|jpg$/, use: 'url-loader?limit=1024&outputPath=images' // 转换base64的临界值大于则不转为base6
            },
            {
                test: /\.jpeg$/, use: 'file-loader?outputPath=images'
            },
            {
                // 在配置babel-loader的时候，程序员只需要把自己的代码进行转换即可。
                test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/
            }
        ]
    },
    // 安全性考虑，发布的时候可以选择nosource-source-map 或者关闭sourceMap 
    // nosource-source-map 显示错误源码行号
    // 'eval-source-map'  开发时能看见错误行号和错误源码。
    // source-map 技能看到源代码又能看到错误行数。 不建议使用。
    devtool:  'eval-source-map', //'nosource-source-map', 、source-map
    resolve: {
        alias: {
            '@': path.join(__dirname, './src/')
        }
    }
}