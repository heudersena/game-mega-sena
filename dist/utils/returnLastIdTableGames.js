"use strict";var c=Object.defineProperty;var _=Object.getOwnPropertyDescriptor;var h=Object.getOwnPropertyNames;var w=Object.prototype.hasOwnProperty;var s=(t,e)=>c(t,"name",{value:e,configurable:!0});var x=(t,e)=>{for(var r in e)c(t,r,{get:e[r],enumerable:!0})},y=(t,e,r,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of h(e))!w.call(t,i)&&i!==r&&c(t,i,{get:()=>e[i],enumerable:!(a=_(e,i))||a.enumerable});return t};var b=t=>y(c({},"__esModule",{value:!0}),t);var f=(t,e,r)=>new Promise((a,i)=>{var l=n=>{try{o(r.next(n))}catch(d){i(d)}},u=n=>{try{o(r.throw(n))}catch(d){i(d)}},o=n=>n.done?a(n.value):Promise.resolve(n.value).then(l,u);o((r=r.apply(t,e)).next())});var C={};x(C,{returnLastIdTableGames:()=>B});module.exports=b(C);var p=require("@prisma/client"),m=new p.PrismaClient;m.$disconnect();function B(){return f(this,null,function*(){let t=yield m.game.findFirst({orderBy:{created_at:"desc"}}),e=1;return(t==null?void 0:t.match_id)==null||(e=(t==null?void 0:t.match_id)+1),e})}s(B,"returnLastIdTableGames");0&&(module.exports={returnLastIdTableGames});
