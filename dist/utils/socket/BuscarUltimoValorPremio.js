"use strict";var c=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var P=Object.getOwnPropertyNames;var k=Object.prototype.hasOwnProperty;var l=(e,r)=>c(e,"name",{value:r,configurable:!0});var x=(e,r)=>{for(var t in r)c(e,t,{get:r[t],enumerable:!0})},y=(e,r,t,i)=>{if(r&&typeof r=="object"||typeof r=="function")for(let s of P(r))!k.call(e,s)&&s!==t&&c(e,s,{get:()=>r[s],enumerable:!(i=w(r,s))||i.enumerable});return e};var B=e=>y(c({},"__esModule",{value:!0}),e);var p=(e,r,t)=>new Promise((i,s)=>{var b=a=>{try{n(t.next(a))}catch(m){s(m)}},f=a=>{try{n(t.throw(a))}catch(m){s(m)}},n=a=>a.done?i(a.value):Promise.resolve(a.value).then(b,f);n((t=t.apply(e,r)).next())});var C={};x(C,{BuscarUltimoValorPremio:()=>V});module.exports=B(C);var d=require("@prisma/client"),u=new d.PrismaClient;u.$disconnect();var o,V=(o=class{static buscarValoresDosPremios(){return p(this,null,function*(){return yield u.award.findFirst({select:{subtract_premiums:!0,seine:!0,corner:!0,block:!0},orderBy:{created_at:"desc"},take:1})})}},l(o,"BuscarUltimoValorPremio"),o);0&&(module.exports={BuscarUltimoValorPremio});