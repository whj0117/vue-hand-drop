const {merge} = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(name) {
    return path.join(__dirname, name)
}

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: ["babel-polyfill", "./src/main.js"],
    devServer: {
        useLocalIp: true,
        host: '0.0.0.0',
        hot: true,
        contentBase: path.join(__dirname, 'dist'),
        port: 8090,
        open: true,
    },
    output: {
        path: resolve('dist'),
        filename: 'index.js',
        library: 'index.js',
        libraryTarget: 'umd'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        })
    ]
})
