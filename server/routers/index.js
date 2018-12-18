/**
 * @file: 汇总文件
 * @Author: liyunjiao
 * @Date:   2017-11-21 12:06:29
 * @Last Modified by:   liyunjiao2048@163.com
 * @Last Modified time: 2018-12-18 15:05:17
*/
/*eslint-disable*/
import about from './about';
import express from 'express';
import home from './home';
import h5show from './h5show';
let router = express.Router();
let arr = [
   home,h5show,about
];
arr.forEach((e)=>{
    router.route(e.path).all((req,res,next)=>{
        e.cb(req,res,next);
    });
});

export default router;