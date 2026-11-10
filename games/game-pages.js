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
var links=Array.from(document.querySelectorAll('.bloom-gallery a[href]'));if(!links.length)return;
var dialog=document.createElement('dialog');dialog.className='gallery-lightbox';dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');dialog.setAttribute('tabindex','-1');
var image=document.createElement('img'),close=document.createElement('button');image.alt='';close.type='button';close.className='gallery-lightbox-close';close.textContent='✕';dialog.append(image,close);document.body.append(dialog);
var group=[],index=0,trigger=null,scrollY=0,bodyStyle=null,start=null,ignoreClick=false;
function show(){var img=group[index].querySelector('img');image.src=group[index].href;image.alt=img.alt;}
function finish(){document.body.style.position=bodyStyle.position;document.body.style.top=bodyStyle.top;document.body.style.width=bodyStyle.width;document.body.style.overflow=bodyStyle.overflow;window.scrollTo({top:scrollY,left:0,behavior:"instant"});if(trigger)trigger.focus({preventScroll:true});}
function dismiss(){if(dialog.open)dialog.close();}
links.forEach(function(a){a.addEventListener('click',function(e){if(e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();trigger=a;var locale=a.closest('main > div[data-locale]');group=links.filter(function(x){return x.closest('main > div[data-locale]')===locale;});index=group.indexOf(a);show();var lang=document.documentElement.dataset.lang;dialog.setAttribute('aria-label',({ko:'게임 이미지 크게 보기',en:'Game image viewer',ja:'ゲーム画像を拡大表示','zh-TW':'放大檢視遊戲圖片'})[lang]||'Game image viewer');close.setAttribute('aria-label',({ko:'닫기',en:'Close',ja:'閉じる','zh-TW':'關閉'})[lang]||'Close');scrollY=window.scrollY;bodyStyle={position:document.body.style.position,top:document.body.style.top,width:document.body.style.width,overflow:document.body.style.overflow};document.body.style.position='fixed';document.body.style.top=-scrollY+'px';document.body.style.width='100%';document.body.style.overflow='hidden';ignoreClick=false;dialog.showModal();dialog.focus();});});
dialog.addEventListener('close',finish);dialog.addEventListener('cancel',function(e){e.preventDefault();dismiss();});
dialog.addEventListener('click',function(e){e.preventDefault();if(ignoreClick){ignoreClick=false;return;}dismiss();});
dialog.addEventListener('keydown',function(e){if(e.key==='Escape'){e.preventDefault();dismiss();}else if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();index=(index+(e.key==='ArrowRight'?1:-1)+group.length)%group.length;show();}});
dialog.addEventListener('pointerdown',function(e){if(e.pointerType==='touch'){ignoreClick=false;start={x:e.clientX,y:e.clientY};if(e.isTrusted)dialog.setPointerCapture(e.pointerId);}});
dialog.addEventListener('pointerup',function(e){if(!start)return;var dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){index=(index+(dx<0?1:-1)+group.length)%group.length;show();ignoreClick=true;}else{ignoreClick=true;dismiss();}});
dialog.addEventListener('pointercancel',function(){start=null;});
})();
