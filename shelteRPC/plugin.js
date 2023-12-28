(()=>{var $e=Object.create;var z=Object.defineProperty;var xe=Object.getOwnPropertyDescriptor;var Ce=Object.getOwnPropertyNames,Y=Object.getOwnPropertySymbols,we=Object.getPrototypeOf,q=Object.prototype.hasOwnProperty,Pe=Object.prototype.propertyIsEnumerable;var J=(e,t,a)=>t in e?z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,K=(e,t)=>{for(var a in t||={})q.call(t,a)&&J(e,a,t[a]);if(Y)for(var a of Y(t))Pe.call(t,a)&&J(e,a,t[a]);return e};var be=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),je=(e,t)=>{for(var a in t)z(e,a,{get:t[a],enumerable:!0})},Q=(e,t,a,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Ce(t))!q.call(e,r)&&r!==a&&z(e,r,{get:()=>t[r],enumerable:!(n=xe(t,r))||n.enumerable});return e};var g=(e,t,a)=>(a=e!=null?$e(we(e)):{},Q(t||!e||!e.__esModule?z(a,"default",{value:e,enumerable:!0}):a,e)),ze=e=>Q(z({},"__esModule",{value:!0}),e);var v=(e,t,a)=>new Promise((n,r)=>{var s=o=>{try{l(a.next(o))}catch(i){r(i)}},d=o=>{try{l(a.throw(o))}catch(i){r(i)}},l=o=>o.done?n(o.value):Promise.resolve(o.value).then(s,d);l((a=a.apply(e,t)).next())});var _=be((mt,X)=>{X.exports=shelter.solidWeb});var dt={};je(dt,{generateAssetId:()=>W,onLoad:()=>st,onUnload:()=>lt});var pe=g(_(),1),ye=g(_(),1),C=g(_(),1),u=g(_(),1);var b=g(_(),1),ne=g(_(),1),h=g(_(),1),k=g(_(),1),x=g(_(),1),N=g(_(),1);var ee=e=>{let a=Date.now()-e,n=Math.floor(a/1e3),r=Math.floor(n/60),s=Math.floor(r/60),d=Math.floor(s/24);return d>0?`${d} day${d>1?"s":""} ago`:s>0?`${s} hour${s>1?"s":""} ago`:r>0?`${r} minute${r>1?"s":""} ago`:"Just now"};var te="._gameCard_1jztg_1{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%;height:72px;border-radius:5px;color:var(--text-normal);margin:12px 0}._gameCard_1jztg_1._cardNone_1jztg_1{background-color:var(--background-secondary)}._gameCard_1jztg_1._cardPlaying_1jztg_1{background-color:var(--status-positive-background)}._gameCard_1jztg_1._cardPlaying_1jztg_1 ._gameCardIcons_1jztg_1{color:var(--green-230)}._gameCard_1jztg_1._cardPlayed_1jztg_1{background:rgba(0,0,0,0);border-radius:0;border-bottom:1px solid var(--primary-500)}._gameCard_1jztg_1._cardPlayed_1jztg_1 ._gameCardLastPlayed_1jztg_1{color:var(--text-muted)}._gameCard_1jztg_1._cardPlayed_1jztg_1 ._lastPlayedTimestamp_1jztg_1{font-weight:bold}._gameCardInfo_1jztg_1{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;width:70%;height:100%;padding:0 20px}._gameCardName_1jztg_1{font-weight:bold}._gameCardIcons_1jztg_1{display:flex;flex-direction:row;align-items:center;justify-content:flex-end;height:100%;padding:0 20px;color:var(--primary-400)}._gameCardIcons_1jztg_1 span{margin:4px;width:24px;height:24px;cursor:pointer}._gameCardIcons_1jztg_1 span:hover{color:var(--text-normal)}._gameCardIcons_1jztg_1 span svg{width:100%;height:100%}._trash_1jztg_1:hover{color:var(--status-danger) !important}",p={gameCard:"_gameCard_1jztg_1",cardNone:"_cardNone_1jztg_1",cardPlaying:"_cardPlaying_1jztg_1",gameCardIcons:"_gameCardIcons_1jztg_1",cardPlayed:"_cardPlayed_1jztg_1",gameCardLastPlayed:"_gameCardLastPlayed_1jztg_1",lastPlayedTimestamp:"_lastPlayedTimestamp_1jztg_1",gameCardInfo:"_gameCardInfo_1jztg_1",gameCardName:"_gameCardName_1jztg_1",trash:"_trash_1jztg_1"};var ke=(0,b.template)('<svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path><path fill="currentColor" d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"></path></svg>',6),Ne=(0,b.template)('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"></path></svg>',4),Ie=(0,b.template)('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z"></path></svg>',4),Se=(0,b.template)("<div><div><span></span><span></span></div><div></div></div>",10),H=(0,b.template)("<span></span>",2),{ui:{injectCss:Ae},plugin:{store:$},solid:{createSignal:Te}}=shelter,Le=()=>ke.cloneNode(!0),Me=()=>Ne.cloneNode(!0),Re=()=>Ie.cloneNode(!0),ae=!1,He=e=>{window.dorion&&window.__TAURI__.event.emit("remove_detectable",{name:e,exe:""});let t=Object.keys($.previouslyPlayed).find(a=>$.previouslyPlayed[a].name===e);delete $.previouslyPlayed[t],$.currentlyPlaying===e&&($.currentlyPlaying="")},S=e=>{var n;ae||(ae=!0,Ae(te));let[t,a]=Te(e.name?(n=$.previouslyPlayed[e.name])==null?void 0:n.hide:!1);return(()=>{let r=Se.cloneNode(!0),s=r.firstChild,d=s.firstChild,l=d.nextSibling,o=s.nextSibling;return(0,x.insert)(d,()=>e.name||"No game detected"),(0,x.insert)(l,(()=>{let i=(0,N.memo)(()=>e.type==="played");return()=>i()?["Last played: ",(()=>{let c=H.cloneNode(!0);return(0,x.insert)(c,()=>ee(e.lastPlayed)),(0,k.effect)(()=>(0,h.className)(c,p.lastPlayedTimestamp)),c})()]:e.type==="playing"&&e.name?"Now playing!":"What are you playing?"})()),(0,x.insert)(o,(()=>{let i=(0,N.memo)(()=>!!e.local);return()=>i()&&(()=>{let c=H.cloneNode(!0);return c.$$click=()=>{He(e.name||"")},(0,x.insert)(c,Le),(0,k.effect)(()=>(0,h.className)(c,p.trash)),c})()})(),null),(0,x.insert)(o,(()=>{let i=(0,N.memo)(()=>!!(e.name&&e.type!=="playing"));return()=>i()&&(()=>{let c=H.cloneNode(!0);return c.$$click=()=>{if(!e.name)return;let f=Object.keys($.previouslyPlayed).find(P=>$.previouslyPlayed[P].name===e.name);$.previouslyPlayed[f].hide=!t(),a(!t())},(0,x.insert)(c,(()=>{let f=(0,N.memo)(()=>!!t());return()=>f()?Re():Me()})()),(0,k.effect)(()=>(0,h.className)(c,p.hide)),c})()})(),null),(0,k.effect)(i=>{let c=p.gameCard+" "+(e.type==="playing"&&e.name?p.cardPlaying:e.type==="played"?p.cardPlayed:p.cardNone),f=p.gameCardInfo,P=p.gameCardName,Z=p.gameCardLastPlayed,F=p.gameCardIcons;return c!==i._v$&&(0,h.className)(r,i._v$=c),f!==i._v$2&&(0,h.className)(s,i._v$2=f),P!==i._v$3&&(0,h.className)(d,i._v$3=P),Z!==i._v$4&&(0,h.className)(l,i._v$4=Z),F!==i._v$5&&(0,h.className)(o,i._v$5=F),i},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0}),r})()};(0,ne.delegateEvents)(["click"]);var D=g(_(),1),T=g(_(),1),V=g(_(),1),ce=g(_(),1),L=g(_(),1),me=g(_(),1),I=g(_(),1);var re="._ddown_1dg83_1{box-sizing:border-box;font-size:16px;width:100%;border-radius:3px;color:var(--text-normal);background-color:var(--input-background);border:none;transition:border-color .2s ease-in-out;padding:10px;appearance:none;cursor:pointer}._dcontainer_1dg83_1{position:relative;width:100%}._dsarrow_1dg83_1{position:absolute;right:10px;top:50%;transform:translateY(-50%);pointer-events:none}._dsarrow_1dg83_1 path{fill:var(--header-secondary)}",A={ddown:"_ddown_1dg83_1",dcontainer:"_dcontainer_1dg83_1",dsarrow:"_dsarrow_1dg83_1"};var oe=g(_(),1),ie=g(_(),1),se=g(_(),1),Ve=(0,oe.template)('<svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"></path></svg>',4),le=e=>(()=>{let t=Ve.cloneNode(!0);return(0,se.effect)(()=>(0,ie.setAttribute)(t,"class",e.class)),t})();var De=(0,D.template)("<div><select></select></div>",4),Ue=(0,D.template)("<option></option>",2),{ui:{injectCss:Ee}}=shelter,de=!1,_e=e=>(de||(de=!0,Ee(re)),(()=>{let t=De.cloneNode(!0),a=t.firstChild;return(0,me.addEventListener)(a,"change",e.onChange),(0,L.insert)(a,()=>{var n;return(n=e.options)==null?void 0:n.map(r=>(()=>{let s=Ue.cloneNode(!0);return(0,L.insert)(s,()=>r.label),(0,I.effect)(()=>s.selected=r.value===(e==null?void 0:e.selected)),(0,I.effect)(()=>s.value=r.value),s})())}),(0,L.insert)(t,(0,ce.createComponent)(le,{get class(){return A.dsarrow}}),null),(0,I.effect)(n=>{let r=A.dcontainer,s=A.ddown,d=e.placeholder,l=e.id,o=e["aria-label"],i=e.disabled;return r!==n._v$&&(0,V.className)(t,n._v$=r),s!==n._v$2&&(0,V.className)(a,n._v$2=s),d!==n._v$3&&(0,T.setAttribute)(a,"placeholder",n._v$3=d),l!==n._v$4&&(0,T.setAttribute)(a,"id",n._v$4=l),o!==n._v$5&&(0,T.setAttribute)(a,"aria-label",n._v$5=o),i!==n._v$6&&(a.disabled=n._v$6=i),n},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0,_v$6:void 0}),(0,I.effect)(()=>a.value=e.value),t})());var ge="._description_1kj0u_1{margin-top:8px;margin-bottom:8px}._addIt_1kj0u_1{margin-top:8px;margin-bottom:28px}._shead_1kj0u_1{margin-bottom:12px}._addhead_1kj0u_1{margin-top:42px;margin-bottom:12px}._modalhead_1kj0u_1{margin-top:12px}",j={description:"_description_1kj0u_1",addIt:"_addIt_1kj0u_1",shead:"_shead_1kj0u_1",addhead:"_addhead_1kj0u_1",modalhead:"_modalhead_1kj0u_1"};var Oe=(0,pe.template)('<a target="_blank">Add it!</a>',2),{ui:{Divider:Ge,Header:U,HeaderTags:Be,Text:E,TextBox:We,injectCss:Ze,openModal:Fe,ModalRoot:Ye,ModalHeader:Je,ModalBody:qe,ModalConfirmFooter:Ke},solid:{createSignal:w,createEffect:ve},plugin:{store:M}}=shelter,{invoke:fe,event:Qe}=(window==null?void 0:window.__TAURI__)||{invoke:()=>{},event:{emit:()=>{}}},ue=!1,he=()=>{ue||(ue=!0,Ze(ge));let[e,t]=w(!1),[a,n]=w(""),[r,s]=w({}),[d,l]=w([]);return ve(()=>v(void 0,null,function*(){var i;t((yield(i=window==null?void 0:window.__TAURI__)==null?void 0:i.app.getName())==="Dorion"),n(M.currentlyPlaying||""),s(M.previouslyPlayed||{}),l(e&&(yield fe("get_local_detectables")));let o=()=>{for(let c of d()){let f=Object.values(r()).findIndex(P=>P.name===c.name);f!==-1&&(r()[Object.keys(r())[f]].local=!0)}};o(),setInterval(()=>{n(M.currentlyPlaying||""),s(M.previouslyPlayed||{}),o()},2e3)})),[(0,u.createComponent)(U,{get tag(){return Be.H1},get class(){return j.shead},children:"Registered Games"}),(0,u.createComponent)(E,{get class(){return j.description},children:"ShelteRPC will automatically update your status based on the game you're playing (if detectable). You can also manually add games to this list if it isn't being detected."}),(0,u.createComponent)(Ge,{mt:20,mb:20}),(0,C.memo)((()=>{let o=(0,C.memo)(()=>!!a());return()=>o()?(0,u.createComponent)(S,{get name(){return a()},type:"playing",get local(){var i;return((i=Object.values(r()).find(c=>c.name===a()))==null?void 0:i.local)||!1}}):(0,u.createComponent)(S,{type:"none"})})()),(0,u.createComponent)(E,{get class(){return j.addIt},get children(){return["Not seeing your game? ",(0,C.memo)(()=>(0,C.memo)(()=>!!e())()?(()=>{let o=Oe.cloneNode(!0);return o.$$click=Xe,o})():"Adding it is unsupported.")]}}),(0,u.createComponent)(U,{get class(){return j.addhead},children:"Added Games"}),(0,C.memo)(()=>Object.values(r()).map(o=>o.name===a()?null:(0,u.createComponent)(S,{get name(){return o.name},get lastPlayed(){return o.lastPlayed},type:"played",get local(){return o==null?void 0:o.local}})))]};function Xe(){let[e,t]=w([]),[a,n]=w(0),[r,s]=w("");ve(()=>v(this,null,function*(){let d=yield fe("get_windows");t(d)})),Fe(d=>(0,u.createComponent)(Ye,{get children(){return[(0,u.createComponent)(Je,{get close(){return d.close},children:"Add a game"}),(0,u.createComponent)(qe,{get children(){return(0,C.memo)(()=>e().length>0)()?[(0,u.createComponent)(_e,{get options(){return e().filter((l,o,i)=>i.findIndex(c=>c.process_name===l.process_name)===o).map(l=>({label:l.process_name,value:l.pid}))},placeholder:"Select process...",maxVisibleItems:5,closeOnSelect:!0,onChange:l=>n(Number(l.target.value))}),(0,u.createComponent)(U,{get class(){return j.modalhead},children:"Name to Display"}),(0,u.createComponent)(We,{get value(){return r()},onInput:l=>s(l),placeholder:"Enter the name to display..."})]:(0,u.createComponent)(E,{children:"Please wait..."})}}),(0,u.createComponent)(Ke,{onConfirm:()=>{var l;Qe.emit("add_detectable",{exe:(l=e().find(o=>o.pid===a()))==null?void 0:l.process_name,name:r()})},get onCancel(){return d.close},confirmText:"Add",cancelText:"Cancel",type:"neutral"})]}}))}(0,ye.delegateEvents)(["click"]);var{flux:{dispatcher:et,stores:{GameStore:tt}},settings:{registerSection:at},ui:{showToast:O},plugin:{store:y},http:nt}=shelter,B=()=>{},G={},m,R={};y.currentlyPlaying="";function rt(e){return v(this,null,function*(){var t;return((t=tt.getGameByName(e))==null?void 0:t.name)||"Unknown"})}var W=(e,t)=>v(void 0,null,function*(){var n;if(!G[e]){let r=yield nt.get(`/oauth2/applications/${e}/assets`);r.status!==200&&console.log("Failed to fetch assets"),G[e]=r.body}return(n=G[e].find(r=>r.name===t))==null?void 0:n.id});function ot(e){return v(this,null,function*(){var n,r,s,d,l;let t=JSON.parse(e.data),a=(n=t.activity)==null?void 0:n.assets;if(a!=null&&a.large_image&&(a.large_image=yield W(t.activity.application_id,a.large_image)),a!=null&&a.small_image&&(a.small_image=yield W(t.activity.application_id,a.small_image)),t.activity){let o=t.activity.application_id;R[o]||(R[o]=yield rt(t.activity.name));let i=R[o];if(typeof i!="string"&&((r=t.activity).name||(r.name=i.name)),y.currentlyPlaying=t.activity.name,y.previouslyPlayed||(y.previouslyPlayed={}),!((s=t.activity)!=null&&s.name))return;t.activity.name in y.previouslyPlayed||(y.previouslyPlayed[t.activity.name]={}),y.previouslyPlayed[t.activity.name].name=t.activity.name,y.previouslyPlayed[t.activity.name].appid=t.activity.application_id,y.previouslyPlayed[t.activity.name].lastPlayed=Date.now(),y.previouslyPlayed[t.activity.name].local=t.activity.application_id==="1337"}else y.currentlyPlaying="";(l=y.previouslyPlayed[(d=t.activity)==null?void 0:d.name])!=null&&l.hide||et.dispatch(K({type:"LOCAL_ACTIVITY_UPDATE"},t))})}var it=(e,t=5,a=500)=>v(void 0,null,function*(){let n;for(let r=0;r<t;r++){if(n=yield e(r),n)return n;yield new Promise(s=>setTimeout(s,a))}return n}),st=()=>v(void 0,null,function*(){m&&(m!=null&&m.close)&&m.close();let e=yield it(t=>v(void 0,null,function*(){var a;return m=new WebSocket("ws://127.0.0.1:1337"),m.onmessage=ot,m.onerror=n=>{throw n},yield new Promise(n=>setTimeout(n,1e3)),m.readyState!==WebSocket.OPEN?((a=m==null?void 0:m.close)==null||a.call(m),m=null,O({title:"ShelteRPC",content:`Unable to connect to ShelteRPC server (${t})`,duration:2e3}),!1):!0}),3,3e3);B=at("section","shelterpc","Registered Games",he),e&&(m.onclose=()=>{O({title:"ShelteRPC",content:"ShelteRPC server disconnected",duration:3e3})},O({title:"ShelteRPC",content:"Connected to ShelteRPC server",duration:3e3}))}),lt=()=>v(void 0,null,function*(){var e;m!=null&&m.close&&((e=m.close)==null||e.call(m)),B&&B()});return ze(dt);})();
