(()=>{var f=Object.defineProperty;var A=Object.getOwnPropertyDescriptor;var N=Object.getOwnPropertyNames;var h=Object.prototype.hasOwnProperty;var S=(n,e)=>{for(var o in e)f(n,o,{get:e[o],enumerable:!0})},C=(n,e,o,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of N(e))!h.call(n,t)&&t!==o&&f(n,t,{get:()=>e[t],enumerable:!(i=A(e,t))||i.enumerable});return n};var U=n=>C(f({},"__esModule",{value:!0}),n);var a=(n,e,o)=>new Promise((i,t)=>{var p=c=>{try{l(o.next(c))}catch(_){t(_)}},u=c=>{try{l(o.throw(c))}catch(_){t(_)}},l=c=>c.done?i(c.value):Promise.resolve(c.value).then(p,u);l((o=o.apply(n,e)).next())});var E={};S(E,{onUnload:()=>x});var b={invoke:(n,e)=>window.__TAURI__.invoke(n,e),event:{emit:(n,e)=>window.__TAURI__.event.emit(n,e),listen:(n,e)=>a(void 0,null,function*(){return window.__TAURI__.event.listen(n,e)})},app:{getVersion:()=>window.__TAURI__.app.getVersion(),getName:()=>window.__TAURI__.app.getName()},process:{relaunch:()=>window.__TAURI__.process.relaunch()},apiWindow:{appWindow:{setFullscreen:n=>window.__TAURI__.window.appWindow.setFullscreen(n)}}};var m={invoke:()=>a(void 0,null,function*(){}),event:{emit:()=>{},listen:()=>a(void 0,null,function*(){})},app:{getVersion:()=>"0.0.0",getName:()=>"None"},process:{relaunch:()=>{}},apiWindow:{appWindow:{setFullscreen:()=>{}}}};var k={invoke:()=>a(void 0,null,function*(){}),event:{emit:()=>{},listen:()=>a(void 0,null,function*(){})},app:{getVersion:()=>"0.0.0",getName:()=>"None"},process:{relaunch:()=>{}},apiWindow:{appWindow:{setFullscreen:()=>{}}}};var w="Dorion";window.Flooed&&(w="Flooed");var r;switch(w){case"Dorion":r=b;break;case"Flooed":r=m;break;default:r=k;break}var j=window[w];var y=r.invoke,q=r.event,K=r.app,z=r.process,M=r.apiWindow;var{flux:{dispatcher:d}}=shelter,s={video:!1,streaming:!1,deafened:!1,muted:!1,speaking:!1,connected:!1},I=n=>a(void 0,null,function*(){let{state:e}=n;e.toLowerCase()==="connected"||e.toLowerCase()==="connecting"?s.connected=!0:e.toLowerCase()==="disconnected"&&(s.connected=!1),yield g()}),T=n=>a(void 0,null,function*(){let e=localStorage.getItem("user_id_cache").replace(/"/g,""),o=n.voiceStates.find(l=>l.userId===e);if(!o)return;let{selfDeaf:i,selfMute:t,selfStream:p,selfVideo:u}=o;s.muted=t,s.deafened=i,s.streaming=p,s.video=u,yield g()}),v=n=>a(void 0,null,function*(){let e=localStorage.getItem("user_id_cache").replace(/"/g,""),{userId:o,speakingFlags:i}=n;o===e&&(s.speaking=i>0,yield g())}),g=()=>a(void 0,null,function*(){let n=Object.keys(s).find(e=>s[e])||"disconnected";yield y("set_tray_icon",{event:n})});d.subscribe("VOICE_STATE_UPDATES",T);d.subscribe("SPEAKING",v);d.subscribe("RTC_CONNECTION_STATE",I);var x=()=>{d.unsubscribe("VOICE_STATE_UPDATES",T),d.unsubscribe("SPEAKING",v),d.unsubscribe("RTC_CONNECTION_STATE",I)};return U(E);})();