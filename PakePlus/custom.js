// ==UserScript==
// @name                      【最新】全网VIP视频去广告解析，一键播放，4K,1080P各种高清资源都能看 🔥真4K高清🔥
// @namespace                 https://bbs.tampermonkey.net.cn/
// @version                   0.1.6
// @description               爱奇艺、腾讯、优酷、哔哩哔哩、芒果等全网VIP视频随便看！；
// @author                    You
// @match                     *://*.youku.com/*
// @match                     *://*.iqiyi.com/*
// @match                     *://*.iq.com/*
// @match                     *://v.qq.com/*
// @match                     *://*.bilibili.com/*
// @match                     *://*.mgtv.com/*
// @match                     *://*.le.com/*
// @match                     *://*.tudou.com/*
// @match                     *://*.pptv.com/*
// @match                     *://*.1905.com/*
// @grant                     GM_addStyle
// @require                   https://lib.baomitu.com/jquery/1.8.3/jquery.min.js
// @website                   https://soujiaoben.org/#/s?id=2826&host=scriptcat
// ==/UserScript==



(function() {
    'use strict';
      const divElement = document.createElement('div');
        divElement.innerHTML = '免vip';
        divElement.setAttribute("id","vipBtn")
    const app = document.body
    const fullDomain = window.location.href.split('?')[0];
    const domainArray = [
        "v.youku.com",
        "iqiyi.com/v_",
        "v.qq.com/x",
        "bilibili.com/bangumi/play",
        "tudou.com",
        "mgtv.com"
    ];
    domainArray.forEach((item)=>{
         if(fullDomain.includes(item)){
            app.appendChild(divElement);
                GM_addStyle('#vipBtn{width: 50px;height: 50px; border-radius: 50%;background-color: #3498db; color: white;font-size: 16px; font-weight: bold; border: none; cursor: pointer; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); transition: all 0.3s ease;text-align:center;line-height:50px;position:fixed;top:500px;left:30px;z-index:999999999;}')
                GM_addStyle('#vipBtn:hover{background-color: #2980b9;box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4); transform: scale(1.05); }')
                GM_addStyle('#vipBtn:active{background-color: #1c5980; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);transform: scale(0.95);}')
                divElement.addEventListener('click', function() {
                    window.open(`https://aifenxiang.net.cn/video/vip?url=${location.href}`, '_blank');
                });
         }
    })
})();