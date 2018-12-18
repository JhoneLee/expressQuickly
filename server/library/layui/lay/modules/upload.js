layui.define("layer",function(k){var d=layui.$,s=layui.layer,j=layui.hint(),p=layui.device(),l={config:{},set:function(t){var u=this;u.config=d.extend({},u.config,t);return u},on:function(t,u){return layui.onevent.call(this,h,t,u)}},m=function(){var t=this;return{upload:function(u){t.upload.call(t,u)},config:t.config}},h="upload",c=".layui-upload",i="layui-this",e="layui-show",o="layui-hide",q="layui-disabled",f="layui-upload-file",a="layui-upload-form",r="layui-upload-iframe",b="layui-upload-choose",g="layui-upload-drag",n=function(t){var u=this;u.config=d.extend({},u.config,l.config,t);u.render()};n.prototype.config={accept:"images",exts:"",auto:true,bindAction:"",url:"",field:"file",method:"post",data:{},drag:true,size:0,number:0,multiple:false};n.prototype.render=function(t){var u=this,t=u.config;t.elem=d(t.elem);t.bindAction=d(t.bindAction);u.file();u.events()};n.prototype.file=function(){var v=this,t=v.config,w=v.elemFile=d(['<input class="'+f+'" type="file" name="'+t.field+'"',(t.multiple?" multiple":""),">"].join("")),u=t.elem.next();if(u.hasClass(f)||u.hasClass(a)){u.remove()}if(p.ie&&p.ie<10){t.elem.wrap('<div class="layui-upload-wrap"></div>')}v.isFile()?(v.elemFile=t.elem,t.field=t.elem[0].name):t.elem.after(w);if(p.ie&&p.ie<10){v.initIE()}};n.prototype.initIE=function(){var v=this,u=v.config,t=d('<iframe id="'+r+'" class="'+r+'" name="'+r+'" frameborder="0"></iframe>'),w=d(['<form target="'+r+'" class="'+a+'" method="'+u.method,'" key="set-mine" enctype="multipart/form-data" action="'+u.url+'">',"</form>"].join(""));d("#"+r)[0]||d("body").append(t);if(!u.elem.next().hasClass(r)){v.elemFile.wrap(w);u.elem.next("."+r).append(function(){var x=[];layui.each(u.data,function(y,z){x.push('<input type="hidden" name="'+y+'" value="'+z+'">')});return x.join("")}())}};n.prototype.msg=function(t){return s.msg(t,{icon:2,shift:6})};n.prototype.isFile=function(){var t=this.config.elem[0];if(!t){return}return t.tagName.toLocaleLowerCase()==="input"&&t.type==="file"};n.prototype.preview=function(u){var t=this;if(window.FileReader){layui.each(t.chooseFiles,function(v,w){var x=new FileReader();x.readAsDataURL(w);x.onload=function(){u&&u(v,w,this.result)}})}};n.prototype.upload=function(t,D){var A=this,F=A.config,v=A.elemFile[0],G=function(){var L=0,I=0,J=t||A.files||A.chooseFiles||v.files,K=function(){if(F.multiple&&L+I===A.fileLength){typeof F.allDone==="function"&&F.allDone({total:A.fileLength,successful:L,aborted:I})}};layui.each(J,function(M,N){var O=new FormData();O.append(F.field,N);layui.each(F.data,function(P,Q){O.append(P,Q)});d.ajax({url:F.url,type:F.method,data:O,contentType:false,processData:false,dataType:"json",success:function(P){L++;z(M,P);K()},error:function(){I++;C(M);K()}})})},E=function(){var J=d("#"+r);A.elemFile.parent().submit();var I=new Date().getTime();var K=I+60000*3;clearInterval(n.timer);n.timer=setInterval(function(){var L;var M;if(new Date().getTime()>K){clearInterval(n.timer);C()}try{M=J.contents().find("body");L=M.text()}catch(N){clearInterval(n.timer);C()}if(L){clearInterval(n.timer);M.html("");z(0,L)}},30)},z=function(I,J){A.elemFile.next("."+b).remove();v.value="";if(typeof J!=="object"){try{J=JSON.parse(J)}catch(K){J={status:1,data:{},statusInfo:"未知错误"}}}typeof F.done==="function"&&F.done(J,I||0,function(L){A.upload(L)},F.elem)},C=function(I){if(F.auto){v.value=""}typeof F.error==="function"&&F.error(I||0,function(J){A.upload(J)},F.elem)},y=F.exts,u,H=function(){var I=[];layui.each(t||A.chooseFiles,function(J,K){I.push(K.name)});return I}(),B={$em:F.elem,preview:function(I){A.preview(I)},upload:function(J,K){var I={};I[J]=K;A.upload(I)},pushFile:function(){A.files=A.files||{};layui.each(A.chooseFiles,function(I,J){A.files[I]=J});return A.files}},w=function(){if(D==="choose"){return F.choose&&F.choose(B)}F.before&&F.before(B);if(p.ie){return p.ie>9?G():E()}G()};H=H.length===0?((v.value.match(/[^\/\\]+\..+/g)||[])||""):H;if(H.length===0){return}switch(F.accept){case"mix":if(!RegExp("\\w\\.("+(y||"pdf|png|jpeg|jpg|gif")+")$","i").test(escape(H))){A.msg("选择的文件中包含不支持的格式");return v.value=""}break;case"file":if(!RegExp("\\w\\.("+(y||"pdf|doc|docx")+")$","i").test(escape(H))){A.msg("选择的文件中包含不支持的格式");return v.value=""}break;case"video":if(!RegExp("\\w\\.("+(y||"avi|mp4|mov")+")$","i").test(escape(H))){A.msg("选择的视频中包含不支持的格式");return v.value=""}break;case"audio":if(!RegExp("\\w\\.("+(y||"mp3|wav|mid")+")$","i").test(escape(H))){return v.value=""}break;default:layui.each(H,function(I,J){if(!RegExp("\\w\\.("+(y||"jpg|png|gif|jpeg$")+")","i").test(escape(J))){u=true}});if(u){A.msg("选择的图片中包含不支持的格式");return v.value=""}break}A.fileLength=function(){var I=0,J=t||A.files||A.chooseFiles||v.files;layui.each(J,function(){I++});return I}();if(F.number&&A.fileLength>F.number){return A.msg("同时最多只能上传的数量为："+F.number)}if(F.size>0&&!(p.ie&&p.ie<10)){var x;layui.each(A.chooseFiles,function(I,K){if(K.size>1024*F.size){var J=F.size/1024;J=J>=1?(Math.floor(J)+(J%1>0?J.toFixed(1):0))+"MB":F.size+"KB";v.value="";x=J}});if(x){return A.msg("文件不能超过"+x)}}w()};n.prototype.events=function(){var v=this,u=v.config,t=function(x){v.chooseFiles={};layui.each(x,function(y,z){var A=new Date().getTime();v.chooseFiles[A+"-"+y]=z})},w=function(y,x){var A=v.elemFile,z=y.length>1?y.length+"个文件":((y[0]||{}).name||(A[0].value.match(/[^\/\\]+\..+/g)||[])||"");if(A.next().hasClass(b)){A.next().remove()}v.upload(null,"choose");if(v.isFile()||u.choose){return}A.after('<span class="layui-inline '+b+'">'+z+"</span>")};u.elem.off("upload.start").on("upload.start",function(){var y=d(this),x=y.attr("lay-data");if(x){try{x=new Function("return "+x)();v.config=d.extend({},u,x)}catch(z){j.error("Upload element property lay-data configuration item has a syntax error: "+x)}}v.config.item=y;v.elemFile[0].click()});if(!(p.ie&&p.ie<10)){u.elem.off("upload.over").on("upload.over",function(){var x=d(this);x.attr("lay-over","")}).off("upload.leave").on("upload.leave",function(){var x=d(this);x.removeAttr("lay-over")}).off("upload.drop").on("upload.drop",function(z,A){var y=d(this),x=A.originalEvent.dataTransfer.files||[];y.removeAttr("lay-over");t(x);if(u.auto){v.upload(x)}else{w(x)}})}v.elemFile.off("upload.change").on("upload.change",function(){var x=this.files||[];t(x);u.auto?v.upload():w(x)});u.bindAction.off("upload.action").on("upload.action",function(){v.upload()});if(u.elem.data("haveEvents")){return}v.elemFile.on("change",function(){d(this).trigger("upload.change")});u.elem.on("click",function(){if(v.isFile()){return}d(this).trigger("upload.start")});if(u.drag){u.elem.on("dragover",function(x){x.preventDefault();d(this).trigger("upload.over")}).on("dragleave",function(x){d(this).trigger("upload.leave")}).on("drop",function(x){x.preventDefault();d(this).trigger("upload.drop",x)})}u.bindAction.on("click",function(){d(this).trigger("upload.action")});u.elem.data("haveEvents",true)};l.render=function(t){var u=new n(t);return m.call(u)};k(h,l)});