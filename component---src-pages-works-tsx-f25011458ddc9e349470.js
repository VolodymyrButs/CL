(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{"08oM":function(e,t,n){"use strict";n.d(t,"a",(function(){return v}));var i=n("q1tI"),a=n.n(i),o=n("9Koi"),r=n("vOnD"),l=n("8FGe"),d=n("JZ9r"),c=n("AJl+"),m=n("WZMH"),p=n("+wav"),s=n("LuW/"),g=n("nVRz"),h=n("TBFr"),u=n("ZSPo"),f=n("tyI+"),b=r.c.div.withConfig({displayName:"DefaultFormBlock__FormWrapper",componentId:"sc-1htlr1n-0"})(["display:flex;justify-content:center;position:relative;background-color:",";width:100%;",";@media (min-width:","){border-bottom:1px solid ",";}"],s.a.formPromo,p.a,g.b.tablet,s.b.dark),x=r.c.div.withConfig({displayName:"DefaultFormBlock__InputBlock",componentId:"sc-1htlr1n-1"})(["display:flex;flex-direction:column;@media (min-width:","){width:calc(100% - 150px);margin-right:150px;}"],g.b.desktop),w=r.c.div.withConfig({displayName:"DefaultFormBlock__FormTitle",componentId:"sc-1htlr1n-2"})(["font-family:'Yeseva One',sans-serif;font-style:normal;font-weight:normal;font-size:24px;line-height:30px;letter-spacing:1px;color:",";text-align:center;margin:40px 0 24px;@media (min-width:","){font-size:32px;text-align:left;margin:56px 0 24px;}"],s.b.dark,g.b.tablet),y=r.c.div.withConfig({displayName:"DefaultFormBlock__FormColumn",componentId:"sc-1htlr1n-3"})(["width:100%;padding:",";display:flex;flex-direction:column;flex-shrink:0;box-sizing:border-box;"," @media (min-width:","){flex-direction:row;}"],(function(e){return!0===e.$size?"0":"0 32px"}),(function(e){return!0===e.$size?Object(r.b)(["span{box-sizing:border-box;padding:0 32px;width:100%;@media (min-width:","){width:50%;}div{@media (min-width:","){min-width:200px;}form{div{@media (min-width:","){margin-right:0px;width:calc(100% - 50px);}}}}span{padding:0;}}> div{border-top:1px solid #000;width:100%;flex-shrink:0;@media (min-width:","){width:50%;border-top:none;}}"],g.b.tablet,g.b.tablet,g.b.tablet,g.b.tablet):""}),g.b.tablet),k=r.c.span.withConfig({displayName:"DefaultFormBlock__Wrap",componentId:"sc-1htlr1n-4"})(["width:100%;display:flex;flex-direction:column;justify-content:space-between;"]),v=function(e){var t=e.withPhoneMobile,n=e.tracking,i=e.children,r=void 0===i?null:i,p=e.textTitle,s=Object(o.a)().t,g=Object(f.d)(),v=g.handleSubmitStatus,_=g.handleFormSendStart,E=g.formSendStatus;return a.a.createElement(b,null,a.a.createElement(h.a,{columns:"1fr",tabletColumns:"1fr 2fr"},a.a.createElement(u.a,{withPhoneMobile:t}),a.a.createElement(y,{$size:Boolean(r)},a.a.createElement(k,null,a.a.createElement(w,null,s(p?"designQuestion":"defaultFormTitle")),a.a.createElement(l.a,Object.assign({buttonText:s("send"),onFormSubmit:v,formSendStatus:E,onFormSendStart:_},n),(function(e){var t=e.register,n=e.errors;return a.a.createElement(x,null,a.a.createElement(d.a,{ref:t({minLength:18,required:!0}),err:n.phone}),a.a.createElement(m.a,{ref:t,err:n.message}),a.a.createElement(c.a,{ref:t,err:n.email}))}))),r)))}},"84aS":function(e,t,n){"use strict";n.d(t,"a",(function(){return m}));var i=n("6L58"),a=n("9szQ"),o=n("q1tI"),r=n.n(o),l=n("qhky"),d=n("9Koi"),c=Object.keys(a.a),m=function(e){var t=e.data,n=Object(d.a)().i18n,a=t[n.language],o=Object(i.a)().getPagePath;return r.a.createElement(l.a,null,r.a.createElement("title",null,a.title," - Clearline"),r.a.createElement("meta",{name:"description",content:a.description}),r.a.createElement("html",{lang:n.language}),c.map((function(e){return r.a.createElement("link",{key:e,rel:"alternate",hrefLang:e,href:"https://clearline.com.ua/new"+o(e)})})))}},Boa8:function(e,t,n){"use strict";n.d(t,"a",(function(){return T}));var i=n("q1tI"),a=n.n(i),o=n("vOnD"),r=n("9Koi"),l=n("Wbzz"),d=o.c.div.withConfig({displayName:"StarRating__Wrapper",componentId:"sc-1r4xbg4-0"})(["svg{padding:0 6px;}"]),c=function(e){var t=e.rating,n=e.quantity,i=Array.from(Array(n),(function(e,t){return t+1}));return a.a.createElement(d,null,i.map((function(e){if(e<=t)return a.a.createElement("svg",{key:e,viewBox:"0 0 51 48",width:"18px",height:"18px"},a.a.createElement("path",{fill:"#E24C1A",className:"widget",d:"m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"}));if(e>t&&e-t<1){var n=Math.round(100*(1-(e-t)))+"%",i="widgetGrad"+e,o="url(#"+i+")";return a.a.createElement("svg",{key:e,viewBox:"0 0 51 48",width:"18px",height:"18px"},a.a.createElement("defs",null,a.a.createElement("linearGradient",{id:i,x1:"0%",y1:"0%",x2:"100%",y2:"0%"},a.a.createElement("stop",{offset:"0%",stopColor:"rgb(35, 31, 32)"}),a.a.createElement("stop",{offset:n,stopColor:"rgb(35, 31, 32)"}),a.a.createElement("stop",{offset:n,stopColor:"rgb(203, 211, 227)"}),a.a.createElement("stop",{offset:"100%",stopColor:"rgb(203, 211, 227)"}))),a.a.createElement("path",{fill:o,className:"widget",d:"m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"}))}return a.a.createElement("svg",{key:e,viewBox:"0 0 51 48",width:"18px",height:"18px"},a.a.createElement("path",{fill:"rgb(203, 211, 227)",className:"widget",d:"m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"}))})))},m=n("TBFr"),p=n("LuW/"),s=n("nVRz"),g=n("+wav"),h=n("C+aA"),u=n("JdLQ"),f=n("k2+L"),b=n("2VDg"),x=n.n(b),w=n("BeEX"),y=n("J+G1"),k=n("b++t"),v=o.c.div.withConfig({displayName:"Reviews__ReviewsWrapper",componentId:"m94l8s-0"})(["display:flex;justify-content:center;width:100%;background-color:",";position:relative;border-bottom:1px solid ",";",""],p.a.contact,p.b.dark,g.a),_=o.c.div.withConfig({displayName:"Reviews__RankTextWrapper",componentId:"m94l8s-1"})(["display:flex;justify-content:center;color:",";span{font-style:normal;font-weight:bold;font-size:24px;line-height:33px;align-self:flex-end;@media (min-width:","){font-size:20px;line-height:24px;}@media (min-width:","){font-size:24px;line-height:33px;}}"],p.b.dark,s.b.tablet,s.b.desktop),E=o.c.p.withConfig({displayName:"Reviews__Rank",componentId:"m94l8s-2"})(["font-style:normal;font-weight:bold;font-size:32px;line-height:38px;margin-left:5px;color:",";@media (min-width:","){font-size:24px;line-height:28px;}@media (min-width:","){font-size:32px;line-height:38px;}"],p.b.accentText,s.b.tablet,s.b.desktop),C=o.c.div.withConfig({displayName:"Reviews__RankStarWrapper",componentId:"m94l8s-3"})(["display:flex;align-items:center;margin:14px auto;@media (min-width:","){margin:14px 0;}"],s.b.tablet),j=Object(o.c)(x.a).withConfig({displayName:"Reviews__GoogleIcon",componentId:"m94l8s-4"})(["margin-right:18px;"]),I=o.c.div.withConfig({displayName:"Reviews__TextWrapper",componentId:"m94l8s-5"})(["display:flex;overflow:hidden;"]),z=o.c.div.withConfig({displayName:"Reviews__Text",componentId:"m94l8s-6"})(["width:100%;overflow-y:auto;p{padding-top:10px;text-align:center;font-style:normal;font-weight:normal;font-size:16px;line-height:26px;letter-spacing:0.4px;@media (min-width:","){text-align:left;}strong{font-weight:700;}}"],s.b.tablet),O=o.c.a.withConfig({displayName:"Reviews__SubTitle",componentId:"m94l8s-7"})(["font-style:normal;font-weight:normal;font-size:16px;line-height:26px;letter-spacing:0.4px;text-decoration:underline;text-underline-position:under;color:",";margin-bottom:20px;"],p.b.dark),W=o.c.div.withConfig({displayName:"Reviews__BottomText",componentId:"m94l8s-8"})(["font-style:normal;font-size:16px;line-height:26px;letter-spacing:0.4px;color:",";text-align:center;font-weight:bold;margin:25px auto;@media (min-width:","){margin:25px 0 0px;text-align:left;}"],p.b.dark,s.b.tablet),N=Object(o.c)(h.a).withConfig({displayName:"Reviews__TitleStyled",componentId:"m94l8s-9"})(["@media (min-width:","){margin-left:0;}"],s.b.tablet),S=Object(o.c)(f.a).withConfig({displayName:"Reviews__SliderStyled",componentId:"m94l8s-10"})(["background-color:",";"],p.a.contact),P=o.c.div.withConfig({displayName:"Reviews__Review",componentId:"m94l8s-11"})(["display:flex;flex-direction:column;justify-content:space-between;padding:8px;box-sizing:border-box;border:1px solid ",";border-radius:40px;height:430px;@media (min-width:500px){height:330px;}@media (min-width:","){height:330px;padding:30px;align-items:flex-start;margin:40px;}@media (min-width:","){padding:10px 50px;height:280px;}:focus{outline:none;}"],p.b.dark,s.b.tablet,s.b.desktop),R=o.c.div.withConfig({displayName:"Reviews__HeroColumn",componentId:"m94l8s-12"})(["display:flex;flex-direction:column;align-items:center;justify-content:space-between;border-bottom:1px solid ",";@media (min-width:","){padding:0 10px 56px ",";align-items:flex-start;border-bottom:none;border-right:1px solid ",";}@media (min-width:","){padding:0 10px 26px ",";}"],p.b.dark,s.b.tablet,w.a.heroColumnTablet,p.b.dark,s.b.desktop,w.a.heroColumnDesktop),D=o.c.div.withConfig({displayName:"Reviews__SlideWrapper",componentId:"m94l8s-13"})([""]),T=function(e){var t=e.arrows,n=Object(r.a)().i18n,i=Object(l.useStaticQuery)("2624495633"),o=i.allReviewsYaml.edges.find((function(e){return"reviews"===e.node.parent.name})).node,d=o.rating,s=o.reviewsQuantity,g=o.link,h=o.reviewsArr,f=Object(u.a)(i.allReviewsYaml,n.language),b=f.title,x=f.ourRank,w=f.quantity1,T=f.quantity2,F={dots:!0,infinite:!0,speed:100,arrows:!!t,nextArrow:a.a.createElement(k.a,{bottom:!0}),prevArrow:a.a.createElement(k.b,{bottom:!0})},B=function(e,t,n){var i=[],a=0;if(e>n-t+1)return[];for(;a<e;){var o=Math.floor(Math.random()*(n-t+1))+t;i.includes(o)||(a++,i.push(o))}return i}(5,0,h.length-1);return a.a.createElement(v,null,a.a.createElement(m.a,{columns:"1fr",tabletColumns:"1fr 2fr"},a.a.createElement(R,null,a.a.createElement(N,null," ",b),a.a.createElement(_,null,a.a.createElement("span",null,x,": "),a.a.createElement(E,null,d),a.a.createElement("span",null,"/5")),a.a.createElement(C,null,a.a.createElement(j,null),a.a.createElement(c,{rating:d,quantity:5})),a.a.createElement(O,{href:g,target:"blank",onClick:function(){Object(y.e)("Click",{eventCategory:"GoogleRewiews"})}},w," ",s," ",T)),a.a.createElement(S,Object.assign({},F,{background:p.a.contact}),B.map((function(e){return a.a.createElement(D,{key:e,onClick:function(){Object(y.e)("Click",{eventCategory:"ReviewItem",author:h[e].name})}},a.a.createElement(P,null,a.a.createElement("p",null),a.a.createElement(I,null,a.a.createElement(z,{dangerouslySetInnerHTML:{__html:h[e].text}})),a.a.createElement(W,null,h[e].name,", ",h[e].location)))})))))}},K7k0:function(e,t,n){},Q3IO:function(e,t,n){"use strict";n.r(t);var i=n("q1tI"),a=n.n(i),o=n("9Koi"),r=n("vOnD"),l=n("Wbzz"),d=n("nVRz"),c=n("LuW/"),m=n("+wav"),p=n("TBFr"),s=n("s/Wa"),g=n("TpvN"),h=r.c.div.withConfig({displayName:"WorksHero__WorksHeroWrapper",componentId:"iw5v63-0"})(["display:flex;justify-content:center;width:100%;background-color:",";position:relative;border-bottom:1px solid ",";:before{","}",""],c.a.project,c.b.dark,s.a,m.a),u=r.c.div.withConfig({displayName:"WorksHero__LeftSidebar",componentId:"iw5v63-1"})(["display:none;@media (min-width:","){display:flex;flex-grow:1;min-width:80px;background-color:",";box-sizing:border-box;}"],d.b.tablet,c.a.project),f=Object(r.c)(u).withConfig({displayName:"WorksHero__RightSidebar",componentId:"iw5v63-2"})(["@media (min-width:","){background-color:",";}"],d.b.tablet,c.b.white),b=r.c.div.withConfig({displayName:"WorksHero__SubTitle",componentId:"iw5v63-3"})(["font-weight:normal;font-size:16px;line-height:26px;text-align:center;letter-spacing:0.4px;color:",";margin:16px;p{margin:10px 0;}@media (min-width:","){text-align:left;margin:0;margin-bottom:32px;}"],c.b.dark,d.b.tablet),x=r.c.div.withConfig({displayName:"WorksHero__HeroColumn",componentId:"iw5v63-4"})(["padding:0px 16px 33px;display:flex;flex-direction:column;align-items:center;@media (min-width:","){padding:60px 30px 60px 48px;align-items:flex-start;}"],d.b.tablet),w=r.c.h1.withConfig({displayName:"WorksHero__Title",componentId:"iw5v63-5"})(["font-family:'Yeseva One',sans-serif;font-style:normal;font-weight:normal;font-size:48px;line-height:55px;text-align:center;letter-spacing:2.37176px;color:",";margin:35px auto 0;@media (min-width:","){font-size:34px;line-height:39px;letter-spacing:1.68px;margin:0;}@media (min-width:","){font-size:52px;line-height:60px;letter-spacing:2.68px;}"],c.b.darkText,d.b.tablet,d.b.desktop),y=r.c.div.withConfig({displayName:"WorksHero__ProjectColumn",componentId:"iw5v63-6"})(["width:100%;box-sizing:border-box;background-color:",";z-index:1;outline:1px solid ",";:hover{background-color:",";}"],c.b.white,c.b.dark,c.a.project),k=function(){var e=Object(o.a)().i18n,t=Object(l.useStaticQuery)("3400308145"),n=t.allProjectsYaml.edges[0].node,i=t.allProjectsYaml.edges[1].node,r=t.allWorksYaml.edges[0].node[e.language],d=r.title,c=r.subtitle;return a.a.createElement(h,null,a.a.createElement(u,null),a.a.createElement(p.a,{columns:"1fr",tabletColumns:"1fr  1fr 1fr"},a.a.createElement(x,null,a.a.createElement(w,null,d),a.a.createElement(b,{dangerouslySetInnerHTML:{__html:c}})),a.a.createElement(y,null,a.a.createElement(g.a,{image:n.previewImage.portrait,description:n[e.language].name,link:n.parent.name})),a.a.createElement(y,null,a.a.createElement(g.a,{image:i.previewImage.portrait,description:i[e.language].name,link:i.parent.name}))),a.a.createElement(f,null))},v=n("n57c"),_=n("J+G1"),E=r.c.div.withConfig({displayName:"WorksProjectGrid__WorksGridWrapper",componentId:"iyk5nq-0"})(["display:flex;flex-direction:column;align-items:center;width:100%;position:relative;:before{","}",";"],s.a,m.a),C=r.c.ul.withConfig({displayName:"WorksProjectGrid__Ul",componentId:"iyk5nq-1"})(["width:100%;margin:0 auto;display:grid;grid-template-columns:1fr;grid-auto-rows:140vw;@media (min-width:","){grid-template-columns:1fr 1fr 1fr;grid-auto-rows:450px;max-width:calc(100% - 160px);}@media (min-width:","){grid-auto-rows:550px;max-width:1190px;}"],d.b.tablet,d.b.desktop),j=r.c.li.withConfig({displayName:"WorksProjectGrid__Li",componentId:"iyk5nq-2"})(["outline:1px solid ",";list-style:none;background-color:white;color:white;display:flex;flex-flow:column;justify-content:center;align-items:center;grid-column:span 1;@media (min-width:","){:nth-child(4n + 1){grid-column:span 2;}:nth-child(4n + 4){grid-column:span 2;}}:hover{background-color:",";}"],c.b.dark,d.b.tablet,c.a.project),I=r.c.div.withConfig({displayName:"WorksProjectGrid__Div",componentId:"iyk5nq-3"})(["border-right:1px solid ",";"],c.b.dark),z=Object(r.c)(p.a).withConfig({displayName:"WorksProjectGrid__ButtonContainer",componentId:"iyk5nq-4"})(["margin-top:1px;"]),O=r.c.div.withConfig({displayName:"WorksProjectGrid__ButtonWrapper",componentId:"iyk5nq-5"})(["display:flex;justify-content:center;@media (min-width:","){justify-content:flex-start;}"],d.b.tablet),W=Object(r.c)(v.a).withConfig({displayName:"WorksProjectGrid__ButtonStyled",componentId:"iyk5nq-6"})(["margin:30px;font-weight:600;background-color:",";color:",";"],c.a.formPromo,c.b.dark),N=function(){var e=Object(o.a)(),t=e.i18n,n=e.t,r=Object(i.useState)(4),d=r[0],c=r[1],m=function(e,t){for(var n=0;n<t;n++)if(e+1===4*n+1||e+1===4*n+4)return 0;return 1},p=Object(l.useStaticQuery)("663406917").allProjectsYaml.edges.slice(2);return a.a.createElement(E,null,a.a.createElement(C,null,p.slice(0,d).map((function(e,n,i){return a.a.createElement(j,{key:n},a.a.createElement(g.a,{image:0===m(n,i.length)?e.node.previewImage.landscape:e.node.previewImage.portrait,description:e.node[t.languages[0]].name,link:e.node.parent.name}))}))),p.length>d&&a.a.createElement(z,{columns:"1fr",tabletColumns:"1fr 2fr"},a.a.createElement(I,null),a.a.createElement(O,null,a.a.createElement(W,{onClick:function(){c(p.length),Object(_.e)("Click",{eventCategory:"ShowMoreButton",placement:"Works",target:"ShowMore"})}},n("showMore")))))},S=n("84aS"),P=n("9sSY"),R=n("08oM"),D=n("Boa8"),T={uk:{title:"Роботи студії дизайну інтер`єру ClearLine",description:"Роботи за дизайном інтер`єрів студій ClearLine"},ru:{title:"Работы студии дизайна интерьера ClearLine",description:"Работы по дизайну интерьеров студии  ClearLine"},en:{title:"ClearLine interior design studio works",description:"Works on interior design of the ClearLine studio"}};t.default=function(){return a.a.createElement(P.a,null,a.a.createElement(S.a,{data:T}),a.a.createElement(k,null),a.a.createElement(N,null),a.a.createElement(D.a,null),a.a.createElement(R.a,{withPhoneMobile:!0,tracking:{conversionType:"FormWorksPageBottom",eventCategory:"FormWorksPageBottom"}}))}},TpvN:function(e,t,n){"use strict";n.d(t,"a",(function(){return _}));var i=n("q1tI"),a=n.n(i),o=n("vOnD"),r=n("9eSz"),l=n.n(r),d=n("9Koi"),c=n("LuW/"),m=n("nVRz"),p=n("zV//"),s=n.n(p),g=n("n57c"),h=n("IyNa"),u=n("+tsP"),f=n("Wbzz"),b=Object(o.c)(l.a).withConfig({displayName:"WorksProjectItem__Image",componentId:"sc-1bagi9r-0"})(["width:100%;height:100%;"]),x=Object(o.c)(h.a).withConfig({displayName:"WorksProjectItem__HoverWrapper",componentId:"sc-1bagi9r-1"})(["display:flex;flex-direction:column;align-items:center;justify-content:space-around;position:absolute;top:0;bottom:0;left:0;right:0;background-color:rgba(0,0,0,0.7);opacity:0.8;transition:opacity 0.4s;text-decoration:none;@media (min-width:","){opacity:0;}"],m.b.tablet),w=o.c.div.withConfig({displayName:"WorksProjectItem__ItemWrapper",componentId:"sc-1bagi9r-2"})(["position:relative;width:calc(100% - 60px);height:calc(100% - 60px);margin:30px;outline:1px solid ",";flex:1;&:hover{","{@media (min-width:","){opacity:0.8;}}}"],c.b.dark,x,m.b.tablet),y=Object(o.c)(s.a).withConfig({displayName:"WorksProjectItem__LogoStyled",componentId:"sc-1bagi9r-3"})(["fill:",";"],c.b.white),k=Object(o.c)(g.a).withConfig({displayName:"WorksProjectItem__ButtonS",componentId:"sc-1bagi9r-4"})(["width:262px;background-color:transparent;padding:20px 20px;border:1px solid ",";font-family:'Open Sans',sans-serif;font-style:normal;font-weight:600;font-size:16px;line-height:24px;text-transform:uppercase;text-align:center;"],c.b.white),v=o.c.p.withConfig({displayName:"WorksProjectItem__Description",componentId:"sc-1bagi9r-5"})(["color:",";margin:0 16px;text-align:center;font-style:normal;font-weight:normal;font-size:18px;line-height:28px;letter-spacing:0.889412px;"],c.b.white),_=function(e){var t=e.image,n=e.description,i=e.link,o=Object(f.useStaticQuery)("1588945351"),r=Object(d.a)().t,l=Object(u.a)(o.allImageSharp,t);return a.a.createElement(w,null,a.a.createElement(b,{fluid:l.fluid,imgStyle:{objectFit:"containe"},alt:l.parent.name,title:l.parent.name,loading:"eager"}),a.a.createElement(x,{"aria-label":i,to:"works/"+i},a.a.createElement(y,null),a.a.createElement(v,null,n),a.a.createElement(k,null,r("showProject"))))}},ZSPo:function(e,t,n){"use strict";n.d(t,"a",(function(){return C}));var i=n("q1tI"),a=n.n(i),o=n("9Koi"),r=n("vOnD"),l=n("Wbzz"),d=n("9eSz"),c=n.n(d),m=n("nVRz"),p=n("p8aw"),s=n("LuW/"),g=n("C+aA"),h=n("cp0P"),u=n("JdLQ"),f=n("BeEX"),b=n("+tsP"),x=r.c.div.withConfig({displayName:"DefaultFormHero__HeroColumn",componentId:"nz07nj-0"})(["display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:0 32px;box-sizing:border-box;border-bottom:1px solid ",";width:100%;max-width:100vw;@media (min-width:","){border-bottom:none;padding:0;justify-content:space-between;align-items:flex-start;border-right:1px solid ",";}"],s.b.dark,m.b.tablet,s.b.dark),w=Object(r.c)(g.a).withConfig({displayName:"DefaultFormHero__TitleStyledMobile",componentId:"nz07nj-1"})(["margin:56px 0 30px;font-size:25px;max-width:100%;@media (min-width:","){display:none;padding:0 32px;}"],m.b.tablet),y=Object(r.c)(g.a).withConfig({displayName:"DefaultFormHero__TitleStyledDesktop",componentId:"nz07nj-2"})(["display:none;@media (min-width:","){display:block;margin-left:",";text-align:left;}@media (min-width:","){margin-left:",";}"],m.b.tablet,f.a.heroColumnTablet,m.b.desktop,f.a.heroColumnDesktop),k=r.c.p.withConfig({displayName:"DefaultFormHero__Price",componentId:"nz07nj-3"})(["font-family:'Yeseva One',sans-serif;font-style:normal;font-weight:normal;font-size:64px;line-height:74px;letter-spacing:0.888889px;color:",";margin:0 10px;"],s.b.accentText),v=r.c.h3.withConfig({displayName:"DefaultFormHero__SubTitle",componentId:"nz07nj-4"})(["display:none;@media (min-width:","){display:block;text-align:left;font-weight:normal;font-size:16px;line-height:26px;letter-spacing:0.4px;color:",";margin-bottom:32px;padding:0 ",";}@media (min-width:","){padding:0 ",";}"],m.b.tablet,s.b.dark,f.a.heroColumnTablet,m.b.desktop,f.a.heroColumnDesktop),_=Object(r.c)(p.a).withConfig({displayName:"DefaultFormHero__PhoneLinkStyled",componentId:"nz07nj-5"})(["flex-direction:column;div{margin-bottom:24px;}margin-bottom:50px;align-self:center;"," @media (min-width:","){flex-direction:row;align-items:center;margin:0 20px 40px 0;padding:0 38px;div{width:100px;height:100px;margin-bottom:0;}div > div > svg{top:-50%;}}"],(function(e){return e.withPhoneMobile?"display: flex;":"display: none;"}),m.b.desktop),E=Object(r.c)(c.a).withConfig({displayName:"DefaultFormHero__Image",componentId:"nz07nj-6"})(["display:none;@media (min-width:","){display:block;width:90%;height:auto;align-self:center;color:transparent;}"],m.b.tablet),C=function(e){var t=e.image,n=e.withPhoneMobile,i=Object(o.a)().i18n,r=Object(l.useStaticQuery)("1832306651"),d=Object(b.a)(r.allImageSharp,"fikus.webp"),c=Object(u.a)(r.allFormYaml,i.language),m=c.titleMobile,p=c.titleDesktop,s=c.description,g=c.price;return a.a.createElement(x,null,a.a.createElement(w,null,m,a.a.createElement(k,null,g)),a.a.createElement(y,null,p),!t&&a.a.createElement(v,null,s),a.a.createElement(_,{phone:h.a.primaryPhone,withPhoneMobile:n,placement:"Form"}),t&&a.a.createElement(E,{fluid:d.fluid,loading:"eager"}))}},"k2+L":function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var i=n("zLVn"),a=n("q1tI"),o=n.n(a),r=n("vOnD"),l=n("nVRz"),d=n("OS56"),c=n.n(d),m=(n("tyWD"),n("K7k0"),n("b++t")),p=r.c.div.withConfig({displayName:"SliderComponent__CarouselWrapper",componentId:"m5r0ma-0"})(["width:100vw;box-sizing:border-box;overflow:hidden;margin:0;height:auto;padding:16px 32px 26px;@media (min-width:","){max-width:calc((100vw - 160px) * 0.6666);height:auto;padding:0;}@media (min-width:","){max-width:calc(("," - 160px) * 0.6666);max-height:600px;}.slick-list{margin:0 -16px;@media (min-width:","){margin:0 -30px;}}img{cursor:grab;}.slick-slide > div{margin:0 16px;@media (min-width:","){margin:0 30px;}}.slick-dots{bottom:-22px;left:0;@media (min-width:","){bottom:5px;}li{width:10px;button{width:10px;::before{width:10px;}}}}"],l.b.tablet,l.b.desktop,l.b.desktop,l.b.tablet,l.b.tablet,l.b.tablet),s=function(e){var t=e.children,n=Object(i.a)(e,["children"]),a={nextArrow:o.a.createElement(m.a,null),prevArrow:o.a.createElement(m.b,null)};return o.a.createElement(p,n,o.a.createElement(c.a,Object.assign({},a,n),t))}},"s/Wa":function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var i=n("vOnD"),a=n("+xXw"),o=n("nVRz"),r=Object(i.b)(["position:fixed;top:0;left:0;width:100%;z-index:-1;height:",";background-color:inherit;content:'';@media (min-width:","){height:",";}"],a.a.mobile,o.b.tablet,a.a.desktop)},tyWD:function(e,t,n){}}]);
//# sourceMappingURL=component---src-pages-works-tsx-f25011458ddc9e349470.js.map