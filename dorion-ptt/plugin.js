(()=>{var _=Object.defineProperty;var D=Object.getOwnPropertyDescriptor;var U=Object.getOwnPropertyNames;var R=Object.prototype.hasOwnProperty;var E=(e,o)=>{for(var n in o)_(e,n,{get:o[n],enumerable:!0})},I=(e,o,n,t)=>{if(o&&typeof o=="object"||typeof o=="function")for(let r of U(o))!R.call(e,r)&&r!==n&&_(e,r,{get:()=>o[r],enumerable:!(t=D(o,r))||t.enumerable});return e};var W=e=>I(_({},"__esModule",{value:!0}),e);var i=(e,o,n)=>new Promise((t,r)=>{var c=s=>{try{u(n.next(s))}catch(w){r(w)}},S=s=>{try{u(n.throw(s))}catch(w){r(w)}},u=s=>s.done?t(s.value):Promise.resolve(s.value).then(c,S);u((n=n.apply(e,o)).next())});var P={};E(P,{onUnload:()=>M});var f={112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",27:"Escape",32:"Space",17:"Control",16:"Shift",18:"Alt",91:"Meta",13:"Enter",38:"Up",40:"Down",37:"Left",39:"Right",8:"Backspace",20:"CapsLock",9:"Tab",36:"Home",35:"End",33:"PageUp",34:"PageDown",45:"Insert",46:"Delete",109:"NumpadSubtract",107:"NumpadAdd",111:"NumpadDivide",106:"NumpadMultiply",192:"Grave",189:"Minus",187:"Equal",219:"LeftBracket",221:"RightBracket",220:"BackSlash",186:"Semicolon",222:"Apostrophe",188:"Comma",190:"Dot",191:"Slash"},m=e=>{let o="";return e>=65&&e<=90&&(o=String.fromCharCode(e)),e>=97&&e<=122&&(o=String.fromCharCode(e-32)),e>=48&&e<=57&&(o=String.fromCharCode(e)),f[e]&&(o=f[e]),o};function k(e){if(e.length===1)return e.toLowerCase()>="a"&&e.toLowerCase()<="z"?"Key"+e.toUpperCase():"Digit"+e;let o="";return Object.values(f).forEach(n=>{console.log("comparing",e,n),e.includes(n)&&(console.log("found!"),o=n)}),console.log(o),o||"Key"+e}var y={name:"Dorion",invoke:(e,o)=>{var n;return(n=window.__TAURI__)!=null&&n.invoke?window.__TAURI__.invoke(e,o):window.__TAURI__.core.invoke(e,o)},event:{emit:(e,o)=>window.__TAURI__.event.emit(e,o),listen:(e,o)=>i(void 0,null,function*(){return window.__TAURI__.event.listen(e,o)})},app:{getVersion:()=>window.__TAURI__.app.getVersion()},process:{relaunch:()=>window.__TAURI__.process.relaunch()},apiWindow:{appWindow:{setFullscreen:e=>{var o,n;return(n=(o=window.__TAURI__)==null?void 0:o.webviewWindow)!=null&&n.getCurrentWebviewWindow?window.__TAURI__.webviewWindow.getCurrentWebviewWindow().setFullscreen(e):window.__TAURI__.window.appWindow.setFullscreen(e)}}}};var T={name:"Flooed",invoke:(e,o)=>window.Flooed.invoke(e,o),event:{emit:()=>{},listen:()=>i(void 0,null,function*(){})},app:{getVersion:()=>window.Flooed.version},process:{relaunch:()=>window.Flooed.invoke("relaunch")},apiWindow:{appWindow:{setFullscreen:e=>window.Flooed.invoke("set_fullscreen",e)}}};var h={name:"Unknown",invoke:()=>i(void 0,null,function*(){}),event:{emit:()=>{},listen:()=>i(void 0,null,function*(){})},app:{getVersion:()=>"0.0.0"},process:{relaunch:()=>{}},apiWindow:{appWindow:{setFullscreen:()=>{}}}};var d="None";window.Dorion?d="Dorion":window.Flooed&&(d="Flooed");var a;switch(d){case"Dorion":a=y;break;case"Flooed":a=T;break;default:a=h;break}var ee=window[d];var oe=a.name,F=a.invoke,v=a.event,ne=a.app,te=a.process,re=a.apiWindow;var{flux:{dispatcher:b,stores:{MediaEngineStore:l}},observeDom:p}=shelter,B=[],x=[],C=[],L='div[class*="pttToolsMessage_"]',N='div[class*="radioBar_"]',H='div[class*="layerContainer_"] div[class*="layer_"]',g=()=>C.forEach(e=>e()),O=e=>i(void 0,null,function*(){if(e.section!=="Voice & Video"){g();return}C.push(p(L,o=>{o.remove()}),p(H,o=>{if(o.id)return;o.innerHTML="";let n=p('div[class*="backdrop_"]',t=>{t.click(),n()})}),p(N,o=>{let n='div[class*="info_"] div[class*="text"]',t=o.querySelector(n);t.textContent.includes("(")&&(t.textContent=t.textContent.replace(/\(.+?\)/g,""))}))}),K=e=>i(void 0,null,function*(){let{mode:o,options:{shortcut:n}}=e,r=n.map(c=>c[1]).map(c=>({code:k(m(c)),name:m(c)}));F("set_keybind",{action:"PUSH_TO_TALK",keys:r}),v.emit("ptt_toggled",{state:o==="PUSH_TO_TALK"})}),A;v.emit("ptt_toggled",{state:((A=l==null?void 0:l.getMode)==null?void 0:A.call(l))==="PUSH_TO_TALK"});x.push(b.subscribe("USER_SETTINGS_MODAL_SET_SECTION",O),b.subscribe("LAYER_POP",g),b.subscribe("AUDIO_SET_MODE",K));var M=()=>{g(),B.forEach(e=>e()),x.forEach(e=>e())};return W(P);})();
