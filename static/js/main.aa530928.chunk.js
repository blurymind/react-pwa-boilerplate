(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{42:function(e,t,n){},50:function(e,t,n){},51:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),i=n(30),c=n.n(i),a=n(10),s=(n(42),n(3)),l=n(2),d=function(){return Object(l.jsxs)("nav",{className:"flex justify-between item-center h-16 bg-white text-black relative shadow-sm font-mono",role:"navigation",children:[Object(l.jsx)(a.c,{className:"p4",to:"/",children:"Home"}),Object(l.jsx)(a.c,{className:"p4",to:"/about",children:"About"}),Object(l.jsx)("div",{className:"px-4 cursor-pointer",children:Object(l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(l.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}),Object(l.jsx)("div",{className:"pr-8 md:block hidden"})]})},u=n(17),h=n.p+"static/media/logo.103b5fa1.svg",j=n(12),b=n(57),p=n(58),f="card",g={border:"1px dashed gray",padding:"0.5rem 1rem",marginBottom:".5rem",backgroundColor:"white",color:"black",cursor:"move"},m=function(e){var t=e.id,n=e.tooltip,o=e.children,i=e.style,c=void 0===i?g:i,a=e.index,s=e.moveCard,d=Object(r.useRef)(null),h=Object(b.a)({accept:f,collect:function(e){return{handlerId:e.getHandlerId()}},hover:function(e,t){var n;if(d.current){var r=e.index,o=a;if(r!==o){var i=null===(n=d.current)||void 0===n?void 0:n.getBoundingClientRect(),c=(i.bottom-i.top)/2,l=t.getClientOffset().y-i.top;r<o&&l<c||r>o&&l>c||(s(r,o),e.index=o)}}}}),m=Object(u.a)(h,2),v=m[0].handlerId,x=m[1],O=Object(p.a)({type:f,item:function(){return{id:t,index:a}},collect:function(e){return{isDragging:e.isDragging()}}}),w=Object(u.a)(O,2),y=w[0].isDragging?0:1;return(0,w[1])(x(d)),Object(l.jsx)("div",{ref:d,style:Object(j.a)(Object(j.a)({},c),{},{opacity:y}),"data-handler-id":v,title:n,children:o})},v=n(33),x=n.n(v),O=n(56),w=n(35),y={display:"flex",flex:1,width:"100%",height:"100%"},k=function(e){var t=e.cards,n=void 0===t?[]:t,o=e.setCards,i=e.style,c=void 0===i?y:i,a=e.isHorizontal,s=Object(r.useCallback)((function(e,t){var r=n[e];o(x()(n,{$splice:[[e,1],[t,0,r]]}))}),[n]);return Object(l.jsx)(l.Fragment,{children:Object(l.jsx)("div",{style:Object(j.a)(Object(j.a)({},c),{},{flexDirection:a?"row":"column"}),children:n.map((function(e,t){return function(e,t){return Object(l.jsx)(m,{index:t,id:e.id,tooltip:e.tooltip,moveCard:s,style:e.style,children:e.children},e.id)}(e,t)}))})})},C=function(e){var t=e.cards,n=void 0===t?[]:t,r=e.setCards,o=e.style,i=e.isHorizontal;return Object(l.jsx)(O.a,{backend:w.a,children:Object(l.jsx)(k,{cards:n,setCards:r,style:o,isHorizontal:i})})},A=[{id:1,children:"Write a cool JS library"},{id:2,tooltip:"Make it generic enough",children:Object(l.jsx)("button",{onClick:function(){return alert("yay")},children:"Test"})},{id:3,children:"Write README"},{id:4,children:"Create some examples"},{id:5,tooltip:"Spam in Twitter and IRC to promote it (note that this element is taller than the others)"},{id:6,children:"???"},{id:7,children:"PROFIT"}],N=function(){var e=Object(r.useState)(A),t=Object(u.a)(e,2),n=t[0],o=t[1];return Object(r.useEffect)((function(){var e=null,t=document.getElementById("addBtn");window.addEventListener("beforeinstallprompt",(function(n){n.preventDefault(),e=n,t.style.display="block",t.addEventListener("click",(function(){t.style.display="none",e.prompt(),e.userChoice.then((function(n){"accepted"===n.outcome?(console.log("User accepted the A2HS prompt"),t.style.display="none"):console.log("User dismissed the A2HS prompt"),e=null}))}))}))}),[]),Object(l.jsx)("div",{className:"App",children:Object(l.jsxs)("header",{className:"App-header",children:[Object(l.jsx)("img",{src:h,className:"App-logo",alt:"logo"}),Object(l.jsxs)("p",{className:"text-red-500",children:["Edit ",Object(l.jsx)("code",{children:"src/App.tsx"})," and save to reload."]}),Object(l.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"}),Object(l.jsx)("br",{}),Object(l.jsx)("button",{id:"addBtn",children:"Add pwa"}),Object(l.jsx)(C,{cards:n,setCards:o})]})})},S=function(){return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("div",{children:"Created by Todor Imreorov"}),Object(l.jsx)("a",{href:"https://github.com/blurymind/react-pwa-boilerplate",children:"Check out the source code at https://github.com/blurymind/react-pwa-boilerplate"})]})},W=(n(50),function(){return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(d,{}),Object(l.jsx)(a.b,{basename:".",children:Object(l.jsx)(s.a,{render:function(e){var t=e.location;return Object(l.jsxs)(s.c,{location:t,children:[Object(l.jsx)(s.a,{path:"/",exact:!0,component:N}),Object(l.jsx)(s.a,{path:"/about",component:S})]})}})})]})}),E=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function B(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var I=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,59)).then((function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),r(e),o(e),i(e),c(e)}))};c.a.render(Object(l.jsx)(o.a.StrictMode,{children:Object(l.jsx)(a.a,{children:Object(l.jsx)(W,{})})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL(".",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat(".","/service-worker.js");E?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):B(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):B(t,e)}))}}(),I()}},[[51,1,2]]]);
//# sourceMappingURL=main.aa530928.chunk.js.map