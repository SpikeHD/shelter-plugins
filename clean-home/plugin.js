(()=>{var g=Object.create;var s=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var b=Object.getOwnPropertyNames;var C=Object.getPrototypeOf,x=Object.prototype.hasOwnProperty;var A=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),R=(e,t)=>{for(var o in t)s(e,o,{get:t[o],enumerable:!0})},i=(e,t,o,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of b(t))!x.call(e,n)&&n!==o&&s(e,n,{get:()=>t[n],enumerable:!(a=f(t,n))||a.enumerable});return e};var p=(e,t,o)=>(o=e!=null?g(C(e)):{},i(t||!e||!e.__esModule?s(o,"default",{value:e,enumerable:!0}):o,e)),w=e=>i(s({},"__esModule",{value:!0}),e);var r=A((j,l)=>{l.exports=shelter.solidWeb});var _={};R(_,{onUnload:()=>E,settings:()=>S});var c=p(r(),1),h=p(r(),1),{plugin:{store:m},ui:{SwitchItem:N}}=shelter,d=[{name:"Active Now section",description:'Removes the "Active Now" section from the home page',rules:`
      div[class*="nowPlayingColumn"] { display: none; }
    `},{name:"Nitro tab",description:'Removes the "Nitro" tab from the home page',rules:`
      a[href="/store"] { display: none; }
    `},{name:"Store tab",description:'Removes the "Store" tab from the home page',rules:`
      a[href="/shop"] { display: none; }
    `},{name:"Apps button",description:"Removes the Apps button from the text area",rules:`
      div[class*="channelAppLauncher"] { display: none; }
    `}],u=document.createElement("style");u.id="clean-home-style";var v=document.body.appendChild(u),y=()=>{v.textContent=d.filter(e=>m[e.name]).map(e=>e.rules).join(" ")};y();var S=()=>d.map(e=>(0,c.createComponent)(N,{get value(){return!!m[e.name]},onChange:t=>{m[e.name]=t,y()},get note(){return e.description},get children(){return["Remove ",(0,h.memo)(()=>e.name)]}})),E=()=>{v.remove()};return w(_);})();
