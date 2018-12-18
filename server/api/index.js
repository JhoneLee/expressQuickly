/**
 * @file api路由总配置脚本
 * @Author wangjie19
 * @Date 2017-11-29 18:48:58
 * @Last Modified by:   liyunjiao2048@163.com
 * @Last Modified time: 2018-12-18 14:56:33
 */

 /* eslint-disable */
import express from 'express';
import contact from './contact';
import somedata from './somedata';
const router = express.Router();
const apiArr = [contact,somedata];
router.use('/api',apiArr);
export default router;
