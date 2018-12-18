/**
* @file: 开发环境配置文件
* @Author: liyunjiao
* @Date:   2017-08-15 11:19:39
 * @Last Modified by:   liyunjiao
 * @Last Modified time: 2018-01-22 14:53:53
*/

/*eslint-disable*/
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var entryList = require('./entrys');
var hwp = require('./htmlWebpackPlugin');
const extractCSS = new ExtractTextPlugin({
    filename:'css/[name].css'
});
const extractLESS = new ExtractTextPlugin({
    filename:'css/[name].css'
});
const extractSASS = new ExtractTextPlugin({
    filename:'css/[name].css'
});
// var chunks = ['main','vendors'];
// for(var item in entryList){
//     chunks.push(item);
// }
var entry = Object.assign({},entryList,{
    main: [
        path.resolve(__dirname,'../client/partials/header.js'),
        path.resolve(__dirname, '../client/partials/mpShare.js')
    ],
    vendor:['jquery']
});

var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js'
    }),
    extractCSS,
    extractLESS,
    extractSASS
];
plugins = plugins.concat(hwp);

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: entry,
    output: {
        path: path.resolve(__dirname, '../server/dist'),
        filename: '[name].js',
        publicPath: '/',
        chunkFilename:'[name].chunk.js'
    },
    plugins: plugins,
    resolve: {
        extensions: ['.js','.less','.json','.scss']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['babel-preset-es2015']
                    }
                }
            },
            {
                test:/\.(png|jpg|gif|eot|svg|ttf|woff)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },{
                test:/\.json?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'json-loader'
                }]
            },{
                test: /\.html?$/,
                exclude: /node_modules/,
                use: ['html-loader']
            },{
                test: /\.css$/,
                use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
            }, {
                test: /\.less$/,
                use: extractLESS.extract(['css-loader','less-loader'])
            }, {
                test: /\.scss$/,
                use: extractSASS.extract(['css-loader','sass-loader'])
            }
        ]
    }
};