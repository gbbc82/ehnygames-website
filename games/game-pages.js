(function(){
var config=JSON.parse(document.getElementById('game-page-data').textContent),supported=Object.keys(config);
function normalize(v){if(supported.includes(v))return v;var n=(v||'').toLowerCase();var match=n.startsWith('ko')?'ko':n.startsWith('ja')?'ja':n.startsWith('zh')?'zh-TW':'en';return supported.includes(match)?match:'en';}
function setLanguage(lang,updateUrl){
lang=normalize(lang);var c=config[lang],home=c.home||(lang==='ko'?'/':'/en/'),fallback=lang==='ko'?'ko':'en';
document.documentElement.lang=c.htmlLang||lang;document.documentElement.dataset.lang=lang;document.title=c.title;
document.querySelectorAll('.language-toggle [data-lang]').forEach(function(b){if(b.dataset.lang===lang)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
document.querySelector('.brand').href=home;document.querySelector('.games-nav').href=home+'#games';
document.querySelector('.support-nav').href=fallback==='ko'?'/support/':'/en/support/';
if(c.nav){document.querySelector('.games-nav').setAttribute('aria-label',c.nav.games);document.querySelector('.support-nav').setAttribute('aria-label',c.nav.support);}
document.querySelector('.footer-home').href=home;document.querySelector('.footer-games').href=home+'#games';
document.querySelector('.footer-bolbol').href='/games/bolbolland/?lang='+lang;
document.querySelector('.footer-stories').href='/games/stories-bloom/?lang='+lang;
document.querySelector('.policies-nav').href=fallback==='ko'?'/privacy/':'/en/privacy/'+(lang==='ja'||lang==='zh-TW'?'?lang='+lang:'');
document.querySelector('meta[name="description"]').content=c.description;document.querySelector('meta[property="og:title"]').content=c.title;
document.querySelector('meta[property="og:description"]').content=c.description;document.querySelector('meta[property="og:image"]').content=c.image;
document.querySelector('meta[property="og:locale"]').content=({ko:'ko_KR',en:'en_US',ja:'ja_JP','zh-TW':'zh_TW'})[lang];document.querySelector('meta[name="twitter:image"]').content=c.image;
if(updateUrl){var u=new URL(location.href);u.searchParams.set('lang',lang);u.searchParams.delete('v');history.replaceState(null,'',u.pathname+u.search+u.hash);}
}
document.querySelectorAll('.language-toggle [data-lang]').forEach(function(b){b.addEventListener('click',function(e){if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();setLanguage(b.dataset.lang,true);});});
window.addEventListener('popstate',function(){setLanguage(new URLSearchParams(location.search).get('lang')||navigator.language,false);});
setLanguage(new URLSearchParams(location.search).get('lang')||navigator.language,false);
})();
(function(){
'use strict';
var links=Array.from(document.querySelectorAll('.bloom-gallery a[href]'));
if(!links.length||typeof HTMLDialogElement==='undefined'||!HTMLDialogElement.prototype.showModal)return;
var dialog=document.createElement('dialog'),image=document.createElement('img'),close=document.createElement('button');
dialog.className='gallery-lightbox';dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');dialog.tabIndex=-1;
image.alt='';image.draggable=false;close.type='button';close.className='gallery-lightbox-close';close.textContent='✕';dialog.append(image,close);document.body.append(dialog);
var session=null,gesture=null,consumeTouchClick=false,focusAfterClose=null;
function show(){if(!session)return;var a=session.group[session.index];image.src=a.href;image.alt=a.querySelector('img').alt;}
function restore(){
var saved=session;if(!saved)return;session=null;gesture=null;
document.body.style.cssText=saved.bodyStyle;document.documentElement.style.overflow=saved.rootOverflow;
window.scrollTo({top:saved.y,left:saved.x,behavior:'instant'});
focusAfterClose=saved.trigger;if(saved.trigger.isConnected)saved.trigger.focus({preventScroll:true});
}
function dismiss(){
// Restore now. A queued native close event must never overwrite a later session.
if(dialog.open)dialog.close();restore();
}
function open(a){
if(session||dialog.open)return;
var locale=a.closest('main > div[data-locale]'),group=links.filter(function(x){return x.closest('main > div[data-locale]')===locale;});
session={group:group,index:group.indexOf(a),trigger:a,y:window.scrollY,x:window.scrollX,bodyStyle:document.body.style.cssText,rootOverflow:document.documentElement.style.overflow};
gesture=null;show();var lang=document.documentElement.dataset.lang;
dialog.setAttribute('aria-label',({ko:'게임 이미지 크게 보기',en:'Game image viewer',ja:'ゲーム画像を拡大表示','zh-TW':'放大檢視遊戲圖片'})[lang]||'Game image viewer');
close.setAttribute('aria-label',({ko:'닫기',en:'Close',ja:'閉じる','zh-TW':'關閉'})[lang]||'Close');
document.body.style.position='fixed';document.body.style.top=-session.y+'px';document.body.style.left=-session.x+'px';document.body.style.width='100%';document.body.style.overflow='hidden';document.documentElement.style.overflow='hidden';
try{dialog.showModal();dialog.focus({preventScroll:true});}catch(error){restore();throw error;}
}
function next(delta){if(session){session.index=(session.index+delta+session.group.length)%session.group.length;show();}}
links.forEach(function(a){a.addEventListener('click',function(e){
if(e.button>0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
e.preventDefault();e.stopPropagation();open(a);
});});
close.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();dismiss();});
dialog.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();dismiss();});
dialog.addEventListener('cancel',function(e){e.preventDefault();dismiss();});
dialog.addEventListener('close',function(){if(!dialog.open){restore();if(focusAfterClose&&focusAfterClose.isConnected)focusAfterClose.focus({preventScroll:true});}});
dialog.addEventListener('keydown',function(e){if(e.key==='Escape'){e.preventDefault();e.stopPropagation();dismiss();}else if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();next(e.key==='ArrowRight'?1:-1);}});
// Some mobile browsers omit click after a swipe; others send a compatibility
// click after the dialog is gone. Handle touch on pointerup and consume that
// click in capture phase, even if its target is now an underlying image link.
document.addEventListener('pointerdown',function(){consumeTouchClick=false;},true);
document.addEventListener('click',function(e){
if(consumeTouchClick&&e.detail!==0){consumeTouchClick=false;e.preventDefault();e.stopImmediatePropagation();}
},true);
dialog.addEventListener('pointerdown',function(e){
gesture=null;if(e.pointerType!=='touch')return;
gesture={id:e.pointerId,x:e.clientX,y:e.clientY,close:!!e.target.closest('.gallery-lightbox-close')};
if(e.isTrusted)dialog.setPointerCapture(e.pointerId);
});
dialog.addEventListener('pointerup',function(e){
if(!gesture||gesture.id!==e.pointerId)return;
var dx=e.clientX-gesture.x,dy=e.clientY-gesture.y,isClose=gesture.close;gesture=null;
consumeTouchClick=true;e.preventDefault();
if(Math.abs(dx)>45||Math.abs(dy)>45){
if(!isClose&&Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))next(dx<0?1:-1);
}else dismiss();
});
dialog.addEventListener('pointercancel',function(){gesture=null;consumeTouchClick=false;});
window.addEventListener('pagehide',dismiss);
})();
