(()=>{var k=Object.defineProperty;var E=Object.getOwnPropertyDescriptor;var T=Object.getOwnPropertyNames;var f=Object.prototype.hasOwnProperty;var m=(t,e)=>{for(var s in e)k(t,s,{get:e[s],enumerable:!0})},x=(t,e,s,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of T(e))!f.call(t,o)&&o!==s&&k(t,o,{get:()=>e[o],enumerable:!(a=E(e,o))||a.enumerable});return t};var C=t=>x(k({},"__esModule",{value:!0}),t);var r=(t,e,s)=>new Promise((a,o)=>{var l=c=>{try{i(s.next(c))}catch(b){o(b)}},v=c=>{try{i(s.throw(c))}catch(b){o(b)}},i=c=>c.done?a(c.value):Promise.resolve(c.value).then(l,v);i((s=s.apply(t,e)).next())});var U={};m(U,{onUnload:()=>P});var _=t=>{let e="";switch(t){case 8:e="Backspace";break;case 9:e="Tab";break;case 13:e="Enter";break;case 16:e="Shift";break;case 17:e="Control";break;case 18:e="Alt";break;case 20:e="CapsLock";break;case 27:e="Escape";break;case 32:e="Space";break;case 33:e="PageUp";break;case 34:e="PageDown";break;case 35:e="End";break;case 36:e="Home";break;case 37:e="Left";break;case 38:e="Up";break;case 39:e="Right";break;case 40:e="Down";break;case 45:e="Insert";break;case 46:e="Delete";break;default:e=String.fromCharCode(t);break}return e};var{flux:{dispatcher:n,stores:{UserStore:p}},observeDom:d}=shelter,{invoke:g,event:D}=window.__TAURI__,h=[],y=[],S=[],H='div[class*="pttToolsMessage_"]',L='div[class*="radioBar_"]',A='div[class*="layerContainer_"] div[class*="layer_"]',u=()=>S.forEach(t=>t()),w=t=>r(void 0,null,function*(){if(t.section!=="Voice & Video"){u();return}S.push(d(H,e=>{e.remove()}),d(A,e=>{e.innerHTML=""}),d(L,e=>{let s='div[class*="info_"] div[class*="text"]',a=e.querySelector(s);a.textContent.includes("(")&&(a.textContent=a.textContent.replace(/\(.+?\)/g,""))}))}),I=t=>r(void 0,null,function*(){let{mode:e,options:{shortcut:s}}=t,o=s.map(l=>l[1]).map(_);g("save_ptt_keys",{keys:o}),g("toggle_ptt",{state:e==="PUSH_TO_TALK"})}),M=t=>r(void 0,null,function*(){var a;let{state:e}=t.payload,s={type:"SPEAKING",context:"default",userId:(a=p==null?void 0:p.getCurrentUser())==null?void 0:a.id,speakingFlags:e?1:0};console.log("Toggle handler called with state: ",e),n.dispatch(s)});y.push(n.subscribe("USER_SETTINGS_MODAL_SET_SECTION",w),n.subscribe("LAYER_POP",u),n.subscribe("AUDIO_SET_MODE",I));D.listen("ptt_toggle",M).then(t=>h.push(t));var P=()=>{u(),h.forEach(t=>t()),y.forEach(t=>t())};return C(U);})();