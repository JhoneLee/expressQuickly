/*
* @file: 产品详情页
* @Author: liyunjiao
* @Date:   2017-11-22 11:44:15
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-12-18 15:03:40
*/
/*eslint-disable*/
import getDetailData from './getDetailData';
import {handleMoney} from '../../util/tools';
async function cb(req,res,next){
    res.render('detail',{
        
        data:{}
    });
}


export default {
    path:'/detail',
    cb
};