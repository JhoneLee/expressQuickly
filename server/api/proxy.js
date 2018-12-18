/**
 * @file 透传http请求配置脚本
 * @Author wangjie19
 * @Date 2017-11-27 16:53:35
 * @Last Modified by:   liyunjiao2048@163.com
 * @Last Modified time: 2018-12-18 14:56:38
 */
/*eslint-disable*/
import request from 'request-promise';
import jwt from 'jsonwebtoken';
import config from './config';
// 秘钥匙key
const secretKey = 'abcdefg';

/**
 * 获取鉴权字符串
 * @return {Object} promise对象
 */
function getToken() {
    let token = '';
    return new Promise((resolve, reject) => {
        jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 300,
            iss: 'btst.user'
        }, secretKey, {
            algorithm: 'HS256'
        }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve('Bearer ' + token);
            }
        });
    });
    return token;
}

export default {
    // 用于页面ajax请求转发
    ajaxProxy(req) {
        return getToken().then(token => {
            let options = {
                // 联调或者线上服务器配置路径
                uri: config.serviceApi + req.url,
                // headers: req.headers,
                method: req.method,
                form: req.body,
                json: true,
                qs: req.query,
                timeout:300*1000,
                headers: {
                    Connection: 'keep-alive',
                    Authorization: token
                }
            };
            return request(options);
        }, err => {
            return Promise.reject({
                error: Object.assign({
                    status: 4001
                }, err)
            });
        });
    },
    // 用于获取渲染模版数据转发
    templateProxy(params) {
        return getToken().then(token => {
            let options = {
                // 联调或者线上服务器配置路径
                uri: config.serviceApi + params.url,
                method: 'post',
                form: params.body,
                json: true,
                qs: params.query,
                timeout:300*1000,
                headers: {
                    Connection: 'keep-alive',
                    Authorization: token
                }
            };
            return request(options);
        }, err => {
            return Promise.reject({
                error: Object.assign({
                    status: 4001
                }, err)
            });
        });
    },
    getToken
};

// export default function (req) {
//     let options = {
//         // 联调或者线上服务器配置路径
//         uri: config.domain + req.url,
//         headers: req.headers,
//         method: req.method,
//         form: req.body,
//         json: true,
//         qs: req.query
//     };
//     return request(options);
// }
