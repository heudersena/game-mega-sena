"use strict";var c=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var A=Object.getOwnPropertyNames;var g=Object.prototype.hasOwnProperty;var f=(e,r,t)=>r in e?c(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t;var h=(e,r)=>c(e,"name",{value:r,configurable:!0});var w=(e,r)=>{for(var t in r)c(e,t,{get:r[t],enumerable:!0})},v=(e,r,t,o)=>{if(r&&typeof r=="object"||typeof r=="function")for(let u of A(r))!g.call(e,u)&&u!==t&&c(e,u,{get:()=>r[u],enumerable:!(o=y(r,u))||o.enumerable});return e};var p=e=>v(c({},"__esModule",{value:!0}),e);var n=(e,r,t)=>(f(e,typeof r!="symbol"?r+"":r,t),t);var m=(e,r,t)=>new Promise((o,u)=>{var b=s=>{try{l(t.next(s))}catch(i){u(i)}},N=s=>{try{l(t.throw(s))}catch(i){u(i)}},l=s=>s.done?o(s.value):Promise.resolve(s.value).then(b,N);l((t=t.apply(e,r)).next())});var d={};w(d,{handleAllJobs:()=>V});module.exports=p(d);var a,V=(a=class{constructor(r){n(this,"io");n(this,"accumulatorNumbers",[]);this.io=r}viewNumbersAccumulator(){return m(this,null,function*(){return this.accumulatorNumbers})}viewVerifyNumbersAccumulator(){return m(this,null,function*(){if(console.log("viewVerifyNumbersAccumulator: ",new Date().toTimeString()),this.accumulatorNumbers.length>0)return console.log("menor"),this.io.emit("gamer:total",this.accumulatorNumbers)})}setNumberAccumulatot(r){return m(this,null,function*(){this.accumulatorNumbers.push(r),this.resetArray()})}resetArray(){this.accumulatorNumbers.length==6&&(this.accumulatorNumbers=[])}},h(a,"handleAllJobs"),a);0&&(module.exports={handleAllJobs});