"use strict";var R=Object.create;var u=Object.defineProperty;var l=Object.getOwnPropertyDescriptor;var f=Object.getOwnPropertyNames;var p=Object.getPrototypeOf,U=Object.prototype.hasOwnProperty;var E=(e,r)=>u(e,"name",{value:r,configurable:!0});var T=(e,r)=>{for(var s in r)u(e,s,{get:r[s],enumerable:!0})},C=(e,r,s,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let a of f(r))!U.call(e,a)&&a!==s&&u(e,a,{get:()=>r[a],enumerable:!(t=l(r,a))||t.enumerable});return e};var L=(e,r,s)=>(s=e!=null?R(p(e)):{},C(r||!e||!e.__esModule?u(s,"default",{value:e,enumerable:!0}):s,e)),M=e=>C(u({},"__esModule",{value:!0}),e);var d=(e,r,s)=>new Promise((t,a)=>{var n=o=>{try{i(s.next(o))}catch(S){a(S)}},c=o=>{try{i(s.throw(o))}catch(S){a(S)}},i=o=>o.done?t(o.value):Promise.resolve(o.value).then(n,c);i((s=s.apply(e,r)).next())});var y={};T(y,{JogosDatabase:()=>g});module.exports=M(y);var b=L(require("moment"));var O=require("@prisma/client"),m=new O.PrismaClient;m.$disconnect();function h(){let e=[];for(let t=1;t<=60;t++)e.push(t);for(let t=e.length-1;t>0;t--){let a=Math.floor(Math.random()*(t+1));[e[t],e[a]]=[e[a],e[t]]}return e.slice(0,35).sort((t,a)=>t-a)}E(h,"generateUniqueNumbers12");var A="OPERA\xC7\xC3O EXECUTADA COM SUCESSO.".trim(),I="OPS! OCORREU ALGUM ERRO NO SISTEMA.".trim();var _,g=(_=class{static create(r,s){return d(this,null,function*(){try{let t=yield m.game.findFirst({orderBy:{created_at:"desc"}}),a=t!=null&&t.match_id?(t==null?void 0:t.match_id)+1:1,n=yield m.bet.findFirst({orderBy:{created_at:"desc"}}),c=n!=null&&n.namber_bet?(n==null?void 0:n.namber_bet)+1:1,i=String(r||h()),o=yield this._FN_LOCAL_CREATE_BET(a,i,s,c);return{status:!1,message:A,data:o}}catch(t){return{status:!0,message:t,data:[]}}})}static searchForTheLastGame(){return d(this,null,function*(){var n,c;let r=yield m.$queryRaw`CALL PROCEDURE_GAMES('um')`;console.log("VIEW_BUSCAR_ULTIMO_REGISTRO_TABLE_GAMES: ",r);let s=(c=(n=r[0])==null?void 0:n.created_at)!=null?c:new Date,t=(0,b.default)(s).format("HH:mm:ss"),a=(0,b.default)(s).add(2,"minutes").format("HH:mm:ss");return{hora_database:t,horaAtualida:a}})}static _FN_LOCAL_CREATE_BET(r,s,t,a){return d(this,null,function*(){try{return yield m.bet.create({data:{number_game_result:String(r),numbers:String(s),establishmentId:t},include:{establishment:{select:{name:!0}}}})}catch(n){return n}})}},E(_,"JogosDatabase"),_);0&&(module.exports={JogosDatabase});