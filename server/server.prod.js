/**
* @file: 生产环境配置
* @Author: liyunjiao
* @Date:   2017-11-24 14:40:48
 * @Last Modified by:   liyunjiao
 * @Last Modified time: 2018-04-02 16:22:49
*/
/*eslint-disable*/
import webpack from 'webpack';
import prodConfig from '../config/webpack.config.prod';
import cookieParser from 'cookie-parser';
import express from 'express';
import router from './routers';
import * as path from 'path';
import * as url from 'url';
import reload from 'reload';
import httpApi from './api/http';
import bodyParser from 'body-parser';
import compression from 'compression';
import apis from './api';
// import verifyProtocol from './middleware/verifyProtocol';
import receiver from './middleware/receiver';
import verify from './middleware/verify';
import download from './middleware/download';
// 引入模板引擎
import * as ejs from 'ejs';
import * as fs from 'fs';
import http from 'http';
// 日志记录
import log4js from 'log4js';
import logger from './middleware/logger';
// 引入请求限制
import limit from './middleware/limit';

let app = express();
// 使用gzip压缩
app.use(compression());

// 日志记录

// console.log = logger.info.bind(logger);
// app.use(log4js.connectLogger(logger, { level: 'ALL' }));
// let logDir = path.join(__dirname, '../log');
// fs.existsSync(logDir) || fs.mkdirSync(logDir);
// let accessLog = FSR.getStream({
//     date_format:'YYYY-MM-DD',
//     filename: path.resolve(logDir,'trust-%DATE%.log'),
//     frequency:'daily',
//     verbose:false
// });
// app.use(morgan("combined",{
//     stream:accessLog,
//     skip: function (req, res) { 
//         return res.statusCode < 400; 
//     }
// }));
// console.log = logger.info.bind(logger);
// app.use(log4js.connectLogger(logger, { level: 'ALL' }));
console.log('waiting for webpack....');
// webpack打包
webpack(prodConfig,(err,state)=>{
    if(err){
        console.log(err);
    } else {
        console.log('webpack complete');
    }
});
// 使用模板引擎
app.set('views',path.join(__dirname,'./views/dev/'));
app.engine('.html',ejs.__express);
app.set('view engine','html');
// 设置请求限制
app.enable('trust proxy');
app.use(limit.apiList,limit.apiLimiter);
// app 设置
// app.set('routing',true);
// 使用静态资源中间件，配置静态资源路径
app.use(express.static(path.resolve(__dirname,'./dist')));
app.use(express.static(path.resolve(__dirname,'./library/layui')));
app.use(express.static(path.resolve(__dirname,'./asset')));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

let httpServer = http.createServer(app);

const PORT = 8080;

httpServer.listen(PORT);

// 全局身份校验
app.use(verify);
// 下载设置
app.use(download);
// 加载路由
app.use(router);

app.use(apis);
// 回调接收
app.use(receiver);
// 404 统一处理
app.use((req,res,next)=>{
    if(req.path!=='/reload/reload.js'){
        res.status(404);
        res.render('error',{
            login:res.locals.pass
        });
    } else {
        next();
    }
});
// 服务器错误处理
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status || 500);
    res.render('error',{
        login:res.locals.pass
    });
});
