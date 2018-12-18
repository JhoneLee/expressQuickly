/**
 * @file 联系我们路由配置脚本
 * @Author wangjie19
 * @Date 2017-12-20 15:03:47
 * @Last Modified by:   liyunjiao2048@163.com
 * @Last Modified time: 2018-12-18 14:56:25
 */

/* eslint-disable */
import express from 'express';
import ihttp from './http';
const router = express.Router();

router.post('/trust/message/add', (req, res) => {
    ihttp.ajaxHttp(req).then(data => {
        res.status(200).send(data);
    }, err => {
        res.status(200).send(err);
    });
});

export default router;
