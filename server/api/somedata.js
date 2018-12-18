/**
 * @file: 测试用，上线前删除
 * @Author: liyunjiao
 * @Date:   2017-11-23 10:12:41
 * @Last Modified by:   liyunjiao
 * @Last Modified time: 2017-11-30 15:52:54
*/
/*eslint-disable*/
import express from 'express';
import request from 'request-promise';
import co from 'co';
// import request from 'request';
import data from '../mock/somedata.json';
let router = express.Router();
let uri = 'https://www.baifae.com/api/news/list.json?catid=15';
// let uri = 'http://localhost/list.php?pageNo=1&pageSize=10';
router.get('/api/somedata',async (req,res,next)=>{
    let data = {a:1};
    data =await gen();
    res.send(JSON.stringify(data));
});
// 引入async await
const gen = async function (){
    console.log(uri);
    let data = await request({
        uri,
        form:{
            size:10,
            page:1
        },
        method:'POST'
    }).then((result)=>{
        // console.log('opq');
        // res.send(result);
        return {msg:'success'};
    },(error)=>{
        // console.log('kkkk');
        // res.status(200).send('api error');
        return {msg:'api error'}
    }).catch((err)=>{
        // console.log('zzzz',err);
        // res.status(200).send('error');
        return {msg:'catch error'}
    })
    return data;
}


export default router;
