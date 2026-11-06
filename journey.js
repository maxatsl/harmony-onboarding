/* Jury view for desktop: the user journey on the left (two swimlanes, quiz → app) with the
   value and the argument for every step, and the live screen on the right in an iPhone frame.
   The current step is highlighted as she moves. Phones (< 1000 px wide) see only the product.
   Pages call window.jStep('<id>') whenever a screen changes. Shared by the quiz and the app. */
(function(){
  var QUIZ_URL='https://harmony-onboarding.vercel.app', APP_URL='https://harmony-plan-app.vercel.app';
  var LANES=[
   {id:'quiz',title:'Quiz · web',url:QUIZ_URL,sub:'Where the Meta ad lands. Goal: quiz completion, then payment.',steps:[
    ['ad','Meta ad, Noom format','“Tap your goal weight” on a scrappy phone photo','Copies the formats Noom has run longest; optimised on quiz completion'],
    ['pain','Pain first: how much to lose','She starts from her own goal, then what changed after 40','Noom’s first question; segments by urgency on screen 1'],
    ['facts','Fact screens between questions','A personal fact for each answer, with its source','Keeps her curious to the end; evidence, not hype'],
    ['body','Age, height, weight, goal','The numbers a real plan needs','A healthy-BMI floor blocks unsafe goals'],
    ['date1','First projected date','“You could reach 160 lb by April 30”','Noom’s engine: the date pulls her through the rest'],
    ['branch','Menopause stage + GLP‑1 branch','The plan fits her body and her dose','Our edge over Noom: menopause, on a GLP‑1 or not'],
    ['habits','Training and breakfast','Sets her protein target in grams','Change one meal, not three'],
    ['build','Plan build','Bars fill per section, one pop-up question','Feels computed for her, not generic'],
    ['email','Email gate','Lead captured before the final date','Retargeting if she does not pay today'],
    ['date2','Final date: weeks sooner','Payoff before the price','Value shown before the paywall'],
    ['paywall','Paywall','Intro price, year highlighted, reserved timer','$14.99 → $29.99 / 4 wk · $129.99 / yr; 55% year in the model'],
    ['pay','Apple Pay + success','One tap, Face ID, fireworks','Least friction at the most fragile step'],
    ['upsell','One-time upsell $39.99','Picked by her quiz branch','+$7.24 net per payer in the model'],
    ['handoff','Account → open the app','Her answers travel with her','No second onboarding']]},
   {id:'app',title:'App · product',url:APP_URL,sub:'What she pays for. Goal: a visible result in 14 days.',steps:[
    ['test','Day‑1 strength test','A chair, stairs and two bags, 5 minutes','The aha moment right after paying'],
    ['score','Strength Score','Her number, not the medication’s','Weekly re-test: a reason to come back'],
    ['today','Today','20-min session, protein ring, 1-tap check-in','Daily habit loop; injection days turn light'],
    ['report','Day‑14 report','Strength, protein, symptoms, for her doctor','The answer to “what does she get in 2 weeks?”'],
    ['plan','Plan and what’s next','Upgrade to a year after day 14','The main LTV lever']]}];

  var css='@media (min-width:1000px){'+
   'body{background:#e9e3d7!important}'+
   '.wrap{max-width:1360px!important;flex-direction:row!important;align-items:flex-start!important;gap:44px!important;padding:28px 32px!important}'+
   '.wrap>.caption{display:none!important}'+
   '#journey{flex:1;min-width:0;display:flex;flex-direction:column;gap:14px;font-family:Inter,system-ui,sans-serif;color:#1c1b1a}'+
   '#journey h1{font:300 40px/1.05 Newsreader,Georgia,serif;letter-spacing:-.02em;margin:0}'+
   '#journey .intro{font-size:14px;color:#4a4741;margin:0}'+
   '#journey .lane{background:#f7f1e8;border-radius:22px;padding:14px 16px 16px;display:flex;flex-direction:column;gap:6px;position:relative}'+
   '#journey .lane.app{background:#224228;color:#f7f1e8}'+
   '#journey .lh{display:flex;justify-content:space-between;align-items:baseline;gap:10px;margin-bottom:4px}'+
   '#journey .lh b{font:600 12px Inter;letter-spacing:.08em;text-transform:uppercase;color:#af751b}'+
   '#journey .lane.app .lh b{color:#ddbe78}'+
   '#journey .lh a{font-size:12px;color:inherit;opacity:.75}'+
   '#journey .lh span{font-size:12px;opacity:.7}'+
   '#journey .steps{display:grid;grid-template-columns:1fr 1fr;gap:6px}'+
   '#journey .st{display:flex;gap:9px;padding:8px 10px;border-radius:12px;font-size:12.5px;line-height:1.35;transition:background .2s,transform .2s}'+
   '#journey .st i{font-style:normal;flex:none;width:22px;height:22px;border-radius:50%;background:rgba(0,0,0,.07);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600}'+
   '#journey .lane.app .st i{background:rgba(255,255,255,.12)}'+
   '#journey .st b{display:block;font-size:13px}'+
   '#journey .st em{display:block;font-style:normal;opacity:.7}'+
   '#journey .st u{display:none;text-decoration:none;margin-top:3px;color:#af751b;font-weight:500}'+
   '#journey .lane.app .st u{color:#ddbe78}'+
   '#journey .st.on{background:#fff;box-shadow:0 6px 18px rgba(0,0,0,.08);transform:scale(1.01)}'+
   '#journey .lane.app .st.on{background:#2d5234}'+
   '#journey .st.on i{background:#af751b;color:#fff}'+
   '#journey .st.on u{display:block}'+
   '#journey .st.done i{background:#849671;color:#fff}'+
   '#journey .hand{display:flex;align-items:center;gap:10px;font-size:12.5px;color:#4a4741;padding:0 8px}'+
   '#journey .hand:before,#journey .hand:after{content:"";flex:1;border-top:2px dashed #b8c09f}'+
   '#journey .hand span{white-space:nowrap}'+
   '.device{flex:none;position:sticky;top:20px;width:466px;height:968px;border-radius:72px;padding:17px;background:#141414;'+
   'box-shadow:0 0 0 2px #3a3a3c,0 0 0 5px #1b1b1d,0 30px 80px rgba(0,0,0,.35);transform-origin:top center}'+
   '.device:before{content:"";position:absolute;top:30px;left:50%;transform:translateX(-50%);width:124px;height:36px;border-radius:20px;background:#000;z-index:50}'+
   '.device:after{content:"";position:absolute;right:-7px;top:220px;width:4px;height:96px;border-radius:2px;background:#2c2c2e}'+
   '.device .phone{max-width:none!important;width:432px!important;height:934px!important;min-height:934px!important;border-radius:56px!important;overflow-y:auto!important;overflow-x:hidden!important;margin:0!important}'+
   '.device .phone .bar,.device .phone .top{padding-top:62px!important}'+
   '.device .phone::-webkit-scrollbar{display:none}'+
   '.devcap{text-align:center;font:500 12px Inter;color:#6f6d69;margin-top:12px}'+
  '}';

  var cur=null,order=[];
  LANES.forEach(function(l){l.steps.forEach(function(s){order.push(s[0])})});

  function build(){
    if(window.innerWidth<1000||document.getElementById('journey'))return;
    var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    var wrap=document.querySelector('.wrap'),phone=document.getElementById('phone');if(!wrap||!phone)return;
    var j=document.createElement('aside');j.id='journey';
    var h='<h1>Harmony: from ad to day 14</h1><p class="intro">Click through the phone on the right; the step you are on lights up. Two links: the quiz (web) and the app (product).</p>',n=0;
    LANES.forEach(function(l,li){
      if(li)h+='<div class="hand"><span>↓ payment → account → her answers travel in the link → app ↓</span></div>';
      h+='<div class="lane '+l.id+'"><div class="lh"><b>'+l.title+'</b><a href="'+l.url+'">'+(l.id==='app'?'Open the app →':'Start the quiz →')+' '+l.url.replace('https://','')+'</a></div><span style="font-size:12px;opacity:.7">'+l.sub+'</span><div class="steps">';
      l.steps.forEach(function(s){n++;h+='<div class="st" id="js-'+s[0]+'"><i>'+n+'</i><div><b>'+s[1]+'</b><em>'+s[2]+'</em><u>Why: '+s[3]+'</u></div></div>'});
      h+='</div></div>';
    });
    j.innerHTML=h;wrap.insertBefore(j,wrap.firstChild);
    var d=document.createElement('div');d.className='device';phone.parentNode.insertBefore(d,phone);d.appendChild(phone);
    var holder=document.createElement('div');d.parentNode.insertBefore(holder,d);holder.appendChild(d);
    var cap=document.createElement('p');cap.className='devcap';cap.textContent='iPhone 18 Pro Max frame · tap through the live product';holder.appendChild(cap);
    function fit(){var s=Math.min(1,(window.innerHeight-70)/968);d.style.transform='scale('+s+')';holder.style.height=(968*s+40)+'px';holder.style.width=(466*s)+'px'}
    fit();window.addEventListener('resize',fit);
    if(cur)mark(cur);
  }
  function mark(id){
    var ix=order.indexOf(id);
    order.forEach(function(o,k){var e=document.getElementById('js-'+o);if(e)e.className='st'+(o===id?' on':(k<ix?' done':''))});
    var p=document.getElementById('phone');if(p&&p.parentNode&&p.parentNode.className==='device')p.scrollTop=0;
  }
  window.jStep=function(id){cur=id;mark(id)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
