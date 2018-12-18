/**
 * @file:首页js
 * @Author: liyunjiao
 * @Date:   2017-11-21 11:09:22
 * @Last Modified by:   liyunjiao2048@163.com
 * @Last Modified time: 2018-12-18 15:06:18
*/
/*eslint-disable*/
import '../../less/home';
import $ from 'jquery';
import $post from '../../common/post';

if(window.isNotAgree){
    bindEvent();
    showDialog($dialog);
}

function bindEvent(){
    $('#btn').click(function(){
        console.log('hahahahah')
    })
}