"use strict";var c=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var I=Object.getOwnPropertyNames;var f=Object.prototype.hasOwnProperty;var l=(a,t)=>c(a,"name",{value:t,configurable:!0});var x=(a,t)=>{for(var e in t)c(a,e,{get:t[e],enumerable:!0})},y=(a,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of I(t))!f.call(a,s)&&s!==e&&c(a,s,{get:()=>t[s],enumerable:!(r=h(t,s))||r.enumerable});return a};var D=a=>y(c({},"__esModule",{value:!0}),a);var p=(a,t,e)=>new Promise((r,s)=>{var w=n=>{try{d(e.next(n))}catch(u){s(u)}},b=n=>{try{d(e.throw(n))}catch(u){s(u)}},d=n=>n.done?r(n.value):Promise.resolve(n.value).then(w,b);d((e=e.apply(a,t)).next())});var F={};x(F,{UpdateValuesTableBet:()=>E});module.exports=D(F);var m=require("@prisma/client"),o=new m.PrismaClient;o.$disconnect();var i,E=(i=class{static winners(t,e){return p(this,null,function*(){return yield o.bet.update({where:{id:e},data:{awarded:!0,status:"FINISHED",hits:t},include:{establishment:!0}})})}static losers(t){return p(this,null,function*(){return yield o.bet.update({where:{id:t},data:{status:"FINISHED"}})})}},l(i,"UpdateValuesTableBet"),i);0&&(module.exports={UpdateValuesTableBet});
