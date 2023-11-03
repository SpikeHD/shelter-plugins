(()=>{var c=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var b=Object.getOwnPropertyNames;var g=Object.prototype.hasOwnProperty;var C=(t,e)=>{for(var n in e)c(t,n,{get:e[n],enumerable:!0})},_=(t,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of b(e))!g.call(t,s)&&s!==n&&c(t,s,{get:()=>e[s],enumerable:!(r=v(e,s))||r.enumerable});return t};var E=t=>_(c({},"__esModule",{value:!0}),t);var m=(t,e,n)=>new Promise((r,s)=>{var p=i=>{try{a(n.next(i))}catch(o){s(o)}},u=i=>{try{a(n.throw(i))}catch(o){s(o)}},a=i=>i.done?r(i.value):Promise.resolve(i.value).then(p,u);a((n=n.apply(t,e)).next())});var N={};C(N,{onUnload:()=>L});var{flux:{dispatcher:f,stores:{ChannelStore:y}}}=shelter,d=!1,l=null,h=t=>m(void 0,null,function*(){let{channelId:e}=t;if(!y.getChannel(e).nsfw_){l&&(l.remove(),d=!1);return}if(d)return;let r=document.createElement("style");r.innerText=`
    div[class*="imageWrapper_"] video,
    div[class*="imageWrapper_"] img {
      filter: blur(10px) !important;

      transition: filter 0.5s ease;
    }

    /* On hover, show the image */
    div[class*="imageWrapper_"]:hover video,
    div[class*="imageWrapper_"]:hover img {
      filter: blur(0) !important;
    }

    /* If the user clicked it, the don't need it blurred anymore */
    div[class*="focusLock_"] video,
    div[class*="focusLock_"] img {
      filter: blur(0) !important;
    }
  `,l=document.body.appendChild(r)});f.subscribe("CHANNEL_SELECT",h);var L=()=>{f.unsubscribe("CHANNEL_SELECT",h),l&&(l.remove(),d=!1)};return E(N);})();
