(()=>{var oe=Object.create;var f=Object.defineProperty,se=Object.defineProperties,ae=Object.getOwnPropertyDescriptor,ie=Object.getOwnPropertyDescriptors,le=Object.getOwnPropertyNames,k=Object.getOwnPropertySymbols,ue=Object.getPrototypeOf,R=Object.prototype.hasOwnProperty,ce=Object.prototype.propertyIsEnumerable;var H=(e,n,t)=>n in e?f(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,L=(e,n)=>{for(var t in n||={})R.call(n,t)&&H(e,t,n[t]);if(k)for(var t of k(n))ce.call(n,t)&&H(e,t,n[t]);return e},O=(e,n)=>se(e,ie(n));var ge=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports),pe=(e,n)=>{for(var t in n)f(e,t,{get:n[t],enumerable:!0})},T=(e,n,t,s)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of le(n))!R.call(e,r)&&r!==t&&f(e,r,{get:()=>n[r],enumerable:!(s=ae(n,r))||s.enumerable});return e};var c=(e,n,t)=>(t=e!=null?oe(ue(e)):{},T(n||!e||!e.__esModule?f(t,"default",{value:e,enumerable:!0}):t,e)),me=e=>T(f({},"__esModule",{value:!0}),e);var g=(e,n,t)=>new Promise((s,r)=>{var a=o=>{try{u(t.next(o))}catch(p){r(p)}},i=o=>{try{u(t.throw(o))}catch(p){r(p)}},u=o=>o.done?s(o.value):Promise.resolve(o.value).then(a,i);u((t=t.apply(e,n)).next())});var l=ge((Te,D)=>{D.exports=shelter.solidWeb});var Le={};pe(Le,{onUnload:()=>Re});var x=c(l(),1),I=c(l(),1),$=c(l(),1),ne=c(l(),1),C=c(l(),1),B=c(l(),1),m=c(l(),1);var A="._subtitle_rel3j_1{margin-top:12px;display:block}._pluginList_rel3j_1{display:grid;grid-template-columns:repeat(2, 1fr);grid-gap:16px;margin-top:16px}._repoHeader_rel3j_1{display:flex;flex-direction:row;justify-content:space-between;align-items:center}",h={subtitle:"_subtitle_rel3j_1",pluginList:"_pluginList_rel3j_1",repoHeader:"_repoHeader_rel3j_1"};var v=c(l(),1),P=c(l(),1),Q=c(l(),1),b=c(l(),1),_=c(l(),1),Ve=c(l(),1);function E(e){localStorage.setItem("plugins-browser-cache",`${Date.now()};${JSON.stringify(e)}`)}function U(){let e=localStorage.getItem("plugins-browser-cache");if(!e)return null;let[n,t]=e.split(";"),s=null;try{s=JSON.parse(t)}catch(r){return console.log("[Plugin Browser] Error parsing cache JSON: ",r),null}return de(n),s}function de(e){Date.now()-parseInt(e)>1e3*60*60&&localStorage.removeItem("plugins-browser-cache")}function j(){let e=localStorage.getItem("plugins-browser-plugin-json");if(!e)return{};let[n,t]=e.split(";"),s=null;try{s=JSON.parse(t)}catch(r){return console.log("[Plugin Browser] Error parsing cache JSON: ",r),{}}return _e(n),s}function q(e,n){localStorage.setItem("plugins-browser-plugin-json",`${Date.now()};${JSON.stringify(O(L({},j()),{[e]:n}))}`)}function _e(e){Date.now()-parseInt(e)>1e3*60*60&&localStorage.removeItem("plugins-browser-plugin-json")}var w=e=>g(void 0,null,function*(){return fetch(e,{headers:{"User-Agent":"Shelter Plugin Browser"}})});function fe(){return g(this,null,function*(){return(yield(yield w("https://api.github.com/search/repositories?q=topic:shelter-plugins")).json()).items.map(t=>({name:t.name,description:t.description,url:t.html_url,stars:t.stargazers_count,owner:t.owner.login,owner_url:t.owner.html_url,owner_avatar:t.owner.avatar_url,homepage:t.homepage}))})}function he(e){return g(this,null,function*(){return e.homepage?e.homepage:`https://${e.owner}.github.io/${e.name}`})}function we(e){return g(this,null,function*(){return(yield(yield w(`https://api.github.com/repos/${e.owner}/${e.name}/contents/plugins`)).json()).map(s=>s.name)})}function be(e,n){return g(this,null,function*(){let t=n==null?void 0:n[0];if(!t)return e;let s=[`${e}/shelter-plugins/`,`${e}/`],r=e;for(let a of s){let i=`${a}/${t}/plugin.json`,u=yield w(i);try{if((yield u.json()).name){r=a;break}}catch(o){}}return r})}function z(e,n){return g(this,null,function*(){let t=`${e}/${n}/plugin.json`,s=j();if(s[t])return s[t];let r=yield w(t);try{let a=yield r.json();return q(t,a),a}catch(a){return console.log("[Plugin Browser] Error parsing plugin.json: ",a.message),null}})}function F(){return g(this,null,function*(){let e=yield fe(),n=yield Promise.all(e.map(t=>g(this,null,function*(){let s=yield he(t);if(!s)return console.log("[Plugin Browser] No site found for repo: ",t.name),null;let r=yield we(t);return r?{site:yield be(s,r),repo:t,plugins:r}:(console.log("[Plugin Browser] No plugins found for repo: ",t.name),null)})));return n=n.filter(t=>t!==null),E(n),n})}var V="._pluginCard_9arrd_1{display:flex;flex-direction:column;justify-content:space-evenly;align-items:flex-start;text-align:left;padding:16px;color:var(--text-primary);background:var(--background-secondary);border-radius:8px}._pluginCard_9arrd_1 ._contents_9arrd_1{margin-top:8px;flex:1}._pluginCard_9arrd_1 ._buttonContainer_9arrd_1{margin-top:8px;width:100%}._pluginCard_9arrd_1 ._buttonContainer_9arrd_1 ._installButton_9arrd_1{flex-grow:1;width:100%}._pluginCard_9arrd_1 ._buttonContainer_9arrd_1 ._installButton_9arrd_1 button P{width:100%}",d={pluginCard:"_pluginCard_9arrd_1",contents:"_contents_9arrd_1",buttonContainer:"_buttonContainer_9arrd_1",installButton:"_installButton_9arrd_1"};var W=(0,v.template)("<b></b>",2),$e=(0,v.template)("<div><div></div></div>",4),{ui:{injectCss:Ce,Button:xe,Text:G},solid:{createSignal:K,createEffect:je},plugins:{installedPlugins:y,addRemotePlugin:ye}}=shelter,M=!1;function X(e){M||(Ce(V),M=!0);let[n,t]=K({}),[s,r]=K(!1);je(()=>g(this,null,function*(){t(yield z(e.site,e.plugin));let i=Object.values((y==null?void 0:y())||{}).some(u=>{var o,p;return u.manifest.name===((o=n())==null?void 0:o.name)&&u.manifest.author===((p=n())==null?void 0:p.author)});r(i)}));let a=()=>{ye(e.plugin,e.install_url,!0),r(!0)};return(()=>{let i=$e.cloneNode(!0),u=i.firstChild;return(0,_.insert)(i,(0,b.createComponent)(G,{get class(){return d.name},get children(){return[(()=>{let o=W.cloneNode(!0);return(0,_.insert)(o,()=>{var p;return((p=n())==null?void 0:p.name)||"Unknown"}),o})()," by ",(()=>{let o=W.cloneNode(!0);return(0,_.insert)(o,()=>e.author),o})()]}}),u),(0,_.insert)(i,(0,b.createComponent)(G,{get class(){return d.contents},get children(){var o;return(o=n())==null?void 0:o.description}}),u),(0,_.insert)(u,(0,b.createComponent)(xe,{get class(){return d.installButton},onClick:a,get disabled(){var o;return s()||!((o=n())!=null&&o.name)},get children(){return s()?"Installed":"Install"}})),(0,Q.effect)(o=>{let p=d.pluginCard,J=d.buttonContainer;return p!==o._v$&&(0,P.className)(i,o._v$=p),J!==o._v$2&&(0,P.className)(u,o._v$2=J),o},{_v$:void 0,_v$2:void 0}),i})()}var Pe=(0,x.template)('<a href="https://github.com/SpikeHD/shelter-plugins/tree/main/plugins/plugin-browser" target="_blank">Take a look</a>',2),ve=(0,x.template)('<a target="_blank">View Repository</a>',2),Y=(0,x.template)("<div></div>",2),{ui:{injectCss:Ne,Header:N,HeaderTags:S,Text:Se,Divider:Z,TextBox:Ie},solid:{createSignal:ee,createEffect:Be}}=shelter,te=!1,Je=(e,n)=>{let t=null;return(...s)=>{window.clearTimeout(t),t=window.setTimeout(()=>{e(...s)},n)}};function re(){te||(Ne(A),te=!0);let[e,n]=ee([]),[t,s]=ee("");return Be(()=>g(this,null,function*(){n(U()||(yield F()))})),[(0,m.createComponent)(N,{get tag(){return S.H1},children:"Plugins"}),(0,m.createComponent)(Se,{get class(){return h.subtitle},get children(){return["Not seeing your plugin repo? ",Pe.cloneNode(!0)," at how this plugin finds repos!"]}}),(0,m.createComponent)(Z,{mt:16,mb:16}),(0,m.createComponent)(Ie,{get value(){return t()},get onInput(){return Je(r=>s(r),100)},placeholder:"Search..."}),(0,B.memo)(()=>e().map(r=>[(0,m.createComponent)(Z,{mt:16,mb:16}),(()=>{let a=Y.cloneNode(!0);return(0,$.insert)(a,(0,m.createComponent)(N,{get tag(){return S.H2},get children(){return r.repo.owner}}),null),(0,$.insert)(a,(0,m.createComponent)(N,{get tag(){return S.H2},get children(){return[(()=>{let i=ve.cloneNode(!0);return(0,C.effect)(()=>(0,ne.setAttribute)(i,"href",r.repo.url)),i})()," - ",(0,B.memo)(()=>r.repo.stars)," \u2B50"]}}),null),(0,C.effect)(()=>(0,I.className)(a,h.repoHeader)),a})(),(()=>{let a=Y.cloneNode(!0);return(0,$.insert)(a,()=>r.plugins.map(i=>i.toLowerCase().includes("dorion")||!i.toLowerCase().includes(t().toLowerCase())?null:(0,m.createComponent)(X,{plugin:i,get site(){return r.site},get author(){return r.repo.owner},get install_url(){return`${r.site}/${i}`}}))),(0,C.effect)(()=>(0,I.className)(a,h.pluginList)),a})()]))]}var{settings:{registerSection:ke}}=shelter,He=ke("section","plugin-browser","Plugin Browser",re),Re=()=>{He()};return me(Le);})();
