(()=>{var ot=Object.create;var z=Object.defineProperty,st=Object.defineProperties,at=Object.getOwnPropertyDescriptor,it=Object.getOwnPropertyDescriptors,lt=Object.getOwnPropertyNames,de=Object.getOwnPropertySymbols,ct=Object.getPrototypeOf,ue=Object.prototype.hasOwnProperty,dt=Object.prototype.propertyIsEnumerable;var _e=(e,t,n)=>t in e?z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,p=(e,t)=>{for(var n in t||={})ue.call(t,n)&&_e(e,n,t[n]);if(de)for(var n of de(t))dt.call(t,n)&&_e(e,n,t[n]);return e},f=(e,t)=>st(e,it(t));var _t=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),ut=(e,t)=>{for(var n in t)z(e,n,{get:t[n],enumerable:!0})},me=(e,t,n,c)=>{if(t&&typeof t=="object"||typeof t=="function")for(let d of lt(t))!ue.call(e,d)&&d!==n&&z(e,d,{get:()=>t[d],enumerable:!(c=at(t,d))||c.enumerable});return e};var i=(e,t,n)=>(n=e!=null?ot(ct(e)):{},me(t||!e||!e.__esModule?z(n,"default",{value:e,enumerable:!0}):n,e)),mt=e=>me(z({},"__esModule",{value:!0}),e);var m=(e,t,n)=>new Promise((c,d)=>{var r=u=>{try{o(n.next(u))}catch(h){d(h)}},a=u=>{try{o(n.throw(u))}catch(h){d(h)}},o=u=>u.done?c(u.value):Promise.resolve(u.value).then(r,a);o((n=n.apply(e,t)).next())});var s=_t((Xt,pe)=>{pe.exports=shelter.solidWeb});var Kt={};ut(Kt,{onUnload:()=>Zt});var ve=i(s(),1),we=i(s(),1),be=i(s(),1),H=i(s(),1),tn=i(s(),1),w=i(s(),1);var fe="._tophead_5o4a7_1{margin-bottom:16px}._shead_5o4a7_1{margin-top:32px;margin-bottom:8px}._pbuttons_5o4a7_1{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%;margin-top:16px}",O={tophead:"_tophead_5o4a7_1",shead:"_shead_5o4a7_1",pbuttons:"_pbuttons_5o4a7_1"};var pt=(0,ve.template)("<div></div>",2),{ui:{injectCss:ft,openConfirmationModal:ht,ModalRoot:on,ModalHeader:sn,ModalBody:an,ModalFooter:ln,SwitchItem:M,Button:G,ButtonLooks:cn,Header:q,HeaderTags:gt,showToast:vt},solid:{createSignal:he,createEffect:wt}}=shelter,{invoke:k,process:bt}=window.__TAURI__,ge=!1;function $e(){let[e,t]=he({cache_css:!1,streamer_mode_detection:!1,rpc_server:!1,auto_clear_cache:!1}),[n,c]=he("");ge||(ge=!0,ft(fe)),wt(()=>m(this,null,function*(){let o=yield k("read_config_file"),u=yield k("default_config");try{let h=yield k("get_platform");c(h)}catch(h){}try{t(JSON.parse(o))}catch(h){t(JSON.parse(u))}}));let d=()=>m(this,null,function*(){yield k("write_config_file",{contents:JSON.stringify(e())}),bt.relaunch()}),r=()=>m(this,null,function*(){yield k("clear_css_cache"),vt({title:"CSS Cache Cleared",duration:3e3})}),a=()=>{ht({body:()=>`
      Clearing web cache will log you out and reset your settings, but can often help solve permission-based issues.
      


      Do you want to proceed?
      `,header:()=>"Are you sure?",type:"neutral",confirmText:"Confirm"}).then(()=>k("set_clear_cache"),()=>{})};return[(0,w.createComponent)(q,{get tag(){return gt.H1},get class(){return O.tophead},children:"Dorion Performance Settings"}),(0,w.createComponent)(q,{get class(){return O.shead},children:"Cache"}),(0,w.createComponent)(M,{get value(){return e().cache_css},onChange:o=>t(f(p({},e()),{cache_css:o})),note:"Save CSS to disk that would otherwise be loaded from the web, decreasing load times.",children:"Cache CSS"}),(0,w.createComponent)(M,{get value(){return e().auto_clear_cache},onChange:o=>t(f(p({},e()),{auto_clear_cache:o})),get disabled(){return n()!=="windows"},get tooltipNote(){return n()!=="windows"&&"This is only supported on Windows right now."},note:"Clean out the web-based cache every time you close Dorion. This is usually cached images, scripts, and other data, and it can build up!",children:"Auto Clear Cache"}),(0,w.createComponent)(q,{get class(){return O.shead},children:"Optional Features"}),(0,w.createComponent)(M,{get value(){return e().streamer_mode_detection},onChange:o=>t(f(p({},e()),{streamer_mode_detection:o})),note:"Detect OBS and Streamlabs OBS and automatically enable streamer mode when they are running.",children:"Streamer Mode detection"}),(0,w.createComponent)(M,{get value(){return e().rpc_server},onChange:o=>t(f(p({},e()),{rpc_server:o})),tooltipNote:"This is a work in progress, and won't do EVERYTHING arRPC does quite yet.",note:"Enable the integrated RPC server, eliminating the need for a separate arRPC server running. Remember to enable the shelteRPC/arRPC plugin!",children:"Integrated rich presence server"}),(()=>{let o=pt.cloneNode(!0);return(0,H.insert)(o,(0,w.createComponent)(G,{onClick:d,style:{width:"30%",padding:"18px"},grow:!0,children:"Save and Restart"}),null),(0,H.insert)(o,(0,w.createComponent)(G,{onClick:a,style:{width:"30%",padding:"18px"},grow:!0,children:"Wipe all web-based data"}),null),(0,H.insert)(o,(0,w.createComponent)(G,{onClick:r,style:{width:"30%",padding:"18px"},s:!0,grow:!0,children:"Clear CSS Cache"}),null),(0,be.effect)(()=>(0,we.className)(o,O.pbuttons)),o})()]}var Oe=i(s(),1),je=i(s(),1),Ee=i(s(),1),Q=i(s(),1),vn=i(s(),1),x=i(s(),1);var Z=i(s(),1),U=i(s(),1),Y=i(s(),1),Te=i(s(),1),F=i(s(),1),ke=i(s(),1),j=i(s(),1);var ye="._ddown_ccz23_1{box-sizing:border-box;font-size:16px;width:100%;border-radius:3px;color:var(--text-normal);background-color:var(--input-background);border:none;transition:border-color .2s ease-in-out;padding:10px;appearance:none;cursor:pointer}._dcontainer_ccz23_1{position:relative;width:100%}._dsarrow_ccz23_1{position:absolute;right:10px;top:50%;transform:translateY(-50%);pointer-events:none}._dsarrow_ccz23_1 path{fill:var(--text-secondary)}",B={ddown:"_ddown_ccz23_1",dcontainer:"_dcontainer_ccz23_1",dsarrow:"_dsarrow_ccz23_1"};var xe=i(s(),1),Ce=i(s(),1),Se=i(s(),1),$t=(0,xe.template)('<svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"></path></svg>',4),Pe=e=>(()=>{let t=$t.cloneNode(!0);return(0,Se.effect)(()=>(0,Ce.setAttribute)(t,"class",e.class)),t})();var yt=(0,Z.template)("<div><select></select></div>",4),xt=(0,Z.template)("<option></option>",2),{ui:{injectCss:Ct}}=shelter,Ne=!1,E=e=>(Ne||(Ne=!0,Ct(ye)),(()=>{let t=yt.cloneNode(!0),n=t.firstChild;return(0,ke.addEventListener)(n,"change",e.onChange),(0,F.insert)(n,()=>{var c;return(c=e.options)==null?void 0:c.map(d=>(()=>{let r=xt.cloneNode(!0);return(0,F.insert)(r,()=>d.label),(0,j.effect)(()=>r.selected=d.value===(e==null?void 0:e.selected)),(0,j.effect)(()=>r.value=d.value),r})())}),(0,F.insert)(t,(0,Te.createComponent)(Pe,{get class(){return B.dsarrow}}),null),(0,j.effect)(c=>{let d=B.dcontainer,r=B.ddown,a=e.placeholder,o=e.id,u=e["aria-label"];return d!==c._v$&&(0,Y.className)(t,c._v$=d),r!==c._v$2&&(0,Y.className)(n,c._v$2=r),a!==c._v$3&&(0,U.setAttribute)(n,"placeholder",c._v$3=a),o!==c._v$4&&(0,U.setAttribute)(n,"id",c._v$4=o),u!==c._v$5&&(0,U.setAttribute)(n,"aria-label",c._v$5=u),c},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0}),(0,j.effect)(()=>n.value=e.value),t})());var De="._shead_15ahn_1{margin-top:32px;margin-bottom:8px}._sbutton_15ahn_1{margin-top:16px;padding:18px;width:100%}._splitbutton_15ahn_1{width:45%}._pbuttons_15ahn_1{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%;margin-top:16px}",D={shead:"_shead_15ahn_1",sbutton:"_sbutton_15ahn_1",splitbutton:"_splitbutton_15ahn_1",pbuttons:"_pbuttons_15ahn_1"};var St=(0,Oe.template)("<div></div>",2),{invoke:A,process:Pt}=window.__TAURI__,{ui:{Header:Ae,Button:K,HeaderTags:Nt,TextBox:Tt,injectCss:kt},solid:{createSignal:J,createEffect:Dt}}=shelter,ze=!1;function Ie(){let[e,t]=J([]),[n,c]=J(""),[d,r]=J(""),[a,o]=J("");ze||(ze=!0,kt(De)),Dt(()=>m(this,null,function*(){let l=yield A("get_profile_list");t(l);let g=JSON.parse(yield A("read_config_file"));c(g.profile||"default"),r(g.profile||"default")}));let u=()=>m(this,null,function*(){let l=JSON.parse(yield A("read_config_file"));l.profile=n(),yield A("write_config_file",{contents:JSON.stringify(l)}),Pt.relaunch()}),h=()=>m(this,null,function*(){yield A("delete_profile",{name:n()}),t(e().filter(l=>l!==n())),c(d())}),y=()=>m(this,null,function*(){yield A("create_profile",{name:a()}),e().includes(a())||t([...e(),a()]),c(a())}),N=l=>{o(l)};return[(0,x.createComponent)(Ae,{get tag(){return Nt.H1},children:"Profiles"}),(0,x.createComponent)(E,{get options(){return e().map(l=>({label:l,value:l}))},placeholder:"Select profile...",maxVisibleItems:5,closeOnSelect:!0,onChange:l=>c(l.target.value),get selected(){return n()}}),(0,x.createComponent)(Ae,{get class(){return D.shead},children:"Create Profile"}),(0,x.createComponent)(Tt,{type:"text",get value(){return a()},onInput:N,placeholder:"Enter a name for the new profile..."}),(0,x.createComponent)(K,{onClick:y,get class(){return D.sbutton},get disabled(){return a()===""||e().includes(a())},children:"Create Profile"}),(()=>{let l=St.cloneNode(!0);return(0,Q.insert)(l,(0,x.createComponent)(K,{onClick:u,get class(){return D.splitbutton},children:"Save and Restart"}),null),(0,Q.insert)(l,(0,x.createComponent)(K,{onClick:h,get class(){return D.splitbutton},get disabled(){return n()==="default"||d()===n},children:"Delete Selected Profile"}),null),(0,Ee.effect)(()=>(0,je.className)(l,D.pbuttons)),l})()]}var se=i(s(),1),re=i(s(),1),oe=i(s(),1),I=i(s(),1),On=i(s(),1),_=i(s(),1);var He=i(s(),1),Be=i(s(),1),Ue=i(s(),1),Fe=i(s(),1),Je=i(s(),1);var Le="._card_1uk2u_1{border:1px solid var(--background-tertiary);border-radius:4px}",Re={card:"_card_1uk2u_1"};var At=(0,He.template)("<div></div>",2),{ui:{injectCss:zt}}=shelter,Me=!1,V=e=>(Me||(Me=!0,zt(Le)),(()=>{let t=At.cloneNode(!0);return(0,Je.insert)(t,()=>e.children),(0,Fe.effect)(n=>{let c=Re.card,d=e.style;return c!==n._v$&&(0,Ue.className)(t,n._v$=c),n._v$2=(0,Be.style)(t,d,n._v$2),n},{_v$:void 0,_v$2:void 0}),t})());var te=i(s(),1),qe=i(s(),1),$=i(s(),1),X=i(s(),1),C=i(s(),1),S=i(s(),1);var Ve="._plist_1n17i_1{display:flex;flex-direction:column;align-items:center;justify-content:space-between;font-size:16px}._pheader_1n17i_1{border-bottom:1px solid var(--background-tertiary);font-weight:bold;padding-bottom:16px}._pbuttons_1n17i_1{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%;margin-top:16px}._pbuttons_1n17i_1 button{width:30%;padding:18px}._sbutton_1n17i_1{margin-top:16px;padding:18px;width:100%}._plistrow_1n17i_1{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%;padding:16px}._plistrow_1n17i_1 ._scell_1n17i_1{display:flex;align-items:center;justify-content:center;width:30%}._plistrow_1n17i_1 ._mcell_1n17i_1{display:flex;align-items:center;justify-content:flex-start;width:50%}._left16_1n17i_1{margin-left:16px}._top16_1n17i_1{margin-top:16px}._top32_1n17i_1{margin-top:32px}",v={plist:"_plist_1n17i_1",pheader:"_pheader_1n17i_1",pbuttons:"_pbuttons_1n17i_1",sbutton:"_sbutton_1n17i_1",plistrow:"_plistrow_1n17i_1",scell:"_scell_1n17i_1",mcell:"_mcell_1n17i_1",left16:"_left16_1n17i_1",top16:"_top16_1n17i_1",top32:"_top32_1n17i_1"};var Ot=(0,te.template)("<div><div><div></div><div></div><div></div></div></div>",10),jt=(0,te.template)("<div><div></div><div></div><div></div></div>",8),{ui:{Switch:We,Text:W,injectCss:Et},solid:{createSignal:It}}=shelter,{invoke:ee}=window.__TAURI__,Ge=!1,Lt=()=>m(void 0,null,function*(){return yield ee("get_plugin_list")});function Ye(){Ge||(Ge=!0,Et(Ve));let[e,t]=It([]);return m(this,null,function*(){t(yield Lt())}),(0,S.createComponent)(V,{style:{marginTop:"1rem"},get children(){let n=Ot.cloneNode(!0),c=n.firstChild,d=c.firstChild,r=d.nextSibling,a=r.nextSibling;return(0,C.insert)(d,(0,S.createComponent)(W,{get class(){return v.left16},children:"Plugin Name"})),(0,C.insert)(r,(0,S.createComponent)(W,{get class(){return v.left16},children:"Enabled?"})),(0,C.insert)(a,(0,S.createComponent)(W,{get class(){return v.left16},children:"Preload?"})),(0,C.insert)(n,()=>e().map(o=>(()=>{let u=jt.cloneNode(!0),h=u.firstChild,y=h.nextSibling,N=y.nextSibling;return(0,C.insert)(h,(0,S.createComponent)(W,{get class(){return v.left16},get children(){return o.name}})),(0,C.insert)(y,(0,S.createComponent)(We,{get checked(){return!o.disabled},onChange:l=>{ee("toggle_plugin",{name:o.name}),t(e().map(g=>(g.name===o.name&&(g.disabled=!g.disabled),g)))},style:{flexDirection:"column-reverse"}})),(0,C.insert)(N,(0,S.createComponent)(We,{get checked(){return o.preload},onChange:l=>{ee("toggle_preload",{name:o.name}),t(e().map(g=>(g.name===o.name&&(g.preload=!g.preload),g)))}})),(0,X.effect)(l=>{let g=o.name,ae=v.plistrow,ie=v.mcell,le=v.scell,ce=v.scell;return g!==l._v$6&&(0,qe.setAttribute)(u,"key",l._v$6=g),ae!==l._v$7&&(0,$.className)(u,l._v$7=ae),ie!==l._v$8&&(0,$.className)(h,l._v$8=ie),le!==l._v$9&&(0,$.className)(y,l._v$9=le),ce!==l._v$10&&(0,$.className)(N,l._v$10=ce),l},{_v$6:void 0,_v$7:void 0,_v$8:void 0,_v$9:void 0,_v$10:void 0}),u})()),null),(0,X.effect)(o=>{let u=v.plist,h=v.pheader+" "+v.plistrow,y=v.mcell,N=v.scell,l=v.scell;return u!==o._v$&&(0,$.className)(n,o._v$=u),h!==o._v$2&&(0,$.className)(c,o._v$2=h),y!==o._v$3&&(0,$.className)(d,o._v$3=y),N!==o._v$4&&(0,$.className)(r,o._v$4=N),l!==o._v$5&&(0,$.className)(a,o._v$5=l),o},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0}),n}})}var Ze="._shead_1s6h6_1{margin-top:16px;margin-bottom:8px}._fcard_1s6h6_1{display:flex;flex-direction:row;justify-content:space-between;align-items:center;color:var(--text-primary);padding:8px}._pcard_1s6h6_1{display:flex}._left16_1s6h6_1{margin-left:16px}",b={shead:"_shead_1s6h6_1",fcard:"_fcard_1s6h6_1",pcard:"_pcard_1s6h6_1",left16:"_left16_1s6h6_1"};var Ke=(0,se.template)("<div></div>",2),Rt=(0,se.template)('<a href="https://github.com/SpikeHD/shelter-plugins" target="_blank">SpikeHD/shelter-plugins</a>',2),{ui:{SwitchItem:P,Button:ne,Text:Qe,Header:T,HeaderTags:Mt,Slider:Ht,injectCss:Bt},solid:{createSignal:Xe,createEffect:Ut}}=shelter,{invoke:L,process:Ft}=window.__TAURI__,et=!1,Jt=()=>m(void 0,null,function*(){return(yield L("get_theme_names")).map(t=>({label:t.replace(/"/g,"").replace(".css","").replace(".theme",""),value:t.replace(/"/g,"")}))}),Vt=()=>{L("open_plugins")},Wt=()=>{L("open_themes")};function tt(){let[e,t]=Xe({zoom:"1.0",client_type:"default",sys_tray:!1,push_to_talk:!1,push_to_talk_keys:[],theme:"none",use_native_titlebar:!1,start_maximized:!1,open_on_startup:!1,startup_minimized:!1,autoupdate:!1,update_notify:!0,multi_instance:!1}),[n,c]=Xe([]);et||(et=!0,Bt(Ze)),Ut(()=>m(this,null,function*(){t(JSON.parse(yield L("read_config_file"))),c(yield Jt())}));let d=()=>m(this,null,function*(){yield L("write_config_file",{contents:JSON.stringify(e())}),Ft.relaunch()});return[(0,_.createComponent)(T,{get tag(){return Mt.H1},children:"Dorion Settings"}),(0,_.createComponent)(T,{get class(){return b.shead},children:"Theme"}),(0,_.createComponent)(E,{get value(){return e().theme},onChange:r=>{t(a=>f(p({},a),{theme:r.target.value}))},placeholder:"Select a theme...",get options(){return[{label:"None",value:"none"},...n()]},get selected(){return e().theme}}),(0,_.createComponent)(T,{get class(){return b.shead},children:"Client Type"}),(0,_.createComponent)(E,{options:[{label:"Default",value:"default"},{label:"Canary",value:"canary"},{label:"PTB",value:"ptb"}],placeholder:"Select a client type...",maxVisibleItems:5,closeOnSelect:!0,onChange:r=>{t(a=>f(p({},a),{client_type:r.target.value}))},get selected(){return e().client_type}}),(0,_.createComponent)(T,{get class(){return b.shead},children:"Window"}),(0,_.createComponent)(Ht,{min:50,max:125,get steps(){return Array.from(Array(16).keys()).map(r=>r*5+50+"%")},step:5,get value(){return parseFloat(e().zoom)*100},onInput:r=>{t(a=>f(p({},a),{zoom:(parseFloat(r)/100).toString()}))}}),(0,_.createComponent)(P,{get value(){return e().sys_tray},onChange:r=>{t(a=>f(p({},a),{sys_tray:r}))},note:"Instead of closing, Dorion will run in the background and will be accessible via the system tray.",children:"Minimize to System Tray"}),(0,_.createComponent)(P,{get value(){return e().start_maximized},onChange:r=>{t(a=>f(p({},a),{start_maximized:r}))},children:"Start Maximized"}),(0,_.createComponent)(T,{get class(){return b.shead},children:"Startup"}),(0,_.createComponent)(P,{get value(){return e().open_on_startup},onChange:r=>{t(a=>f(p({},a),{open_on_startup:r}))},note:"Open Dorion when your system starts.",children:"Open on Startup"}),(0,_.createComponent)(P,{get value(){return e().startup_minimized},get disabled(){return!e().open_on_startup},onChange:r=>{t(a=>f(p({},a),{startup_minimized:r}))},note:"Open in the background when your system starts.",children:"Start Minimized"}),(0,_.createComponent)(T,{get class(){return b.shead},children:"Misc."}),(0,_.createComponent)(P,{get value(){return e().multi_instance},onChange:r=>{t(a=>f(p({},a),{multi_instance:r}))},note:"Allow multiple instances of Dorion to be running at the same time.",children:"Allow Multiple Instances"}),(0,_.createComponent)(P,{get value(){return e().use_native_titlebar},onChange:r=>{t(a=>f(p({},a),{use_native_titlebar:r}))},note:"Disable the custom titlebar and use your systems native one instead.",children:"Use Native Titlebar"}),(0,_.createComponent)(P,{get value(){return e().autoupdate},onChange:r=>{t(a=>f(p({},a),{autoupdate:r}))},get note(){return["Automatically update various Dorion components, such as"," ",Rt.cloneNode(!0),"."]},children:"Autoupdate"}),(0,_.createComponent)(P,{get value(){return e().update_notify===void 0||e().update_notify},onChange:r=>{t(a=>f(p({},a),{update_notify:r}))},get disabled(){return e().autoupdate},children:"Notify me of updates"}),(0,_.createComponent)(V,{style:{marginTop:"1rem"},get children(){return[(()=>{let r=Ke.cloneNode(!0);return(0,I.insert)(r,(0,_.createComponent)(Qe,{get class(){return b.left16},children:"Plugins Folder"}),null),(0,I.insert)(r,(0,_.createComponent)(ne,{onClick:Vt,children:"Open"}),null),(0,oe.effect)(()=>(0,re.className)(r,b.fcard)),r})(),(()=>{let r=Ke.cloneNode(!0);return(0,I.insert)(r,(0,_.createComponent)(Qe,{get class(){return b.left16},children:"Themes Folder"}),null),(0,I.insert)(r,(0,_.createComponent)(ne,{onClick:Wt,children:"Open"}),null),(0,oe.effect)(()=>(0,re.className)(r,b.fcard)),r})()]}}),(0,_.createComponent)(T,{get class(){return b.shead},children:"Plugins"}),(0,_.createComponent)(Ye,{}),(0,_.createComponent)(ne,{onClick:d,style:{"margin-top":"1rem",padding:"18px"},grow:!0,children:"Save & Restart"})]}var{settings:{registerSection:R},flux:{dispatcher:nt},util:{sleep:Gt}}=shelter,{app:qt}=window.__TAURI__,rt=()=>m(void 0,null,function*(){yield Gt(1e3);let e=document.querySelector('div[class*="side_"] div[class*="info_"]'),t=e.firstElementChild,n=document.createElement("span");n.innerHTML=`Dorion v${yield qt.getVersion()}`,n.classList.add(...t.classList),n.style.color=t.style.color,e.appendChild(n)});nt.subscribe("USER_SETTINGS_MODAL_OPEN",rt);var Yt=[R("divider"),R("header","Dorion"),R("section","dorion-settings","Dorion Settings",tt),R("section","dorion-performance","Performance & Extras",$e),R("section","dorion-profiles","Profiles",Ie)],Zt=()=>{Yt.forEach(e=>e()),nt.unsubscribe("USER_SETTINGS_MODAL_OPEN",rt)};return mt(Kt);})();
