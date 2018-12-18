/**
* @file: 弹窗定位
* @Author: liyunjiao
* @Date:   2017-12-19 19:09:11
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-01-16 12:19:45
*/

/*eslint-disable*/
import $ from 'jquery';
function show($dom){
    let $cover = $('<div class="dialog-cover"></div>');
    $cover.height($(document).height());
    $('body').append($cover).addClass('body-disabled-dialog');
    let sh = $(document).scrollTop();
    let wh = $(window).height();
    let ww = $(window).width()+68; // 补一个padding宽度
    let ph = $dom.height();
    let pw = $dom.width();
    let pt = (wh)/2;
    let pl = (ww)/2;
    let left = ww/2 + 'px';
    //let top = (wh+sh)/2  + 'px';
    let top = sh+100 +'px';
    let marginLeft = -(pw/2) + 'px';
    let marginTop = ((sh-ph)/2) + 'px';
    $dom.css({
        left,
        top,
        marginLeft,
        //marginTop
    });
    $dom.show()
}

function init(){
    let $close = $('.dialog .close');
    let $cancel = $('.dialog .cancel');
    $close.click(e=>{
        let $win = $close.parent();
        $win.hide();
        $('.dialog-cover').remove();
        $('body').removeClass('body-disabled-dialog');
    })
    $cancel.click(e=>{
        let $win = $cancel.parent().parent().parent();
        $win.hide();
        $('.dialog-cover').remove();
        $('body').removeClass('body-disabled-dialog');
    })
}

init();
export default show;