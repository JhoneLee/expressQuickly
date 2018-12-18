/**
 * @file 页面工具函数
 * @Author wangjie19
 * @Date 2017-12-05 18:46:56
 * @Last Modified by: wangjie19
 * @Last Modified time: 2018-01-16 19:34:12
 */
/*eslint-disable*/
/**
 * url反序列化方法
 * @param {String} 需要反序列化的url字符串
 * @return {Object} 反序列化后的对象
 */
export function serializeUrl(url) {
    let query = {};
    let querys = [];
    if (!url) {
        querys = location.search.substring(1).split('&');
    } else {
        let reg = /\?/g
        let str = reg.test(url)?url.split('?')[1]:url;
        querys = str.split('&');
    }
    querys.forEach((item) => {
        let queryItem = item.split('=');
        query[queryItem[0]] = queryItem[1];
    });
    return {
        query
    };
}

/**
 * 序列化对象
 * @param {Object} obj 需要序列化的对象
 * @return {string} 序列化后的字符串
 */
export function serializeObj(obj) {
    let str = '';
    const {query, hash} = obj;
    if (query) {
        str += '?';
        for (let key in query) {
            str += `${key}=${query[key]}&`;
        }
    }
    if (hash) {
        str += '#';
        for (let key in hash) {
            str += `${key}=${query[key]}`;
        }
    }
    return str;
}

/**
 * 钱数格式化千分位分隔符
 * @param {Number} money 需要转换的钱数
 * @return {String} 增加千分位分隔符后的钱数;暂定小数点控制未后两位
 */
export function handleMoney(money) {
    return (+money).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
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
* 转换时间毫秒间隔为x小时x分钟x秒格式
* @param {Object} interval 需要计算的时间间隔(毫秒级)
* @return {string} 转换后的时间间隔字符串
*/
function computeInterval(interval) {
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

// layui 判断设备类型迁移
export function getDevice(key){
    var agent = navigator.userAgent.toLowerCase();
    var win = window
    //获取版本号
    ,getVersion = function(label){
      var exp = new RegExp(label + '/([^\\s\\_\\-]+)');
      label = (agent.match(exp)||[])[1];
      return label || false;
    }
    
    //返回结果集
    ,result = {
      os: function(){ //底层操作系统
        if(/windows/.test(agent)){
          return 'windows';
        } else if(/linux/.test(agent)){
          return 'linux';
        } else if(/iphone|ipod|ipad|ios/.test(agent)){
          return 'ios';
        } else if(/mac/.test(agent)){
          return 'mac';
        } 
      }()
      ,ie: function(){ //ie版本
        return (!!win.ActiveXObject || "ActiveXObject" in win) ? (
          (agent.match(/msie\s(\d+)/) || [])[1] || '11' //由于ie11并没有msie的标识
        ) : false;
      }()
      ,weixin: getVersion('micromessenger')  //是否微信
    };
    
    //任意的key
    if(key && !result[key]){
      result[key] = getVersion(key);
    }
    
    //移动设备
    result.android = /android/.test(agent);
    result.ios = result.os === 'ios';
    
    return result;
}

export default {
    serializeUrl,
    serializeObj,
    handleMoney,
    antiXSS,
    computeInterval
};
