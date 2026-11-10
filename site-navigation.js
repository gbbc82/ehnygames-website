(function(){
'use strict';
var locales={ko:{home:'/',games:'게임',support:'지원',policies:'개인정보처리방침',all:'게임 목록',help:'지원 및 개인정보',tagline:'작은 세계에서 시작하는 큰 모험.',bloom:'이야기가 피는 왕국',contact:'문의',skip:'본문으로 건너뛰기'},en:{home:'/en/',games:'Games',support:'Support',policies:'Privacy Policy',all:'All games',help:'Help & privacy',tagline:'Small worlds. Big adventures.',bloom:'The Kingdom Where Stories Bloom',contact:'Contact',skip:'Skip to content'},ja:{home:'/ja/',games:'ゲーム',support:'サポート',policies:'プライバシーポリシー',all:'ゲーム一覧',help:'サポートとプライバシー',tagline:'小さな世界から、大きな冒険へ。',bloom:'おはなしが咲く王国',contact:'お問い合わせ',skip:'本文へスキップ'},'zh-TW':{home:'/zh-tw/',games:'遊戲',support:'支援',policies:'隱私權政策',all:'遊戲列表',help:'支援與隱私權',tagline:'從小小世界，展開大大冒險。',bloom:'故事綻放的王國',contact:'聯絡我們',skip:'跳到主要內容'}};
function normalize(v){var s=(v||'').toLowerCase();return s.startsWith('ko')?'ko':s.startsWith('ja')?'ja':s.startsWith('zh')?'zh-TW':'en';}
var pathname=location.pathname.replace(/index\.html$/,''),kind=document.body.dataset.siteKind||'home';
var requested=new URLSearchParams(location.search).get('lang');
// Keep old shared English list URLs useful after adding native JA/TC pages.
if((kind==='privacy-list'||kind==='support')&&requested&&['ja','zh-TW'].includes(normalize(requested))){var target=locales[normalize(requested)].home+(kind==='support'?'support/':'privacy/');if(pathname!==target){location.replace(target+location.hash);return;}}
function sync(lang){lang=normalize(lang);var c=locales[lang],urls={home:c.home,games:c.home+'#games',support:c.home+'support/',policies:c.home+'privacy/',bolbol:'/games/bolbolland/?lang='+lang,bloom:'/games/stories-bloom/?lang='+lang};
document.querySelectorAll('[data-site-to]').forEach(function(a){a.href=urls[a.dataset.siteTo];});
document.querySelectorAll('[data-site-label]').forEach(function(e){e.textContent=c[e.dataset.siteLabel];});
document.querySelectorAll('.site-header [data-site-lang]').forEach(function(a){var l=a.dataset.siteLang,u=locales[l].home;
if(kind==='game')u=pathname+'?lang='+l;
else if(kind==='privacy-bloom')u='#policy-'+(l==='zh-TW'?'zh':l);
else if(kind==='privacy-bolbol')u=l==='ko'?'/privacy/bolbolland/':'/en/privacy/bolbolland/';
else if(kind==='privacy-list')u+='privacy/';
else if(kind==='support')u+='support/';
a.href=u;if(l===lang)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
document.querySelectorAll('.site-header [data-site-label]').forEach(function(e){if(e.parentElement.tagName==='A')e.parentElement.setAttribute('aria-label',e.textContent);});
document.body.dataset.navigationLanguage=lang;
}
function current(){return normalize(document.documentElement.lang);}
sync(current());
document.addEventListener('DOMContentLoaded',function(){sync(current());});
window.addEventListener('ehny:languagechange',function(e){sync(e.detail);});
window.addEventListener('hashchange',function(){if(kind==='privacy-bloom')sync(current());});
})();
