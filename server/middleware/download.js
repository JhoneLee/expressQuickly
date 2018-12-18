/**
* @file: 下载请求处理中间件
* @Author: liyunjiao
* @Date:   2018-01-08 18:44:41
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-12-18 14:51:49
*/
/*eslint-disable*/
import express from 'express';
import * as path from 'path';
import fs from 'fs';
import mime from 'mime';
const router = express.Router();
router.get('/download/:filename',(req,res,next)=>{
    let {filename} = req.params;
    try{
        if(pathTable[filename]){
            let fn = pathTable[filename];
            let file = path.resolve(__dirname,`../download/${fn}`);
            let mimetype = mime.lookup(file);
            res.setHeader('Content-disposition', 'attachment; filename=' + encodeURIComponent(fn));
            res.setHeader('Content-type', mimetype);
            let filestream = fs.createReadStream(file);
            filestream.pipe(res);
        } else {
            res.status(404);
            next();
        }
    } catch(e){
        next(e);
    }
});

let pathTable = {
    'template':'xxxxx.pdf'
}
export default router;