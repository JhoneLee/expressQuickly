/**
* @file: 限制提交次数
* @Author: liyunjiao
* @Date:   2017-12-22 11:24:39
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-12-18 14:51:51
*/

/*eslint-disable*/
import rateLimit from 'express-rate-limit';
let apiLimiter = new rateLimit({
    delayMs:0,
    windowMs:3*1000, // 内存中记录请求ip的时长 单位ms
    max:1, //在记录时长内的最大请求
    statusCode:200,
    message:JSON.stringify({
        status:6,
        data:{},
        statusInfo:'请求次数过多，请稍后再试'
    })
});


export default {
    apiLimiter,
    apiList
}