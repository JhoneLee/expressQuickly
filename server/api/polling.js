/**
* @file: 请求我的消息接口
* @Author: liyunjiao
* @Date:   2018-02-27 16:38:09
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-03-06 11:32:57
*/

/*eslint-disable*/
import express from 'express';
import request from 'request-promise';
import config from './config';
import proxy from './proxy';
let {getToken} = proxy;
const router = express.Router();

let catchError = {
    status:1,
    data:{},
    statusInfo:'未知错误'
}


router.post('/trust/notice/usernotices', async (req, res) => {
    let data =await gen(req,res);
    res.status(200).send(data);
    // mock
    // let k = Math.random().toFixed(1);
    // if(k>0.5){
    //     let ran1 = Math.random().toFixed(1)*10;
    //     let ran2 = Math.random().toFixed(1)*10;
    //     res.status(200).send({
    //         "data": {
    //             "totalNums": ran2,
    //             "buyerNums": ran2,
    //             "sellerNums": 0,
    //             "needFlush": true
    //         },
    //         "statusInfo": "success",
    //         "status": 0
    //     });
    // } else {
    //     res.status(200).send({
    //         "data": {
    //             "totalNums": 4,
    //             "buyerNums": 2,
    //             "sellerNums": 2,
    //             "needFlush": false
    //         },
    //         "statusInfo": "success",
    //         "status": 0
    //     });
    // }
});

const gen = async function (req,res){
    let {uid} = res.locals.pass;
    req.body.baiduUid = uid;
    let token = await getToken();
    let data = await request({
        uri:config.serviceApi + '/trust/notice/usernotices',
        form:req.body,
        method:'POST',
        json: true,
        headers: {
            Connection: 'keep-alive',
            Authorization: token
        },
        timeout:24500
    }).then((result)=>{
        if(result.status == 0){
            return result;
        } else {
            return catchError;
        }
    },(error)=>{
        console.log('polling error',error);
        return catchError;
    }).catch((err)=>{
        console.log('polling catch error',err);
        return catchError;
    });
    return data;
}

export default router;