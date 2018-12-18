/**
* @file: 自定义弹窗
* @Author: liyunjiao
* @Date:   2017-12-20 14:53:37
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-01-16 12:07:04
*/

/*eslint-disable*/

import $ from 'jquery'
import './style';

/*
 config 参数对象
    title: 标题
    msg: 消息内容
    cancelText: 取消按钮展示文案
    submitText: 确认按钮展示文案
    type: success  warn  money
    cancelCb: 取消回调
    submitCb: 确认回调
    closeCb: 关闭回调
*/

function msgAlert(config){
    let $tpl = $(makeTpl(config));
    $('body').append($tpl);
    init(config);
    show($tpl);
}

function show($dom){
    let $cover = $('<div class="dialog-cover"></div>');
    $cover.height($(document).height());
    $('body').append($cover).addClass('body-disabled-alert');
    let sh = $(document).scrollTop();
    let wh = $(window).height();
    let ww = $(window).width();
    let ph = $dom.height();
    let pw = $dom.width();
    let pt = (wh)/2;
    let pl = (ww)/2;
    let left = ww/2 + 'px';
    // let top = (wh+sh)/2  + 'px';
    let top = sh+100+'px';
    let marginLeft = -(pw/2) + 'px';
    let marginTop = ((sh-ph)/2) + 'px';
    $dom.css({
        left,
        top,
        marginLeft
    });
    $dom.show();
}

function init(config){
    let {cancelCb,closeCb,submitCb} = config;
    cancelCb = cancelCb || function(){};
    closeCb = closeCb || function(){};
    submitCb = submitCb || function(){};
    let $close = $('.alert-msg .close');
    let $cancel = $('.alert-msg .cancel');
    let $submit = $('.alert-msg .submit');
    $close.click(e=>{
        let $win = $close.parent();
        $win.remove();
        $('.dialog-cover').remove();
        $('body').removeClass('body-disabled-alert');
        closeCb();
    })
    $cancel.click(e=>{
        let $win = $cancel.parent().parent();
        $win.remove();
        $('.dialog-cover').remove();
        $('body').removeClass('body-disabled-alert');
        return cancelCb();
    });
    $submit.click(e=>{
        let $win = $submit.parent().parent();
        $win.remove();
        $('.dialog-cover').remove();
        $('body').removeClass('body-disabled-alert');
        return submitCb();
    });
}

function makeTpl(data){
    let {title,msg,cancelText,submitText,type} = data;
    // cancelText = cancelText || '取消';
    submitText = submitText || '我知道了';
    type = type || 'success';
    let btns = `<a href="javascript:;" class="submit">${submitText}</a>`;
    if(cancelText){
        btns = `<a href="javascript:;" class="cancel">${cancelText}</a>`+btns;
    }
    return `
        <div class="alert-msg">
            <i class="close"></i>
            <div class="content">
                <div class="left">
                    <i class="flag ${type || ''}"></i>
                </div>
                <div class="right">
                    <h3>${title || ''}</h3>
                    <p>${msg || ''}</p>
                </div>
            </div>
            <div class="btn-group">${btns}</div>
        </div>
    `;
}

export default msgAlert;