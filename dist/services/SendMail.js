"use strict";var j=Object.create;var l=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var A=Object.getOwnPropertyNames;var M=Object.getPrototypeOf,w=Object.prototype.hasOwnProperty;var f=(t,e)=>l(t,"name",{value:e,configurable:!0});var x=(t,e)=>{for(var r in e)l(t,r,{get:e[r],enumerable:!0})},g=(t,e,r,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of A(e))!w.call(t,s)&&s!==r&&l(t,s,{get:()=>e[s],enumerable:!(i=y(e,s))||i.enumerable});return t};var z=(t,e,r)=>(r=t!=null?j(M(t)):{},g(e||!t||!t.__esModule?l(r,"default",{value:t,enumerable:!0}):r,t)),C=t=>g(l({},"__esModule",{value:!0}),t);var S=(t,e,r)=>{if(!e.has(t))throw TypeError("Cannot "+r)};var m=(t,e,r)=>(S(t,e,"read from private field"),r?r.call(t):e.get(t)),u=(t,e,r)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,r)},p=(t,e,r,i)=>(S(t,e,"write to private field"),i?i.call(t,r):e.set(t,r),r);var v=(t,e,r)=>new Promise((i,s)=>{var L=o=>{try{d(r.next(o))}catch(b){s(b)}},T=o=>{try{d(r.throw(o))}catch(b){s(b)}},d=o=>o.done?i(o.value):Promise.resolve(o.value).then(L,T);d((r=r.apply(t,e)).next())});var K={};x(K,{CLASSSendEmail:()=>I});module.exports=C(K);var V=require("dotenv/config"),E=z(require("nodemailer"));var D=E.default.createTransport({service:"gmail",port:587,auth:{user:"programadorwebti@gmail.com",pass:process.env.EMAIL_KEY},tls:{rejectUnauthorized:!0,minVersion:"TLSv1.2"}}),a,n,c,h,I=(h=class{constructor({to:e,title:r,body:i}){u(this,a,void 0);u(this,n,void 0);u(this,c,void 0);p(this,a,e),p(this,n,r),p(this,c,i)}send(){return v(this,null,function*(){let e={from:m(this,a),to:m(this,a),bcc:"heuder.sicoob@gmail.com",subject:m(this,n),html:m(this,c)};D.sendMail(e,function(r,i){return r||i})})}},a=new WeakMap,n=new WeakMap,c=new WeakMap,f(h,"CLASSSendEmail"),h);0&&(module.exports={CLASSSendEmail});
