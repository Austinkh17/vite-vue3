import{r as e,o as t,c as o,a as r,b as n,d as s,e as a,x as c}from"./vendor.49eacab9.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(o){const r=new URL(e,location),n=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((o,s)=>{const a=new URL(e,r);if(self[t].moduleMap[a])return o(self[t].moduleMap[a]);const c=new Blob([`import * as m from '${a}';`,`${t}.moduleMap['${a}']=m;`],{type:"text/javascript"}),i=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(c),onerror(){s(new Error(`Failed to import: ${e}`)),n(i)},onload(){o(self[t].moduleMap[a]),n(i)}});document.head.appendChild(i)})),self[t].moduleMap={}}}("assets/");const i={};i.render=function(r,n){const s=e("router-view");return t(),o(s)};let l;const m={},d=function(e,t){if(!t)return e();if(void 0===l){const e=document.createElement("link").relList;l=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in m)return;m[e]=!0;const t=e.endsWith(".css"),o=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${o}`))return;const r=document.createElement("link");return r.rel=t?"stylesheet":l,t||(r.as="script",r.crossOrigin=""),r.href=e,document.head.appendChild(r),t?new Promise(((e,t)=>{r.addEventListener("load",e),r.addEventListener("error",t)})):void 0}))).then((()=>e()))},u=[{path:"/test",name:"test",component:()=>d((()=>__import__("./index.3fc59014.js")),["./assets/index.3fc59014.js","./assets/index.83d2f6ef.css","./assets/vendor.49eacab9.js"])},{path:"/",name:"home",component:()=>d((()=>__import__("./HelloWorld.837dd746.js")),["./assets/HelloWorld.837dd746.js","./assets/HelloWorld.f70e1af1.css"])}],p=r({history:n(),routes:u}),f={count:0};var h=s({state:()=>f,mutations:{increment(e){e.count++}}});a(i).use(p).use(h).use(c).mount("#app");
