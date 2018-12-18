/**
* @file: 首页
* @Author: liyunjiao
* @Date:   2017-11-22 11:42:34
 * @Last Modified by:   liyunjiao2048@163.com
 * @Last Modified time: 2018-12-18 15:04:08
*/
/*eslint-disable*/
import verify from '../../util/verify';
import judgeStatus from './judgeStatus';
import {templateHttp as request} from '../../api/http';
import tableConf from './tableConf';
async function cb(req,res,next){
    res.render('home',{data:{}})
}
export default {
    path:'/',
    cb
};