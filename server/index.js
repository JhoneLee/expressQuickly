/**
* @file: 入口
* @Author: liyunjiao
* @Date:   2017-11-21 11:09:52
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-01-15 15:12:06
*/
/*eslint-disable*/

//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//          佛祖保佑  永无BUG  永不宕机  永不崩溃 
//
require('babel-polyfill');
var br = require('babel-register');
var fs = require('fs');
var path = require('path');
br({
    "presets":["latest"]
});
let pathname = './server.run';
if(process.env.NODE_ENV == 'development'){
    pathname = './server.dev';
} else if(process.env.NODE_ENV == 'makeup'){
    pathname = './server.prod';
} else if(process.env.NODE_ENV == 'qa'){
    pathname = './server.qa';
}
console.log(process.env.NODE_ENV);
require(pathname);