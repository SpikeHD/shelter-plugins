(()=>{var c=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var _=Object.prototype.hasOwnProperty;var C=(s,e)=>{for(var t in e)c(s,t,{get:e[t],enumerable:!0})},E=(s,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of g(e))!_.call(s,i)&&i!==t&&c(s,i,{get:()=>e[i],enumerable:!(n=b(e,i))||n.enumerable});return s};var y=s=>E(c({},"__esModule",{value:!0}),s);var f=(s,e,t)=>new Promise((n,i)=>{var h=r=>{try{a(t.next(r))}catch(o){i(o)}},v=r=>{try{a(t.throw(r))}catch(o){i(o)}},a=r=>r.done?n(r.value):Promise.resolve(r.value).then(h,v);a((t=t.apply(s,e)).next())});var N={};C(N,{onUnload:()=>L});var{flux:{dispatcher:p,stores:{ChannelStore:d}}}=shelter,m=!1,l=null,u=s=>f(void 0,null,function*(){let{channelId:e}=s;if(!(d==null?void 0:d.getChannel(e)).nsfw_){l&&(l.remove(),m=!1);return}if(m)return;let n=document.createElement("style");n.innerText=`
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
  `,l=document.body.appendChild(n)});p.subscribe("CHANNEL_SELECT",u);var L=()=>{p.unsubscribe("CHANNEL_SELECT",u),l&&(l.remove(),m=!1)};return y(N);})();
