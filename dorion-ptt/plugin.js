(()=>{var _=Object.defineProperty;var D=Object.getOwnPropertyDescriptor;var C=Object.getOwnPropertyNames;var U=Object.prototype.hasOwnProperty;var B=(e,o)=>{for(var n in o)_(e,n,{get:o[n],enumerable:!0})},E=(e,o,n,t)=>{if(o&&typeof o=="object"||typeof o=="function")for(let r of C(o))!U.call(e,r)&&r!==n&&_(e,r,{get:()=>o[r],enumerable:!(t=D(o,r))||t.enumerable});return e};var L=e=>E(_({},"__esModule",{value:!0}),e);var s=(e,o,n)=>new Promise((t,r)=>{var c=i=>{try{u(n.next(i))}catch(m){r(m)}},A=i=>{try{u(n.throw(i))}catch(m){r(m)}},u=i=>i.done?t(i.value):Promise.resolve(i.value).then(c,A);u((n=n.apply(e,o)).next())});var P={};B(P,{onUnload:()=>M});var k={112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",27:"Escape",32:"Space",17:"Control",16:"Shift",18:"Alt",91:"Meta",13:"Enter",38:"Up",40:"Down",37:"Left",39:"Right",8:"Backspace",20:"CapsLock",9:"Tab",36:"Home",35:"End",33:"PageUp",34:"PageDown",45:"Insert",46:"Delete",109:"NumpadSubtract",107:"NumpadAdd",111:"NumpadDivide",106:"NumpadMultiply",192:"Grave",189:"Minus",187:"Equal",219:"LeftBracket",221:"RightBracket",220:"BackSlash",186:"Semicolon",222:"Apostrophe",188:"Comma",190:"Dot",191:"Slash"},f=e=>{let o="";return e>=65&&e<=90&&(o=String.fromCharCode(e)),e>=97&&e<=122&&(o=String.fromCharCode(e-32)),e>=48&&e<=57&&(o=String.fromCharCode(e)),k[e]&&(o=k[e]),o};var g={name:"Dorion",invoke:(e,o)=>window.__TAURI__.invoke(e,o),event:{emit:(e,o)=>window.__TAURI__.event.emit(e,o),listen:(e,o)=>s(void 0,null,function*(){return window.__TAURI__.event.listen(e,o)})},app:{getVersion:()=>window.__TAURI__.app.getVersion()},process:{relaunch:()=>window.__TAURI__.process.relaunch()},apiWindow:{appWindow:{setFullscreen:e=>window.__TAURI__.window.appWindow.setFullscreen(e)}}};var h={name:"Flooed",invoke:(e,o)=>window.Flooed.invoke(e,o),event:{emit:()=>{},listen:()=>s(void 0,null,function*(){})},app:{getVersion:()=>window.Flooed.version},process:{relaunch:()=>window.Flooed.invoke("relaunch")},apiWindow:{appWindow:{setFullscreen:e=>window.Flooed.invoke("set_fullscreen",e)}}};var y={name:"Unknown",invoke:()=>s(void 0,null,function*(){}),event:{emit:()=>{},listen:()=>s(void 0,null,function*(){})},app:{getVersion:()=>"0.0.0"},process:{relaunch:()=>{}},apiWindow:{appWindow:{setFullscreen:()=>{}}}};var d="None";window.Dorion?d="Dorion":window.Flooed&&(d="Flooed");var a;switch(d){case"Dorion":a=g;break;case"Flooed":a=h;break;default:a=y;break}var $=window[d];var ee=a.name,F=a.invoke,w=a.event,oe=a.app,ne=a.process,te=a.apiWindow;var{flux:{dispatcher:v,stores:{MediaEngineStore:l}},observeDom:p}=shelter,N=[],S=[],x=[],R='div[class*="pttToolsMessage_"]',I='div[class*="radioBar_"]',H='div[class*="layerContainer_"] div[class*="layer_"]',b=()=>x.forEach(e=>e()),O=e=>s(void 0,null,function*(){if(e.section!=="Voice & Video"){b();return}x.push(p(R,o=>{o.remove()}),p(H,o=>{if(o.id)return;o.innerHTML="";let n=p('div[class*="backdrop_"]',t=>{t.click(),n()})}),p(I,o=>{let n='div[class*="info_"] div[class*="text"]',t=o.querySelector(n);t.textContent.includes("(")&&(t.textContent=t.textContent.replace(/\(.+?\)/g,""))}))}),W=e=>s(void 0,null,function*(){let{mode:o,options:{shortcut:n}}=e,r=n.map(c=>c[1]).map(c=>({code:f(c),name:f(c)}));F("set_keybind",{action:"PUSH_TO_TALK",keys:r}),w.emit("ptt_toggled",{state:o==="PUSH_TO_TALK"})}),T;w.emit("ptt_toggled",{state:((T=l==null?void 0:l.getMode)==null?void 0:T.call(l))==="PUSH_TO_TALK"});S.push(v.subscribe("USER_SETTINGS_MODAL_SET_SECTION",O),v.subscribe("LAYER_POP",b),v.subscribe("AUDIO_SET_MODE",W));var M=()=>{b(),N.forEach(e=>e()),S.forEach(e=>e())};return L(P);})();
