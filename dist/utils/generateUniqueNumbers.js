"use strict";var s=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var c=Object.getOwnPropertyNames;var b=Object.prototype.hasOwnProperty;var u=(r,n)=>s(r,"name",{value:n,configurable:!0});var i=(r,n)=>{for(var o in n)s(r,o,{get:n[o],enumerable:!0})},l=(r,n,o,e)=>{if(n&&typeof n=="object"||typeof n=="function")for(let t of c(n))!b.call(r,t)&&t!==o&&s(r,t,{get:()=>n[t],enumerable:!(e=m(n,t))||e.enumerable});return r};var a=r=>l(s({},"__esModule",{value:!0}),r);var h={};i(h,{generateUniqueNumbers:()=>f});module.exports=a(h);function f(){let r=[];for(let e=1;e<=60;e++)r.push(e);for(let e=r.length-1;e>0;e--){let t=Math.floor(Math.random()*(e+1));[r[e],r[t]]=[r[t],r[e]]}return r.slice(0,6).sort((e,t)=>e-t)}u(f,"generateUniqueNumbers");0&&(module.exports={generateUniqueNumbers});