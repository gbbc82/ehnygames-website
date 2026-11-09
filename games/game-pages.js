(function(){
var config=JSON.parse(document.getElementById('game-page-data').textContent),supported=Object.keys(config);
function normalize(v){if(supported.includes(v))return v;var n=(v||'').toLowerCase();var match=n.startsWith('ko')?'ko':n.startsWith('ja')?'ja':n.startsWith('zh')?'zh-TW':'en';return supported.includes(match)?match:'en';}
function setLanguage(lang,updateUrl){
lang=normalize(lang);var c=config[lang],home=c.home||(lang==='ko'?'/':'/en/'),fallback=lang==='ko'?'ko':'en';
document.documentElement.lang=c.htmlLang||lang;document.documentElement.dataset.lang=lang;document.title=c.title;
document.querySelectorAll('button[data-lang]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.lang===lang));});
document.querySelector('.brand').href=home;document.querySelector('.games-nav').href=home+'#games';
document.querySelector('.support-nav').href=fallback==='ko'?'/support/':'/en/support/';
if(c.nav){document.querySelector('.games-nav').setAttribute('aria-label',c.nav.games);document.querySelector('.support-nav').setAttribute('aria-label',c.nav.support);}
document.querySelector('.footer-home').href=home;document.querySelector('.footer-games').href=home+'#games';
document.querySelector('.footer-bolbol').href='/games/bolbolland/?lang='+fallback;
document.querySelector('.footer-stories').href='/games/stories-bloom/?lang='+lang;
document.querySelector('.policies-nav').href=fallback==='ko'?'/privacy/':'/en/privacy/';
document.querySelector('meta[name="description"]').content=c.description;document.querySelector('meta[property="og:title"]').content=c.title;
document.querySelector('meta[property="og:description"]').content=c.description;document.querySelector('meta[property="og:image"]').content=c.image;
document.querySelector('meta[property="og:locale"]').content=({ko:'ko_KR',en:'en_US',ja:'ja_JP','zh-TW':'zh_TW'})[lang];document.querySelector('meta[name="twitter:image"]').content=c.image;
if(updateUrl){var u=new URL(location.href);u.searchParams.set('lang',lang);u.searchParams.delete('v');history.replaceState(null,'',u.pathname+u.search+u.hash);}
}
document.querySelectorAll('button[data-lang]').forEach(function(b){b.addEventListener('click',function(){setLanguage(b.dataset.lang,true);});});
window.addEventListener('popstate',function(){setLanguage(new URLSearchParams(location.search).get('lang')||navigator.language,false);});
setLanguage(new URLSearchParams(location.search).get('lang')||navigator.language,false);
})();