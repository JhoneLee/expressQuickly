/**
* @file: toast提示
* @Author: liyunjiao
* @Date:   2018-01-04 15:40:03
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-01-16 12:11:43
*/

/*eslint-disable*/

import $ from 'jquery'
import './style';

let toast = {};

toast.success = function(msg){
    let $tpl = $(makeTpl(msg,1));
    init($tpl);
}

toast.fail = function(msg){
    let $tpl = $(makeTpl(msg,2));
    init($tpl);
}

toast.warn = function(msg){
    let $tpl = $(makeTpl(msg,3));
    init($tpl);
}

function init($tpl){
    $('body').append($tpl);
    show($tpl);
}

function show($dom){
    let sh = $(document).scrollTop();
    let wh = $(window).height();
    let ww = $(window).width();
    let ph = $dom.height();
    let pw = $dom.width();
    let pt = (wh)/2;
    let pl = (ww)/2;
    let left = ww/2 + 'px';
    console.log(pw);
    // let top = (wh+sh)/2  + 'px';
    let top = sh+10+'px';
    let marginLeft = -(pw/2) + 'px';
    let marginTop = ((sh-ph)/2) + 'px';
    // let $cover = $('<div class="dialog-cover"></div>');
    // $cover.height($(document).height());
    // $('body').append($cover).addClass('body-disabled');
    $dom.css({
        left,
        top,
        marginLeft
    });
    $dom.show();
    setTimeout(function(){
        $dom.remove();
    },3000);
}

function makeTpl(msg,type){
    return `
        <div class="toast-msg toast-type${type}">${msg}</div>
    `;
}

export default toast;
