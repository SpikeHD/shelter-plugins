(()=>{var u=Object.defineProperty;var U=Object.getOwnPropertyDescriptor;var v=Object.getOwnPropertyNames;var x=Object.prototype.hasOwnProperty;var A=(e,n)=>{for(var o in n)u(e,o,{get:n[o],enumerable:!0})},D=(e,n,o,c)=>{if(n&&typeof n=="object"||typeof n=="function")for(let i of v(n))!x.call(e,i)&&i!==o&&u(e,i,{get:()=>n[i],enumerable:!(c=U(n,i))||c.enumerable});return e};var I=e=>D(u({},"__esModule",{value:!0}),e);var t=(e,n,o)=>new Promise((c,i)=>{var F=r=>{try{l(o.next(r))}catch(d){i(d)}},O=r=>{try{l(o.throw(r))}catch(d){i(d)}},l=r=>r.done?c(r.value):Promise.resolve(r.value).then(F,O);l((o=o.apply(e,n)).next())});var R={};A(R,{onUnload:()=>y});var _={name:"Dorion",invoke:(e,n)=>window.__TAURI__.invoke(e,n),event:{emit:(e,n)=>window.__TAURI__.event.emit(e,n),listen:(e,n)=>t(void 0,null,function*(){return window.__TAURI__.event.listen(e,n)})},app:{getVersion:()=>window.__TAURI__.app.getVersion(),getName:()=>window.__TAURI__.app.getName()},process:{relaunch:()=>window.__TAURI__.process.relaunch()},apiWindow:{appWindow:{setFullscreen:e=>window.__TAURI__.window.appWindow.setFullscreen(e)}}};var w={name:"Flooed",invoke:()=>t(void 0,null,function*(){}),event:{emit:()=>{},listen:()=>t(void 0,null,function*(){})},app:{getVersion:()=>"0.0.0",getName:()=>"None"},process:{relaunch:()=>{}},apiWindow:{appWindow:{setFullscreen:()=>{}}}};var b={name:"Unknown",invoke:()=>t(void 0,null,function*(){}),event:{emit:()=>{},listen:()=>t(void 0,null,function*(){})},app:{getVersion:()=>"0.0.0",getName:()=>"None"},process:{relaunch:()=>{}},apiWindow:{appWindow:{setFullscreen:()=>{}}}};var p="None";window.Dorion?p="Dorion":window.Flooed&&(p="Flooed");var s;switch(p){case"Dorion":s=_;break;case"Flooed":s=w;break;default:s=b;break}var q=window[p];var H=s.name,j=s.invoke,z=s.event,J=s.app,K=s.process,m=s.apiWindow;var{flux:{dispatcher:a}}=shelter,N=!1,f=e=>t(void 0,null,function*(){var o;if(N)return;let n=document.querySelector("#dorion_topbar");n&&(n.style.display=e!=null&&e.isElementFullscreen?"none":"initial"),(o=m.appWindow)==null||o.setFullscreen(e==null?void 0:e.isElementFullscreen)}),W=e=>{N=e},g=()=>{W(!1)},k=()=>{W(!0)};a.subscribe("WINDOW_FULLSCREEN_CHANGE",f);a.subscribe("POPOUT_WINDOW_OPEN",k);a.subscribe("WINDOW_UNLOAD",g);var y=()=>{a.unsubscribe("WINDOW_FULLSCREEN_CHANGE",f),a.unsubscribe("POPOUT_WINDOW_OPEN",k),a.unsubscribe("WINDOW_UNLOAD",g)};return I(R);})();
