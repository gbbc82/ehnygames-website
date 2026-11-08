(function(){
var config=JSON.parse(document.getElementById('game-page-data').textContent);
function setLanguage(lang,updateUrl){
document.documentElement.lang=lang;document.documentElement.dataset.lang=lang;document.title=config[lang].title;
document.querySelectorAll('button[data-lang]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.lang===lang));});
var home=lang==='ko'?'/':'/en/';
document.querySelector('.brand').href=home;
document.querySelector('.games-nav').href=home+'#games';
document.querySelector('.support-nav').href=lang==='ko'?'/support/':'/en/support/';
document.querySelector('.footer-home').href=home;
document.querySelector('.footer-games').href=home+'#games';
document.querySelector('.footer-bolbol').href='/games/bolbolland/?lang='+lang;
document.querySelector('.footer-stories').href='/games/stories-bloom/?lang='+lang;
document.querySelector('.policies-nav').href=lang==='ko'?'/privacy/':'/en/privacy/';
document.querySelector('meta[name="description"]').content=config[lang].description;
document.querySelector('meta[property="og:title"]').content=config[lang].title;
document.querySelector('meta[property="og:description"]').content=config[lang].description;
document.querySelector('meta[property="og:image"]').content=config[lang].image;
document.querySelector('meta[property="og:locale"]').content=lang==='ko'?'ko_KR':'en_US';
document.querySelector('meta[name="twitter:image"]').content=config[lang].image;
if(updateUrl){var u=new URL(location.href);u.searchParams.set('lang',lang);u.searchParams.delete('v');history.replaceState(null,'',u.pathname+u.search+u.hash);}
}
document.querySelectorAll('button[data-lang]').forEach(function(b){b.addEventListener('click',function(){setLanguage(b.dataset.lang,true);});});
window.addEventListener('popstate',function(){var q=new URLSearchParams(location.search).get('lang');setLanguage(q==='ko'||q==='en'?q:((navigator.language||'en').toLowerCase().startsWith('ko')?'ko':'en'),false);});
setLanguage(document.documentElement.lang,false);
})();