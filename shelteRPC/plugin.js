(()=>{var q=Object.create;var v=Object.defineProperty;var z=Object.getOwnPropertyDescriptor;var K=Object.getOwnPropertyNames,U=Object.getOwnPropertySymbols,Q=Object.getPrototypeOf,D=Object.prototype.hasOwnProperty,X=Object.prototype.propertyIsEnumerable;var k=(t,e,a)=>e in t?v(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,G=(t,e)=>{for(var a in e||={})D.call(e,a)&&k(t,a,e[a]);if(U)for(var a of U(e))X.call(e,a)&&k(t,a,e[a]);return t};var Z=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),ee=(t,e)=>{for(var a in e)v(t,a,{get:e[a],enumerable:!0})},L=(t,e,a,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of K(e))!D.call(t,n)&&n!==a&&v(t,n,{get:()=>e[n],enumerable:!(s=z(e,n))||s.enumerable});return t};var _=(t,e,a)=>(a=t!=null?q(Q(t)):{},L(e||!t||!t.__esModule?v(a,"default",{value:t,enumerable:!0}):a,t)),te=t=>L(v({},"__esModule",{value:!0}),t);var g=(t,e,a)=>new Promise((s,n)=>{var r=l=>{try{p(a.next(l))}catch(u){n(u)}},o=l=>{try{p(a.throw(l))}catch(u){n(u)}},p=l=>l.done?s(l.value):Promise.resolve(l.value).then(r,o);p((a=a.apply(t,e)).next())});var d=Z((Pe,j)=>{j.exports=shelter.solidWeb});var he={};ee(he,{generateAssetId:()=>A,onLoad:()=>ue,onUnload:()=>fe});var Y=_(d(),1),h=_(d(),1),m=_(d(),1);var N=_(d(),1),f=_(d(),1),w=_(d(),1),C=_(d(),1),B=_(d(),1);var M=t=>{let a=Date.now()-t,s=Math.floor(a/1e3),n=Math.floor(s/60),r=Math.floor(n/60),o=Math.floor(r/24);return o>0?`${o} day${o>1?"s":""} ago`:r>0?`${r} hour${r>1?"s":""} ago`:n>0?`${n} minute${n>1?"s":""} ago`:"Just now"};var O="._gameCard_1h8rn_1{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%;height:72px;border-radius:5px;color:var(--text-normal);margin:12px 0}._gameCard_1h8rn_1._cardNone_1h8rn_1{background-color:var(--primary-400)}._gameCard_1h8rn_1._cardPlaying_1h8rn_1{background-color:var(--green-400)}._gameCard_1h8rn_1._cardPlayed_1h8rn_1{background:rgba(0,0,0,0);border-radius:0;border-bottom:1px solid var(--text-muted)}._gameCard_1h8rn_1._cardPlayed_1h8rn_1 ._gameCardLastPlayed_1h8rn_1{color:var(--text-muted)}._gameCard_1h8rn_1._cardPlayed_1h8rn_1 ._lastPlayedTimestamp_1h8rn_1{font-weight:bold}._gameCardInfo_1h8rn_1{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;width:70%;height:100%;padding:0 20px}._gameCardName_1h8rn_1{font-weight:bold}",c={gameCard:"_gameCard_1h8rn_1",cardNone:"_cardNone_1h8rn_1",cardPlaying:"_cardPlaying_1h8rn_1",cardPlayed:"_cardPlayed_1h8rn_1",gameCardLastPlayed:"_gameCardLastPlayed_1h8rn_1",lastPlayedTimestamp:"_lastPlayedTimestamp_1h8rn_1",gameCardInfo:"_gameCardInfo_1h8rn_1",gameCardName:"_gameCardName_1h8rn_1"};var ae=(0,N.template)("<div><div><span></span><span></span></div><div></div></div>",10),ne=(0,N.template)("<span></span>",2),{ui:{injectCss:re}}=shelter,W=!1,x=t=>(W||(W=!0,re(O)),(()=>{let e=ae.cloneNode(!0),a=e.firstChild,s=a.firstChild,n=s.nextSibling;return(0,C.insert)(s,()=>t.name||"No game detected"),(0,C.insert)(n,(()=>{let r=(0,B.memo)(()=>t.type==="played");return()=>r()?["Last played: ",(()=>{let o=ne.cloneNode(!0);return(0,C.insert)(o,()=>M(t.lastPlayed)),(0,w.effect)(()=>(0,f.className)(o,c.lastPlayedTimestamp)),o})()]:t.type==="playing"?"Now playing!":"What are you playing?"})()),(0,w.effect)(r=>{let o=c.gameCard+" "+(t.type==="playing"?c.cardPlaying:t.type==="played"?c.cardPlayed:c.cardNone),p=c.gameCardInfo,l=c.gameCardName,u=c.gameCardLastPlayed;return o!==r._v$&&(0,f.className)(e,r._v$=o),p!==r._v$2&&(0,f.className)(a,r._v$2=p),l!==r._v$3&&(0,f.className)(s,r._v$3=l),u!==r._v$4&&(0,f.className)(n,r._v$4=u),r},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),e})());var E="._description_1sucy_1{margin-top:8px;margin-bottom:8px}._addIt_1sucy_1{margin-top:8px;margin-bottom:28px}._shead_1sucy_1{margin-bottom:12px}._addhead_1sucy_1{margin-top:42px;margin-bottom:12px}",P={description:"_description_1sucy_1",addIt:"_addIt_1sucy_1",shead:"_shead_1sucy_1",addhead:"_addhead_1sucy_1"};var oe=(0,Y.template)('<a target="_blank">Add it!</a>',2),{ui:{Divider:se,Header:H,Button:Ie,HeaderTags:ie,TextBox:Re,Text:F,injectCss:le},solid:{createSignal:S,createEffect:de},plugin:{store:$}}=shelter,J=!1,V=()=>{J||(J=!0,le(E));let[t,e]=S(!1),[a,s]=S(""),[n,r]=S({});return de(()=>g(void 0,null,function*(){var o;e((yield(o=window==null?void 0:window.__TAURI__)==null?void 0:o.app.getName())==="Dorion"),s($.currentlyPlaying||""),r($.previouslyPlayed||{}),setInterval(()=>{s($.currentlyPlaying||""),r($.previouslyPlayed||{})},2e3)})),[(0,m.createComponent)(H,{get tag(){return ie.H1},get class(){return P.shead},children:"Registered Games"}),(0,m.createComponent)(F,{get class(){return P.description},children:"ShelteRPC will automatically update your status based on the game you're playing (if detectable). You can also manually add games to this list if it isn't being detected."}),(0,m.createComponent)(se,{mt:20,mb:20}),(0,h.memo)((()=>{let o=(0,h.memo)(()=>!!a());return()=>o()?(0,m.createComponent)(x,{get name(){return a()},type:"playing"}):(0,m.createComponent)(x,{type:"none"})})()),(0,m.createComponent)(F,{get class(){return P.addIt},get children(){return["Not seeing your game? ",(0,h.memo)(()=>(0,h.memo)(()=>!!t())()?oe.cloneNode(!0):"Adding it is unsupported.")]}}),(0,m.createComponent)(H,{get class(){return P.addhead},children:"Added Games"}),(0,h.memo)(()=>Object.values(n()).map(o=>o.name===a()?null:(0,m.createComponent)(x,{get name(){return o.name},get lastPlayed(){return o.lastPlayed},type:"played"})))]};var{flux:{dispatcher:ce,stores:{GameStore:me}},settings:{registerSection:_e},ui:{showToast:T},plugin:{store:y},http:ge}=shelter,R=()=>{},I={},i,b={};function ye(t){return g(this,null,function*(){var e;return((e=me.getGameByName(t))==null?void 0:e.name)||"Unknown"})}var A=(t,e)=>g(void 0,null,function*(){var s;if(!I[t]){let n=yield ge.get(`/oauth2/applications/${t}/assets`);n.status!==200&&console.log("Failed to fetch assets"),I[t]=n.body}return(s=I[t].find(n=>n.name===e))==null?void 0:s.id});function pe(t){return g(this,null,function*(){var s,n;let e=JSON.parse(t.data),a=(s=e.activity)==null?void 0:s.assets;if(a!=null&&a.large_image&&(a.large_image=yield A(e.activity.application_id,a.large_image)),a!=null&&a.small_image&&(a.small_image=yield A(e.activity.application_id,a.small_image)),e.activity){let r=e.activity.application_id;b[r]||(b[r]=yield ye(e.activity.name));let o=b[r];typeof o!="string"&&((n=e.activity).name||(n.name=o.name)),y.currentlyPlaying=e.activity.name,y.previouslyPlayed||(y.previouslyPlayed={}),e.activity.application_id in y.previouslyPlayed||(y.previouslyPlayed[e.activity.application_id]={}),y.previouslyPlayed[e.activity.application_id]={name:e.activity.name,lastPlayed:Date.now()}}else y.currentlyPlaying="";ce.dispatch(G({type:"LOCAL_ACTIVITY_UPDATE"},e))})}var ue=()=>g(void 0,null,function*(){i&&(i!=null&&i.close)&&i.close(),i=new WebSocket("ws://127.0.0.1:1337"),i.onmessage=pe,i.onerror=e=>console.error(e),(yield new Promise(e=>setTimeout(()=>{i.readyState!==WebSocket.OPEN&&(console.log(i),i==null||i.close(),i=null,T({title:"ShelteRPC",content:"Unable to connect to ShelteRPC server",duration:3e3}),e(!1)),e(!0)},1e3)))&&(i.onclose=()=>{T({title:"ShelteRPC",content:"ShelteRPC server disconnected",duration:3e3})},T({title:"ShelteRPC",content:"Connected to ShelteRPC server",duration:3e3}),R=_e("section","shelterpc","Registered Games",V))}),fe=()=>g(void 0,null,function*(){i==null||i.close(),R&&R()});return te(he);})();
