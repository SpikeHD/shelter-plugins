(()=>{var o=Object.defineProperty;var r=Object.getOwnPropertyDescriptor;var c=Object.getOwnPropertyNames;var d=Object.prototype.hasOwnProperty;var i=(e,t)=>{for(var n in t)o(e,n,{get:t[n],enumerable:!0})},l=(e,t,n,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of c(t))!d.call(e,s)&&s!==n&&o(e,s,{get:()=>t[s],enumerable:!(a=r(t,s))||a.enumerable});return e};var u=e=>l(o({},"__esModule",{value:!0}),e);var x={};i(x,{onUnload:()=>k});var{flux:{stores:{MaskedLinkStore:h}},patcher:p}=shelter,f=p.instead("isTrustedDomain",h,()=>!0,!1),k=()=>{f()};return u(x);})();