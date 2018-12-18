/**
* @file: h5 分享秀
* @Author: liyunjiao
* @Date:   2018-01-22 13:01:26
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-01-24 12:12:41
*/

/*eslint-disable*/
import '../../sass/h5show/index.scss';
import $ from 'webpack-zepto';
import pageSlider from '../../common/pageSlide.js';


canvasInit(()=>{
    media.$az.show();
    media.init();
});

function canvasInit(cb) {
    var canvas = document.getElementById("cover"),
    ctx = canvas.getContext("2d");
    canvas.width = document.body.offsetWidth;
    canvas.height = document.body.offsetHeight;
    var x1, y1, a = 40*2/window.devicePixelRatio;
    var ratio = 0.5;
    var path = 0;
    var img = new Image();
    img.onload = function(){
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        tapClip();
        pageSlider.case({
            loop:true
        });
        $('.loading').hide();
    }
    img.src = "http://img.liveapp.cn/userfiles/info_pic/59/2014/10/68961/53a7f9e928439.jpg";
    function tapClip(){
        ctx.lineCap = "round";   // 圆形的线帽
        ctx.lineJoin = "round";  // 两条线条交汇时，创建圆形边角
        ctx.lineWidth = a*2;
        ctx.globalCompositeOperation = "destination-out";  // 合成操作 重叠的区域变成透明
        canvas.addEventListener('touchstart' , function(e){
            e.preventDefault();
            x1 = e.targetTouches[0].pageX - 60*2/window.devicePixelRatio;
            y1 = e.targetTouches[0].pageY - 30*2/window.devicePixelRatio;
            ctx.save();
            ctx.beginPath()
            ctx.arc(x1, y1, 1, 0, 2*Math.PI);
            ctx.fill();
            ctx.restore();
            canvas.addEventListener('touchmove' , tapmoveHandler);
            canvas.addEventListener('touchend' , tapendHandler);
            function tapendHandler(e){
                canvas.removeEventListener('touchmove' , tapmoveHandler);
            }
            function tapmoveHandler(e){
                if(path>canvas.width*canvas.height*ratio){
                    return;
                }
                e.preventDefault();
                var x2 = e.targetTouches[0].pageX;
                var y2 = e.targetTouches[0].pageY;
                ctx.save();
                ctx.moveTo(x1,y1);
                ctx.lineTo(x2,y2);
                ctx.stroke();
                ctx.restore()
                path += ((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2))^0.5*a;
                if(path > canvas.width*canvas.height*ratio){
                    canvas.removeEventListener('touchmove',tapmoveHandler);
                    canvas.removeEventListener('touchend',tapendHandler);
                    $(canvas).addClass('canvas-out');
                    setTimeout(()=>{
                        canvas.style.display = 'none';
                        cb&&cb();
                    },1100);
                }
                x1 = x2;
                y1 = y2;
            }
        });
    }
}

// 播放器
let media = {
    $az:$('.audio-zone'),
    audio:null,
    config:{
        loop:true,
        preload:'auto',
        src:$('.audio-zone').attr('data-src')
    },
    init(){
        media.mediaInit();
        media.bindEvent();
        media.audio.play();
    },
    mediaInit(){
        media.audio = new Audio;
        for(let item in media.config){
            media.audio[item] = media.config[item];
        }
        media.audio.load();
    },
    bindEvent(){
        function control($item,flag,timer){
            $item.text(flag?"打开":"关闭");
            timer && clearTimeout(timer);
            $item.removeClass("z-move z-hide");
            timer = setTimeout(()=>{
                $item.addClass("z-move").addClass("z-hide");
            },1000);
        }
        let b = null;
        let $ta = $('.txt_audio');
        $(media.audio).on('play',function(){
            control($ta,true,b);
            // 播放音乐盒
            media.audioPlay();
        });
        $(media.audio).on('pause',function(){
            control($ta,false,b);
            // 关闭音乐盒
             media.audioPause();
        });
        $('.btn_audio').on('click',function(){
            let {audio} = media; 
            audio.paused?audio.play():audio.pause();
        });
    },
    audioPause(){
        console.log('暂停');
        $('.btn_audio').removeClass('rotate-music');
    },
    audioPlay(){
        console.log('播放');
        $('.btn_audio').addClass('rotate-music');
    }
};
