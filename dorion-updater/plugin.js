(()=>{var U=Object.create;var l=Object.defineProperty;var A=Object.getOwnPropertyDescriptor;var N=Object.getOwnPropertyNames;var W=Object.getPrototypeOf,R=Object.prototype.hasOwnProperty;var B=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports),D=(e,n)=>{for(var o in n)l(e,o,{get:n[o],enumerable:!0})},_=(e,n,o,t)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of N(n))!R.call(e,r)&&r!==o&&l(e,r,{get:()=>n[r],enumerable:!(t=A(n,r))||t.enumerable});return e};var F=(e,n,o)=>(o=e!=null?U(W(e)):{},_(n||!e||!e.__esModule?l(o,"default",{value:e,enumerable:!0}):o,e)),I=e=>_(l({},"__esModule",{value:!0}),e);var a=(e,n,o)=>new Promise((t,r)=>{var C=s=>{try{p(o.next(s))}catch(u){r(u)}},T=s=>{try{p(o.throw(s))}catch(u){r(u)}},p=s=>s.done?t(s.value):Promise.resolve(s.value).then(C,T);p((o=o.apply(e,n)).next())});var w=B((j,g)=>{g.exports=shelter.solidWeb});var P={};D(P,{onUnload:()=>q});var d=F(w(),1);var h={invoke:(e,n)=>window.__TAURI__.invoke(e,n),event:{emit:(e,n)=>window.__TAURI__.event.emit(e,n),listen:(e,n)=>a(void 0,null,function*(){return window.__TAURI__.event.listen(e,n)})},app:{getVersion:()=>window.__TAURI__.app.getVersion(),getName:()=>window.__TAURI__.app.getName()},process:{relaunch:()=>window.__TAURI__.process.relaunch()},apiWindow:{appWindow:{setFullscreen:e=>window.__TAURI__.window.appWindow.setFullscreen(e)}}};var b={invoke:()=>a(void 0,null,function*(){}),event:{emit:()=>{},listen:()=>a(void 0,null,function*(){})},app:{getVersion:()=>"0.0.0",getName:()=>"None"},process:{relaunch:()=>{}},apiWindow:{appWindow:{setFullscreen:()=>{}}}};var k={invoke:()=>a(void 0,null,function*(){}),event:{emit:()=>{},listen:()=>a(void 0,null,function*(){})},app:{getVersion:()=>"0.0.0",getName:()=>"None"},process:{relaunch:()=>{}},apiWindow:{appWindow:{setFullscreen:()=>{}}}};var f="Dorion";window.Flooed&&(f="Flooed");var i;switch(f){case"Dorion":i=h;break;case"Flooed":i=b;break;default:i=k;break}var Z=window[f];var c=i.invoke,x=i.event,ee=i.app,v=i.process,ne=i.apiWindow;var{ui:{openModal:m,ModalRoot:M,ModalHeader:G,ModalBody:S,ModalConfirmFooter:V}}=shelter,y=e=>(0,d.createComponent)(M,{get children(){return[(0,d.createComponent)(G,{get close(){return e.onCancel},get children(){return e.header}}),(0,d.createComponent)(S,{get children(){return e.body}}),(0,d.createComponent)(V,{get onConfirm(){return e.onConfirm},get onCancel(){return e.onCancel},get confirmText(){return e.confirmText},get cancelText(){return e.cancelText},get type(){return e.type}})]}}),O=()=>a(void 0,null,function*(){console.log("[Updater] Checking for updates...");let e=JSON.parse(yield c("read_config_file")),n=yield c("update_check"),o=()=>{c("do_update",{toUpdate:n})};if(console.log(`[Updater] Dorion things to update: ${n}`),!(e.update_notify!==void 0&&!e.update_notify)){if(n.includes("dorion")){if(e.autoupdate){m(t=>y({header:"Dorion Update",body:"A Dorion update has been fetched, and Dorion will restart momentarily.",confirmText:"Got it!",type:"neutral",onConfirm:()=>o(),onCancel:t.close})),o();return}m(t=>y({header:"Updates Available!",body:"There are Dorion updates available. Would you like to apply them? This notification can be disabled in Dorion Settings",confirmText:"Yes please!",cancelText:"Nope!",type:"neutral",onConfirm:()=>o(),onCancel:t.close}))}x.once("update_complete",()=>{m(t=>y({header:"Update Complete!",body:"The update has been applied! Please restart to apply the changes.",confirmText:"Okay!",type:"neutral",onConfirm:()=>v.relaunch(),onCancel:t.close}))})}}),q=()=>{};O();return I(P);})();
