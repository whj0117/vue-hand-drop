const path = require("path")
const VueWebpackPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

function resolve(name){
    return path.resolve(__dirname,name)
}

module.exports = {
    module: {
        rules: [
            {
                test:/\.vue$/,
                use:['vue-loader']
            },
            {
                test:/\.(css|scss|sass)$/,
                use:['style-loader','css-loader','sass-loader']
            },
            {
                test:/\.(gif|jpg|png|PNG|JPG|svg)$/,
                loader:'file-loader',
                options:{
                    limit:1024,
                    outputPath:'images',
                    esModule:false
                }
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new VueWebpackPlugin()
    ],
    resolve:{
        alias:{
            vue$: "vue/dist/vue.esm.js",
            "@": resolve("src"),
            "@assets": resolve("src/assets")
        }
    }
}
