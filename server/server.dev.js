/*
 * @file: 开发环境服务器配置
 * @Author: liyunjiao
 * @Date:   2017-11-21 11:31:47
 * @Last Modified by: wangjie19
 * @Last Modified time: 2018-04-08 11:54:40
*/
/*eslint-disable*/
import webpack from 'webpack';
import devConfig from '../config/webpack.config.dev';
import cookieParser from 'cookie-parser';
import express from 'express';
import router from './routers';
import verify from './middleware/verify';
import download from './middleware/download';
import * as path from 'path';
import * as url from 'url';
import reload from 'reload';
import api from './api/somedata';
import apis from './api';
// import verifyProtocol from './middleware/verifyProtocol';
import receiver from './middleware/receiver';
import bodyParser from 'body-parser';
// 引入模板引擎
import * as ejs from 'ejs';
import fs from 'fs';
import http from 'http';
import https from 'https';
// 引入请求限制
import limit from './middleware/limit';
let app = express();

webpack(devConfig,(err,state)=>{
    if(err){
        console.log(err);
    } else {
        reload(app)
        console.log('complete')
    }
});
// 引用cookie
app.use(cookieParser());
// 使用模板引擎
app.set('views',path.join(__dirname,'./views/dev/'));
app.engine('.html',ejs.__express);
app.set('view engine','html');

app.disable('etag');
// 设置请求限制
app.enable('trust proxy');
app.use(limit.apiList,limit.apiLimiter);
// app 设置
// app.set('routing',true);
// 使用静态资源中间件，配置静态资源路径
app.use(express.static(path.resolve(__dirname,'./dist'),{
    etag:false
}));
app.use(express.static(path.resolve(__dirname,'./library/layui')));
app.use(express.static(path.resolve(__dirname,'./asset')));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

let httpServer = http.createServer(app);

const PORT = 3637;
// const SSL = 8088;
// http服务
httpServer.listen(PORT,'0.0.0.0',()=>{
    console.log(`http server is running on ${PORT}`);
});
// https 服务
// let httpsServer = https.createServer(cdls,app);
// httpsServer.listen(SSL,()=>{
//     console.log(`https server is running on ${SSL}`);
// })

// 全局身份校验
app.use(verify);
// 下载设置
app.use(download);
// 加载路由
app.use(router);

app.use(apis);
// test
app.use(api);
// 回调接收
app.use(receiver);
// 404 统一处理
app.use((req,res,next)=>{
    if(req.path!=='/reload/reload.js'){
        res.status(404);
        res.render('error',{});
    } else {
        next();
    }
});
// 服务器错误处理
app.use((err,req,res,next)=>{
    console.log(err,'500')
    res.status(err.status || 500);
    res.render('error',{});
});

