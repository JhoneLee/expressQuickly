/**
* @file: 转菊花的post
* @Author: liyunjiao
* @Date:   2017-12-22 14:48:04
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-01-15 14:50:12
*/

/*eslint-disable*/

import $ from 'jquery';
import '../less/base/loading.less';
import dialog from '../partials/alert';
import toast from '../partials/toast';
function post(config){
    let {
        data,
        url,
        success,
        fail,
        error,
        $content
    } = config;
    let $cover = $('<div class="loading-cover"><i></i></div>');
    if($content){
        $content.append($cover);
    } else {
        $cover.height($(document).height());
        $('body').append($cover).addClass('body-disabled-loading');
    }
    $.post({
        data,
        url
    }).success(res=>{
        if(typeof res == 'string'){
            res = JSON.parse(res);
        }
        $cover.remove();
        $('body').removeClass('body-disabled-loading');
        $('body').removeClass('body-disabled-dialog');
        if(res.status == 0){
            success(res);
        } else {
            if(res.status==2){
                // toast.warn(res.statusInfo);
                dialog({
                    type:'warn',
                    title:'重新登录',
                    msg:'抱歉，您的账户长期未操作，请重新登录',
                    submitText:'重新登录',
                    submitCb(){
                        window.location.href = `/login?u=${encodeURIComponent(window.location.href)}`;
                    }
                });
            } else {
                if(error){
                    error(res);
                } else {
                    toast.fail(res.statusInfo);
                }
            }
        }
    }).fail(err=>{
        if(fail){
            fail(err);
        } else {
            toast.fail('网络出现异常，请稍候重试');
        }
        $cover.remove();
        $('body').removeClass('body-disabled-loading');
    });
}

export default post;