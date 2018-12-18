/*
* @Author: liyunjiao
* @Date:   2017-11-21 11:21:26
* @Last Modified by:   liyunjiao
* @Last Modified time: 2017-11-27 15:44:16
*/
var path = require('path');
var fs = require('fs');

var mod = {};
var dir = path.resolve(__dirname,'../client/page/');
fs.readdirSync(dir).forEach(dirname=>{
    mod[dirname] = path.resolve(__dirname,`../client/page/${dirname}/index.js`);
});

module.exports = mod;