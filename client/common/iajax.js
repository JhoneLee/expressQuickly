/**
 * @file ajax请求的封装
 * @Author wangjie19
 * @Date 2017-11-29 14:37:04
 * @Last Modified by: wangjie19
 * @Last Modified time: 2018-03-01 17:09:27
 * @description 希望数据格式在业务逻辑层一直保持{status: 0/1, statusInfo: '', data: {}}这样的数据格式
 *              node层初次做数据处理，此处相当于重复做了一些逻辑判断，感觉还是多次处理保险一点好
 */

 /* eslint-disable */
import $ from 'jquery';
// 错误话术配置
const ERR_CODE_TEXT = {
    1000: '发成错误，原因未知！',
    1001: '请求不存在，请检查请求路径！',
    1003: '服务器发生错误！',
    1005: '未登录，请先登陆',
    1010: '无data字段',
    1011: '无status字段',
    1012: '非数字status字段值'
};

/**
 * 成功获取服务器返回数据处理函数
 * @param {Object} ajaxResult Deferred对象
 * @param {Object} data 服务器返回的数据
 */
function success(ajaxResult, data) {
    if (+data.status === 0) {
        ajaxResult.resolve(data.data || {});
    }
    else {
        let statusCode;
        let statusInfo;
        // 这样看似多余的判断个人感觉这样可以保持前后端在状态码上节藕，比较灵活
        switch (+data.status) {
            case 1005:
                statusCode = 1005;
                break;
            default:
                statusCode = 1000;
        }
        ajaxResult.reject({
            status: 1,
            data: $.extend(
                data.data,
                {
                    code: statusCode
                }
            ),
            statusInfo: data.statusInfo || ERR_CODE_TEXT[statusCode]
        });
    }
}

/**
 * 前后台通信出现失败/错误时处理逻辑
 * @param {Object} ajaxResult Deferred对象
 * @param {*} err 响应错误数据
 */
function failure(ajaxResult, err) {
    let statusCode;
    let statusInfo;
    // 处理系统通信级别错误，但保持标准通信数据格式
    // 暂时只处理404与500错误
    switch (err.status) {
        case 404:
            statusCode = 1001;
            break;
        case 500:
            statusCode = 1003;
            break;
        default:
            statusCode = 1000;
            break;
    }
    ajaxResult.reject({
        status: 1,
        data: {
            code: statusCode
        },
        statusInfo: ERR_CODE_TEXT[statusCode]
    });
}

/**
 * 发起请求入口函数
 * @param {Object} options 请求参数数据
 * @returns {Object} Deferred对象
 */
function request(options) {
    options.method = 'POST';
    // 统一用json数据通信格式
    options.dataType = 'json';
    const ajaxLoading = $.ajax(options);
    const ajaxResult = $.Deferred();
    ajaxLoading.then(data => {
        if(typeof data == 'string'){
            data = JSON.parse(data);
        }
        success(ajaxResult, data);
    }, err => {
        // 此处错误一般为网络/服务器错误
        failure(ajaxResult, err);
    });

    return ajaxResult;
}
// 对外暴露的api
export default {
    post(uri, data) {
        let options = {};
        if(arguments.length==1){
            let {url,data} = uri;
            options = {
                url,
                data
            }
        } else {
            let url = uri;
            options = {
                url,
                data
            }
        }
        return request(options);
    }
};
