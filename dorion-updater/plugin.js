(()=>{var W=Object.create;var c=Object.defineProperty;var A=Object.getOwnPropertyDescriptor;var F=Object.getOwnPropertyNames;var R=Object.getPrototypeOf,I=Object.prototype.hasOwnProperty;var B=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports),N=(e,n)=>{for(var o in n)c(e,o,{get:n[o],enumerable:!0})},y=(e,n,o,t)=>{if(n&&typeof n=="object"||typeof n=="function")for(let i of F(n))!I.call(e,i)&&i!==o&&c(e,i,{get:()=>n[i],enumerable:!(t=A(n,i))||t.enumerable});return e};var $=(e,n,o)=>(o=e!=null?W(R(e)):{},y(n||!e||!e.__esModule?c(o,"default",{value:e,enumerable:!0}):o,e)),M=e=>y(c({},"__esModule",{value:!0}),e);var a=(e,n,o)=>new Promise((t,i)=>{var C=s=>{try{w(o.next(s))}catch(m){i(m)}},U=s=>{try{w(o.throw(s))}catch(m){i(m)}},w=s=>s.done?t(s.value):Promise.resolve(s.value).then(C,U);w((o=o.apply(e,n)).next())});var k=B((H,g)=>{g.exports=shelter.solidWeb});var q={};N(q,{onUnload:()=>O});var l=$(k(),1);var b={name:"Dorion",invoke:(e,n)=>{var o;return(o=window.__TAURI__)!=null&&o.invoke?window.__TAURI__.invoke(e,n):window.__TAURI__.core.invoke(e,n)},event:{emit:(e,n)=>window.__TAURI__.event.emit(e,n),listen:(e,n)=>a(void 0,null,function*(){return window.__TAURI__.event.listen(e,n)})},app:{getVersion:()=>window.__TAURI__.app.getVersion()},process:{relaunch:()=>window.__TAURI__.process.relaunch()},apiWindow:{appWindow:{setFullscreen:e=>{var n,o;return(o=(n=window.__TAURI__)==null?void 0:n.webviewWindow)!=null&&o.getCurrentWebviewWindow?window.__TAURI__.webviewWindow.getCurrentWebviewWindow().setFullscreen(e):window.__TAURI__.window.appWindow.setFullscreen(e)}}}};var h={name:"Flooed",invoke:(e,n)=>window.Flooed.invoke(e,n),event:{emit:()=>{},listen:()=>a(void 0,null,function*(){})},app:{getVersion:()=>window.Flooed.version},process:{relaunch:()=>window.Flooed.invoke("relaunch")},apiWindow:{appWindow:{setFullscreen:e=>window.Flooed.invoke("set_fullscreen",e)}}};var v={name:"Unknown",invoke:()=>a(void 0,null,function*(){}),event:{emit:()=>{},listen:()=>a(void 0,null,function*(){})},app:{getVersion:()=>"0.0.0"},process:{relaunch:()=>{}},apiWindow:{appWindow:{setFullscreen:()=>{}}}};var p="None";window.Dorion?p="Dorion":window.Flooed&&(p="Flooed");var r;switch(p){case"Dorion":r=b;break;case"Flooed":r=h;break;default:r=v;break}var ee=window[p];var d=r.name,u=r.invoke,x=r.event,ne=r.app,T=r.process,oe=r.apiWindow;var{ui:{openModal:_,ModalRoot:D,ModalHeader:G,ModalBody:P,ModalConfirmFooter:S}}=shelter,f=e=>(0,l.createComponent)(D,{get children(){return[(0,l.createComponent)(G,{get close(){return e.onCancel},get children(){return e.header}}),(0,l.createComponent)(P,{get children(){return e.body}}),(0,l.createComponent)(S,{get onConfirm(){return e.onConfirm},get onCancel(){return e.onCancel},get confirmText(){return e.confirmText},get cancelText(){return e.cancelText},get type(){return e.type}})]}}),V=()=>a(void 0,null,function*(){console.log("[Updater] Checking for updates...");let e=JSON.parse(yield u("read_config_file")),n=yield u("update_check"),o=()=>{u("do_update",{toUpdate:n})};if(console.log(`[Updater] ${d} things to update: ${n}`),!(e.update_notify!==void 0&&!e.update_notify)){if(n.includes("dorion")){if(e.autoupdate){_(t=>f({header:`${d} Update`,body:`A ${d} update has been fetched, and ${d} will restart momentarily.`,confirmText:"Got it!",type:"neutral",onConfirm:()=>o(),onCancel:t.close})),o();return}_(t=>f({header:"Updates Available!",body:`There are ${d} updates available. Would you like to apply them? This notification can be disabled in ${d} Settings`,confirmText:"Yes please!",cancelText:"Nope!",type:"neutral",onConfirm:()=>o(),onCancel:t.close}))}x.once("update_complete",()=>{_(t=>f({header:"Update Complete!",body:"The update has been applied! Please restart to apply the changes.",confirmText:"Okay!",type:"neutral",onConfirm:()=>T.relaunch(),onCancel:t.close}))})}}),O=()=>{};V();return M(q);})();
