"use strict";var h=Object.defineProperty;var E=Object.getOwnPropertyDescriptor;var S=Object.getOwnPropertyNames;var N=Object.prototype.hasOwnProperty;var w=(o,e)=>h(o,"name",{value:e,configurable:!0});var B=(o,e)=>{for(var t in e)h(o,t,{get:e[t],enumerable:!0})},k=(o,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of S(e))!N.call(o,a)&&a!==t&&h(o,a,{get:()=>e[a],enumerable:!(r=E(e,a))||r.enumerable});return o};var q=o=>k(h({},"__esModule",{value:!0}),o);var d=(o,e,t)=>new Promise((r,a)=>{var l=n=>{try{s(t.next(n))}catch(c){a(c)}},u=n=>{try{s(t.throw(n))}catch(c){a(c)}},s=n=>n.done?r(n.value):Promise.resolve(n.value).then(l,u);s((t=t.apply(o,e)).next())});var T={};B(T,{CheckBetController:()=>I});module.exports=q(T);var y=require("@prisma/client"),i=new y.PrismaClient;i.$disconnect();var p,g=(p=class{static winners(e,t){return d(this,null,function*(){return yield i.bet.update({where:{id:t},data:{awarded:!0,status:"FINISHED",hits:e},include:{establishment:!0}})})}static losers(e){return d(this,null,function*(){return yield i.bet.update({where:{id:e},data:{status:"FINISHED"}})})}},w(p,"UpdateValuesTableBet"),p);var b,I=(b=class{static maior(e,t){return d(this,null,function*(){let r=String(e.query.n),a=yield i.bet.findMany({where:{number_game_result:{equals:r},AND:{awarded:{equals:!0}}},take:8,orderBy:{hits_round:"desc"},include:{establishment:{select:{name:!0}}}});t.json({quantity:a.length,comments:a})})}static check(e,t){return d(this,null,function*(){let r=[],a=e.params.numbers.split(",").map(s=>Number(s)),l=yield i.bet.findMany();if(l.length<=0)return t.json({resultados:r,ganhadores:[]});let u=0;l.forEach((s,n)=>d(this,null,function*(){for(let c of s.numbers.split(",").map(f=>Number(f)))a.includes(c)&&u++;u>=4?(console.log(s.numbers,u),g.winners(u,s.id).then(c=>{r.push({id:s.id,numeros:s.numbers,correspondencias:u,aposta:c})})):yield i.bet.update({where:{id:s.id},data:{status:"FINISHED"}})})),t.json({})})}static bkp(e,t){return d(this,null,function*(){let r=[],a=[1,4,4,48,24,60],l=yield i.bet.findMany(),u=yield i.bet.count(),s=0;for(let n=0;n<l.length;n++){let c=l[n].numbers.split(","),f=!0;for(let m=0;m<6;m++)if(console.log(l[n][m]),Number(c[m])!==a[m]){f=!1;break}else console.log(c)}t.json("ok")})}},w(b,"CheckBetController"),b);0&&(module.exports={CheckBetController});