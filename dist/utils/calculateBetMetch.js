"use strict";var m=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var d=Object.getOwnPropertyNames;var g=Object.prototype.hasOwnProperty;var u=(t,e)=>m(t,"name",{value:e,configurable:!0});var B=(t,e)=>{for(var s in e)m(t,s,{get:e[s],enumerable:!0})},E=(t,e,s,c)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of d(e))!g.call(t,o)&&o!==s&&m(t,o,{get:()=>e[o],enumerable:!(c=b(e,o))||c.enumerable});return t};var _=t=>E(m({},"__esModule",{value:!0}),t);var h=(t,e,s)=>new Promise((c,o)=>{var a=n=>{try{r(s.next(n))}catch(f){o(f)}},l=n=>{try{r(s.throw(n))}catch(f){o(f)}},r=n=>n.done?c(n.value):Promise.resolve(n.value).then(a,l);r((s=s.apply(t,e)).next())});var S={};B(S,{calculateBetMetch:()=>y});module.exports=_(S);var M=require("@prisma/client"),p=new M.PrismaClient;p.$disconnect();var w=[],i,y=(i=class{static verifyBetMatch(e){return h(this,null,function*(){let s=String(e.match_id),c=yield p.bet.findMany({where:{number_game_result:s}}),o=e.numbers;for(let a of c){let l=0;for(let r=0;r<a.length&&a[r].numbers.split(",")===o.split(",")[r];r++)l++;l===6?(w.push(a),console.log("Voc\xEA ganhou! Os n\xFAmeros vencedores foram:",a)):console.log("OPS")}return[]})}},u(i,"calculateBetMetch"),i);0&&(module.exports={calculateBetMetch});
