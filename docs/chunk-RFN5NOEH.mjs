import './polyfills.server.mjs';
import{B as T,D as y,E as f,F as D,G as E,J as W,N as Q,Q as w,R as A,a as O,b as s,c as P,d as k,e as S,f as u,g as h,h as x,i as l,j as r,k as a,l as c,m as F,n as z,o as v,p as b,q as C,r as p,s as R,t as I,u as m}from"./chunk-XCUSMJHR.mjs";var L=(()=>{let e=class e{constructor(){this.title="portfolio"}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s({type:e,selectors:[["app-root"]],standalone:!0,features:[m],decls:7,vars:0,consts:[["routerLink","/portfolio/",1,"button","expansive"]],template:function(t,i){t&1&&(r(0,"header")(1,"a",0),p(2,"Portfolio"),a()(),r(3,"main"),c(4,"router-outlet"),a(),r(5,"footer"),p(6,"Rafael Saes Palaria - 2024"),a())},dependencies:[Q,w],styles:['@charset "UTF-8";*[_ngcontent-%COMP%]{font-family:Gruppo,Verdana,Geneva,Tahoma,sans-serif;font-size:1.1em}@media screen and (max-width: 767px){header[_ngcontent-%COMP%]{margin:auto;padding:5px;background-color:#6697ff}header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{padding:7px 20px;border-radius:15px;font-size:1.3em}main[_ngcontent-%COMP%]{margin:15px auto;min-height:calc(100vh - 152px)}footer[_ngcontent-%COMP%]{position:relative;bottom:0%;width:100%;padding:15px 0;background-color:#000;color:#fff;text-align:center}}@media screen and (min-width: 768px){header[_ngcontent-%COMP%]{width:100%;margin:auto;padding:20px 0;background-color:#6697ff}header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-align:center;width:700px;margin:0}main[_ngcontent-%COMP%]{margin:15px auto;width:700px;min-height:calc(100vh - 188px)}footer[_ngcontent-%COMP%]{position:relative;bottom:0%;width:100%;padding:15px 0;background-color:#000;color:#fff;text-align:center}}']});let n=e;return n})();var _=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s({type:e,selectors:[["app-project-item"]],inputs:{project:"project"},standalone:!0,features:[m],decls:8,vars:4,consts:[[1,"container"],[1,"paralax","container",3,"src"],["target","_blank",1,"button","container",3,"href"]],template:function(t,i){t&1&&(r(0,"li",0)(1,"h2"),p(2),a(),r(3,"p"),p(4),a(),c(5,"img",1),r(6,"a",2),p(7,"Click here"),a()()),t&2&&(u(2),R(i.project.name),u(2),I(" ",i.project.description," "),u(),l("src","portfolio/assets/images/"+i.project.img_name,P),u(),z("href",i.project.link,P))},styles:['@charset "UTF-8";@media screen and (max-width:767px){li[_ngcontent-%COMP%]{font-family:var(--fontText);margin:15px;padding:10px;list-style-type:none;overflow:hidden}li[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-family:var(--fontSubtitle);font-size:.5em}li[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-indent:30px;font-family:var(--fontText);font-size:.5em;margin-bottom:10px}.paralax[_ngcontent-%COMP%]{display:block;height:145px;width:220px;margin:auto;box-shadow:3px 3px 5px #00000052;background-position:50% 50%;background-size:100% 100%;background-repeat:no-repeat}a[_ngcontent-%COMP%]{margin:15px auto 0;font-size:1.1em}}@media screen and (min-width:768px){li[_ngcontent-%COMP%]{font-family:var(--fontText);margin-top:30px;padding:10px;list-style-type:none;overflow:hidden}li[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-family:var(--fontSubtitle);font-size:var(--subTitleSize)}li[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-indent:30px;font-family:var(--fontText);font-size:var(--textSize);margin-bottom:10px}.paralax[_ngcontent-%COMP%]{display:block;height:92px;width:154px;margin:auto;box-shadow:3px 3px 5px #00000052;background-position:50% 50%;background-size:100% 100%;background-repeat:no-repeat}}']});let n=e;return n})();var j=(()=>{let e=class e{getProjects(){return{java:[{name:"Simple chat",description:"A simple multi-client chat",img_name:"simple_chat.png",link:"https://github.com/RafaelSaesPalaria/simpleChat"},{name:"Bomb Runner",description:"Clear the area while avoiding stepping on the bombs.",img_name:"bomb_runner.png",link:"https://github.com/RafaelSaesPalaria/BombRunner"}],web:[{name:"Quick Canvas",description:"A Chrome Extension for downloading canvas",img_name:"quick_canvas.png",link:"https://chromewebstore.google.com/detail/quick-canvas/fdlclenmhidfmdekcbiolbimnkdfemde"},{name:"Web Chat",description:"A Web server with a chat",img_name:"web_chat.png",link:"https://github.com/RafaelSaesPalaria/webChat"},{name:"Ball Runner",description:"Don't let the blue balls touch you",img_name:"ball_runner.png",link:"../../projects/ballrunner/"}]}}};e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=O({token:e,factory:e.\u0275fac,providedIn:"root"});let n=e;return n})();function $(n,e){if(n&1&&c(0,"app-project-item",1),n&2){let M=e.$implicit;l("project",M)}}var q=(()=>{let e=class e{constructor(o){let t=o.getProjects();this.projects=t.java}};e.\u0275fac=function(t){return new(t||e)(h(j))},e.\u0275cmp=s({type:e,selectors:[["app-java"]],standalone:!0,features:[m],decls:1,vars:1,consts:[[3,"project",4,"ngFor","ngForOf"],[3,"project"]],template:function(t,i){t&1&&x(0,$,1,1,"app-project-item",0),t&2&&l("ngForOf",i.projects)},dependencies:[_,f,y]});let n=e;return n})();var K=["icon"],X=["web"],Y=["java"],H=(()=>{let e=class e{constructor(){this.innerWidth=0,this.showIcons=!0}ngAfterViewInit(){this.onResize(),this.updateIcon()}updateIcon(){this.icon.nativeElement.style.display="none",console.log(this.innerWidth)}onResize(){typeof window<"u"&&(this.innerWidth=window.innerWidth),this.updateIcon()}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s({type:e,selectors:[["app-main-page"]],viewQuery:function(t,i){if(t&1&&(v(K,5),v(X,5),v(Y,5)),t&2){let d;b(d=C())&&(i.icon=d.first),b(d=C())&&(i.web=d.first),b(d=C())&&(i.java=d.first)}},hostBindings:function(t,i){t&1&&F("resize",function(){return i.onResize()},!1,S)},standalone:!0,features:[m],decls:12,vars:0,consts:[["icon",""],["web",""],["java",""],["rel","stylesheet","href",k`https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`],[1,"button"],[1,"material-symbols-outlined","expansive",2,"font-size","3vw"],["routerLink","/portfolio/web",1,"button","item","container"],["routerLink","/portfolio/java",1,"button","item","container"]],template:function(t,i){t&1&&(c(0,"link",3),r(1,"nav")(2,"a",4,0)(4,"span",5),p(5,"menu"),a()(),r(6,"a",6,1),p(8,"Web"),a(),r(9,"a",7,2),p(11,"Java"),a()())},dependencies:[w,f],styles:["a[_ngcontent-%COMP%]{display:block;text-align:center;padding:20px 0}@media screen and (max-width:767px){a[_ngcontent-%COMP%]{width:170px;font-size:.8em}}@media screen and (min-width:768px){a[_ngcontent-%COMP%]{width:270px}}"]});let n=e;return n})();function Z(n,e){if(n&1&&c(0,"app-project-item",1),n&2){let M=e.$implicit;l("project",M)}}var U=(()=>{let e=class e{constructor(o){let t=o.getProjects();this.projects=t.web,console.log(t)}};e.\u0275fac=function(t){return new(t||e)(h(j))},e.\u0275cmp=s({type:e,selectors:[["app-web"]],standalone:!0,features:[m],decls:1,vars:1,consts:[[3,"project",4,"ngFor","ngForOf"],[3,"project"]],template:function(t,i){t&1&&x(0,Z,1,1,"app-project-item",0),t&2&&l("ngForOf",i.projects)},dependencies:[_,f,y]});let n=e;return n})();var G=[{path:"portfolio/",component:H},{path:"portfolio/web",component:U},{path:"portfolio/java",component:q}];var J={providers:[A(G),E()]};var ee={providers:[W()]},V=T(J,ee);var te=()=>D(L,V),Se=te;export{Se as a};
