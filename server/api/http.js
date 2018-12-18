/**
 * @file http数据请求处理脚本
 * @Author wangjie19
 * @Date 2017-11-27 17:48:23
 * @Last Modified by:   liyunjiao2048@163.com
 * @Last Modified time: 2018-12-18 14:56:29
 */

 /* eslint-disable */
import proxy from './proxy';
import conf from './config';
// 错误配置
const ERR_CODE_TEXT = {
    999: '数据正常！',
    1000: '未知错误',
    1001: '无status字段',
    1002: '无data字段',
    1003: '数据处理失败！',
    500: '服务器发生错误！',
    404: 'j请求路径不存在！',
    4001: '鉴权token计算出错',
    ECONNREFUSED: '出现通信未解析错误!'
};

/**
 * 处理服务器返回的数据以符合数据通信格式
 * @param {Object} data 服务器返回的数据
 * @returns {Object} 处理后符合数据通信格式的数据
 */
function getServerData(data) {
    // console.log('java-data:', JSON.stringify(data));
    let statusCode;
    if ('status' in data) {
        if (+data.status === 0) {
            statusCode = 999;
        } else if (+data.status === 1) {
            statusCode = 1003;
        }
    } else {
        statusCode = 1001;
        data.status = 1;
    }
    // 不存在data字段是赋data字段，以保证数据格式一致性
    if (!data.data) {
        statusCode = 1002;
        data.data = {};
    }
    return {
        status: data.status,
        data: data.data,
        // 算了,优先取后端返回的statusInfo，没有再依据逻辑构造
        statusInfo: data.statusInfo || ERR_CODE_TEXT[statusCode]
    };
}

/**
 * 处理服务器通信级别错误
 * @param {Object} err 错误信息数据
 * @returns {Object} 处理后符合数据通信格式的数据
 */
function getServerErr(err) {
    let statusCode;
    // 链接错误，类似请求一个胡乱写的请求或者后端服务器完全宕机时会发生
    if (err.code === 'ECONNREFUSED') {
        statusCode = err.code;
    }
    else {
        // 目前只处理500和404错误
        switch (err.status) {
            case 404:
                statusCode = 404;
                break;
            case 500:
                statusCode = 500;
                break;
            default:
                statusCode = 1000;
                break;
        }
    }
    return {
        status: 1,
        data: {},
        statusInfo: ERR_CODE_TEXT[statusCode]
    };
}

/**
 * 针对页面来的ajax请求转发
 * @param {Object} req http的请求数据对象 
 */
export function ajaxHttp(req) {
    return new Promise((resolve, reject) => {
        proxy.ajaxProxy(req).then(data => {
            console.log('http-success:', data);
            const newData = getServerData(data);
            // 此处还是做一个判断对于status为0的视作成功
            if (+newData.status === 0) {
                resolve(newData);
            }
            // 对于status为非0字段视作失败
            else {
                reject(newData);
            }
        }, err => {
            const errData = getServerErr(err.error);
            reject(errData);
            console.log('http-error:', err.error);
        }).catch(err => {
            // 此处promise代码也可能有异常发生因此此处catch捕获处理面的崩溃或者返回给前端的数据通信格式不符合规范
            console.log('catch-error:', err);
            reject({
                status: 1,
                data: {},
                statusInfo: '未知错误！'
            });
        })
    });
}

/**
 * 针对node对后端请求数据转发
 * @param {Object} params 后台http请求参数数据 
 */
export function templateHttp(params) {
    return new Promise((resolve, reject) => {
        //console.log('template-params:', params);
        proxy.templateProxy(params).then(data => {
            const newData = Object.assign({},getServerData(data),{
                effective:1 //是否为后端接口数据  1:是 0:否
            });
            // 还是做一个判断如果后端出现处理上的错误返回status为0，则标志成功
            if (+newData.status === 0) {
                // 正常只取data数据即可;因为status为0标志成功，不用再关心statusinfo的数据了
                resolve(newData.data);
            }
            // 还是做一个判断如果后端出现处理上的错误返回status非0，则触发reject
            else {
                reject(newData);
            }
        }, err => {
            const errData = Object.assign({},getServerErr(err),{
                effective:0, //是否为后端接口数据  1:是 0:否
                data: err
            });
            // 错误执行reject逻辑
            reject(errData);
            // params.needReject?reject(errData):resolve(errData);
        }).catch(err => {
            let obj = {
                status: 1,
                data: err,
                statusInfo: '未知错误！',
                effective: 0 //是否为后端接口数据  1:是 0:否
            };
            // 错误执行reject逻辑
            reject(errData);
            // params.needReject?reject(obj):resolve(obj);
        });
    });
}

/**
 * 请求java数据
 * @param {Object} params 后台http请求参数数据 
 */
export function getServiceData(params) {
    return new Promise((resolve,reject)=>{
        params.url = `${params.url}`; //TEST
        proxy.templateProxy(params).then(data => {
            const newData = Object.assign({},getServerData(data),{
                statusInfo: data.statusInfo,
                effective:1 //是否为后端接口数据  1:是 0:否
            });
            resolve(newData);
        }, err => {
            const errData = Object.assign({},getServerErr(err),{
                effective:0, //是否为后端接口数据  1:是 0:否
                data: err
            });
            reject(errData);
        }).catch(err => {
            let obj = {
                status: 1,
                data: err,
                statusInfo: '未知错误！',
                effective: 0 //是否为后端接口数据  1:是 0:否
            };
            reject(obj);
        });
    })
}


export default {
    ajaxHttp,
    templateHttp,
    getServiceData
};
