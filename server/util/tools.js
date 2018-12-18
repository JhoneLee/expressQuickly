/**
* @file: 工具函数
* @Author: liyunjiao
* @Date:   2017-11-29 11:15:02
 * @Last Modified by:   liyunjiao
 * @Last Modified time: 2018-01-18 13:11:10
*/
/*eslint-disable*/
import fs from 'fs';
import iconv from 'iconv-lite';
// 解析passport querystring
export function translateUri(str){
    let arr = str.split('&');
    let obj = {};
    arr.forEach((e)=>{
        let k = e.split('=');
        obj[k[0]] = k[1];
        if(k[0] == 'username' || k[0] == 'displayname'){
            try{
                obj[k[0]] = decodeURIComponent(obj[k[0]]);
            } catch(e){
                console.log('catch decode error',e);
                let str = obj[k[0]];
                str = str.replace(/%([a-zA-Z0-9]{2})/g,function(_,code){
                    return String.fromCharCode(parseInt(code,16));
                });
                let buff = new Buffer(str,'binary');
                obj[k[0]] = iconv.decode(buff,'gbk');
                console.log('success');
            }
        }
    });
    return obj;
};
// 拼装querystring
export function joinParams(params){
    let arr = [];
    for(let item in params){
        arr.push(`${item}=${params[item]}`);
    }
    return arr.join('&');
}
// 拼装url
export function getUri(uri,params){
    let reg = /\?/;
    let nu = reg.test(uri)?'&':'?';
    return `${uri}${nu}${joinParams(params)}`;
}
// 非首页登录数据获取
export function getLogin(res){
    let {displayname} = res.locals.pass;
    return {
        header:{
            login:{
                displayname
            }
        }
    }
}
// 检测文件夹是否存在
export function fsExistsSync(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}

/**
* 转换时间毫秒间隔为x小时x分钟x秒格式
* @param {Object} interval 需要计算的时间间隔(毫秒级)
* @return {string} 转换后的时间间隔字符串
*/
export function computeInterval(interval) {
    let newInterval = Math.abs(interval);
    // let days = Math.floor(newInterval / (1000 * 60 * 60 * 24));
    // let remainDay = newInterval % (1000 * 60 * 60 * 24);
    let hours = Math.floor(newInterval / (1000 * 60 * 60));
    let remainHour = newInterval % (1000 * 60 * 60);
    let minutes = Math.floor(remainHour / (1000 * 60));
    let remainMinute = newInterval % (1000 * 60);
    let seconds = Math.floor(remainMinute / 1000);
    return hours + '时' + (minutes > 9 ? minutes : ('0' + minutes)) + '分' + (seconds > 9 ? seconds : ('0' + seconds)) + '秒';
}
// 简单xor字符串加密
export function encrypto(str, xor=121, hex=9) {
    let resultList = []; 
    hex = hex <= 25 ? hex : hex % 25;
    for ( let i=0; i<str.length; i++ ) {
        let charCode = str.charCodeAt(i);
        charCode = (charCode * 1) ^ xor;
        charCode = charCode.toString(hex);
        resultList.push(charCode);
    }
    let splitStr = String.fromCharCode(hex + 97);
    let resultStr = resultList.join( splitStr );
    return resultStr;
}

// 字符串xor简单解密
export function decrypto( str, xor=121, hex=9) { 
    let strCharList = [];
    let resultList = []; 
    hex = hex <= 25 ? hex : hex % 25;
    let splitStr = String.fromCharCode(hex + 97);
    strCharList = str.split(splitStr);
    for ( let i=0; i<strCharList.length; i++ ) {
        let charCode = parseInt(strCharList[i], hex);
        charCode = (charCode * 1) ^ xor;
        let strChar = String.fromCharCode(charCode);
        resultList.push(strChar);
    }
    let resultStr = resultList.join('');
    return resultStr;
}

/**
 * 防治xss攻击
 * @param {string} source 需要转换的字符串
 * @return {string} 转换以后的字符串
 */
export function antiXSS(source) {
    source = source.replace(/</g, '&lt;');
    source = source.replace(/>/g, '&gt;');
    source = source.replace(/"/g, '&quot;');
    source = source.replace(/'/g, '&apos;');
    return source;
}

/**
 * 钱数格式化千分位分隔符
 * @param {Number} money 需要转换的钱数
 * @return {String} 增加千分位分隔符后的钱数;暂定小数点控制未后两位
 */
export function handleMoney(money) {
    return (+money).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}