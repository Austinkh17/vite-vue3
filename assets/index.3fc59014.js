import{f as q,g as s,o as n,c as e,F as a,h as c,i,t as o}from"./vendor.49eacab9.js";var x=q({name:"index",setup:()=>({navList:s([{name:"掘金",desc:"掘金是一个帮助开发者成长的社区,是给开发者用的Hacker News,给设计师用的Designer News,和给产品经理用的Medium。",icon:"",url:"https://juejin.cn/"},{name:"xxxx1",desc:"qqqqqqqqqqqq1ssssssssssssssssssssssssssssssssssssssssssssssssssssssqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",icon:""},{name:"xxxx",desc:"qqqqqqqqqqqq",icon:""},{name:"xxxx1",desc:"qqqqqqqqqqqq1",icon:""},{name:"xxxx",desc:"qqqqqqqqqqqq",icon:""},{name:"xxxx1",desc:"qqqqqqqqqqqq1",icon:""},{name:"xxxx",desc:"qqqqqqqqqqqq",icon:""},{name:"xxxx1",desc:"qqqqqqqqqqqq1",icon:""}]),defaultIcon:"./assets/logo.03d6d6da.png",goToUrl:q=>{q.url&&(window.location.href=q.url)}})});const l={class:"index"},d={class:"nav-icon-right"},r={class:"nav-name ellipsis"},t={class:"nav-desc ellipsis"};x.render=function(q,s,x,m,v,u){return n(),e("div",l,[(n(!0),e(a,null,c(q.navList,((s,a)=>(n(),e("div",{key:a,class:"nav-block",onClick:n=>q.goToUrl(s)},[i("img",{src:s.icon||q.defaultIcon,alt:"icon",class:"nav-icon"},null,8,["src"]),i("div",d,[i("div",r,o(s.name),1),i("div",t,o(s.desc),1)])],8,["onClick"])))),128))])};export default x;