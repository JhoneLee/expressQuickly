/*
* @Author: liyunjiao
* @Date:   2017-11-21 12:06:46
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-12-18 15:03:49
*/

export default {
    path:'/about',
    cb(req,res){
        let {pass} = res.locals;
        res.render('about',{
            data:{}
        });
    }
};