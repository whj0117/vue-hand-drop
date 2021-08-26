const {merge} = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')

function resolve(name) {
    return path.join(__dirname, name)
}

module.exports = merge(common, {
    mode: 'production',
    devtool: 'inline-source-map',
    entry: ["babel-polyfill", "./src/component/index.js"],
    output: {
        path: resolve('lib'),
        filename: 'js/vueHandDrop.js',
        library: 'vueHandDrop.js',
        libraryTarget: 'umd'
    }
})
