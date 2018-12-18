/*
* @file: 生产环境
* @Author: liyunjiao
* @Date:   2017-11-23 17:00:11
 * @Last Modified by:   liyunjiao2048@163.com
 * @Last Modified time: 2018-07-31 13:19:42
*/

/*eslint-disable*/
var path = require('path');
var os = require('os');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var entryList = require('./entrys');
var hwp = require('./htmlWebpackPlugin');
const extractCSS = new ExtractTextPlugin({
    filename:'css/[name].css'
});
const extractLESS = new ExtractTextPlugin({
    filename:'css/[name].[chunkhash:8].css'
});
// var chunks = [];
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
    new ParallelUglifyPlugin({
        workers:os.cpus().length,
        uglifyJS:{
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }
    })
];
plugins = plugins.concat(hwp);
module.exports = {
    devtool: 'cheap-module-source-map',
    entry: entry,
    output: {
        path: path.resolve(__dirname, '../server/dist'),
        filename: '[name].[chunkhash:8].js',
        publicPath: '/'
    },
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.less','.json']
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
            }
        ]
    }
};