/**
* @file: 打包插件
* @Author: liyunjiao
* @Date:   2017-11-21 11:20:28
 * @Last Modified by: wangjie19
 * @Last Modified time: 2018-01-15 15:56:16
*/
/*eslint-disable*/
var fs = require('fs');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var dir = path.resolve(__dirname,'../server/views/tpl/');
var plugins = [];
fs.readdirSync(dir).forEach(filename=>{
    var name = filename.split('.')[0];
    var conf = {
        title:'trust',
        filename: `../views/dev/${name}.html`,
        template:`./server/views/tpl/${filename}`,
        favicon: path.resolve(__dirname, '../favicon.ico'),
        minify: {
            removeComments: true,
            collapseWhitespace: false
        },
        chunks:['vendor','main',name]
    }
    plugins.push(new htmlWebpackPlugin(conf));
});
module.exports = plugins;