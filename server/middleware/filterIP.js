/**
 * @file 过滤ip
 * @Author wangjie19
 * @Date 2018-01-11 17:21:01
 * @Last Modified by: wangjie19
 * @Last Modified time: 2018-01-12 12:12:27
 * @description 临时用户线上测试，需要指定ip规则访问
 */

/* eslint-disable */
import express from 'express';
const router = express.Router();

/**
 * 筛选ip
 * @param {String} ip 需要检测的ip地址
 * @return {Boolean} 检测结果
 */
function filterIP(ip) {
    // 匹配172.16.0.0 - 172.31.255.255的网段
    const reg1 = /172\.([1][6-9]|[2]\d|3[01])(\.([2][0-4]\d|[2][5][0-5]|[01]?\d?\d)){2}/;
    // 匹配192.168.0.0 - 192.168.255.255的网段
    const reg2 = /192\.168(\.([2][0-4]\d|[2][5][0-5]|[01]?\d?\d)){2}/;
    // 匹配本机器
    const reg3 = /127\.0\.0\.1/;
    return reg1.test(ip) || reg2.test(ip) || reg3.test(ip);
}

// 监控所有请求非符合规则ip访问，一律返回错误数据
router.all('*', (req, res, next) => {
    const ip = req.connection.remoteAddress;
    if (!filterIP(ip)) {
        res.status(404)
            .send({
                status: 1,
                data: {
                    ip
                },
                statusInfo: 'Not authorized to visit'
            });
    }
    else {
        next();
    }
});

export default router;
