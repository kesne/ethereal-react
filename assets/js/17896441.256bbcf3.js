"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7918],{9483:function(e,t,a){a.r(t),a.d(t,{default:function(){return S}});var n=a(9901),r=a(5789),l=a(7149),i=a(1146),o=a(970),s=a(7033),c=a(9596),d=a(1980);function m(e){var t=e.lastUpdatedAt,a=e.formattedLastUpdatedAt;return n.createElement(c.Z,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:n.createElement("b",null,n.createElement("time",{dateTime:new Date(1e3*t).toISOString()},a))}}," on {date}")}function u(e){var t=e.lastUpdatedBy;return n.createElement(c.Z,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:n.createElement("b",null,t)}}," by {user}")}function v(e){var t=e.lastUpdatedAt,a=e.formattedLastUpdatedAt,r=e.lastUpdatedBy;return n.createElement("span",{className:d.ThemeClassNames.common.lastUpdated},n.createElement(c.Z,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t&&a?n.createElement(m,{lastUpdatedAt:t,formattedLastUpdatedAt:a}):"",byUser:r?n.createElement(u,{lastUpdatedBy:r}):""}},"Last updated{atDate}{byUser}"),!1)}var f=a(3920),h=a(264),p="iconEdit_QiCs",E=["className"],g=function(e){var t=e.className,a=(0,h.Z)(e,E);return n.createElement("svg",(0,f.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,r.Z)(p,t),"aria-hidden":"true"},a),n.createElement("g",null,n.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))};function b(e){var t=e.editUrl;return n.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:d.ThemeClassNames.common.editThisPage},n.createElement(g,null),n.createElement(c.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}var N=a(229),T="tags_359v",_="tag_3jTb";function C(e){var t=e.tags;return n.createElement(n.Fragment,null,n.createElement("b",null,n.createElement(c.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),n.createElement("ul",{className:(0,r.Z)(T,"padding--none","margin-left--sm")},t.map((function(e){var t=e.label,a=e.permalink;return n.createElement("li",{key:a,className:_},n.createElement(N.Z,{name:t,permalink:a}))}))))}var k="lastUpdated_1UDC";function U(e){return n.createElement("div",{className:(0,r.Z)(d.ThemeClassNames.docs.docFooterTagsRow,"row margin-bottom--sm")},n.createElement("div",{className:"col"},n.createElement(C,e)))}function w(e){var t=e.editUrl,a=e.lastUpdatedAt,l=e.lastUpdatedBy,i=e.formattedLastUpdatedAt;return n.createElement("div",{className:(0,r.Z)(d.ThemeClassNames.docs.docFooterEditMetaRow,"row")},n.createElement("div",{className:"col"},t&&n.createElement(b,{editUrl:t})),n.createElement("div",{className:(0,r.Z)("col",k)},(a||l)&&n.createElement(v,{lastUpdatedAt:a,formattedLastUpdatedAt:i,lastUpdatedBy:l})))}function L(e){var t=e.content.metadata,a=t.editUrl,l=t.lastUpdatedAt,i=t.formattedLastUpdatedAt,o=t.lastUpdatedBy,s=t.tags,c=s.length>0,m=!!(a||l||o);return c||m?n.createElement("footer",{className:(0,r.Z)(d.ThemeClassNames.docs.docFooter,"docusaurus-mt-lg")},c&&n.createElement(U,{tags:s}),m&&n.createElement(w,{editUrl:a,lastUpdatedAt:l,lastUpdatedBy:o,formattedLastUpdatedAt:i})):n.createElement(n.Fragment,null)}var y=a(8284),Z=a(302),A=a(4957),B="docItemContainer_15fr",M="docItemCol_croC",O="tocMobile_3JGL";function S(e){var t,a=e.content,c=e.versionMetadata,m=a.metadata,u=a.frontMatter,v=u.image,f=u.keywords,h=u.hide_title,p=u.hide_table_of_contents,E=m.description,g=m.title,b=!h&&void 0===a.contentTitle,N=(0,l.default)(),T=!p&&a.toc&&a.toc.length>0,_=T&&("desktop"===N||"ssr"===N);return n.createElement(n.Fragment,null,n.createElement(s.default,{title:g,description:E,keywords:f,image:v}),n.createElement("div",{className:"row"},n.createElement("div",{className:(0,r.Z)("col",(t={},t[M]=!p,t))},n.createElement(o.default,{versionMetadata:c}),n.createElement("div",{className:B},n.createElement("article",null,c.badge&&n.createElement("span",{className:(0,r.Z)(d.ThemeClassNames.docs.docVersionBadge,"badge badge--secondary")},"Version: ",c.label),T&&n.createElement(Z.default,{toc:a.toc,className:(0,r.Z)(d.ThemeClassNames.docs.docTocMobile,O)}),n.createElement("div",{className:(0,r.Z)(d.ThemeClassNames.docs.docMarkdown,"markdown")},b&&n.createElement(A.MainHeading,null,g),n.createElement(a,null)),n.createElement(L,e)),n.createElement(i.default,{metadata:m}))),_&&n.createElement("div",{className:"col col--3"},n.createElement(y.default,{toc:a.toc,className:d.ThemeClassNames.docs.docTocDesktop}))))}},1146:function(e,t,a){a.r(t);var n=a(9901),r=a(2831),l=a(9596);t.default=function(e){var t=e.metadata;return n.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,l.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages navigation",description:"The ARIA label for the docs pagination"})},n.createElement("div",{className:"pagination-nav__item"},t.previous&&n.createElement(r.default,{className:"pagination-nav__link",to:t.previous.permalink},n.createElement("div",{className:"pagination-nav__sublabel"},n.createElement(l.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc"},"Previous")),n.createElement("div",{className:"pagination-nav__label"},"\xab ",t.previous.title))),n.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},t.next&&n.createElement(r.default,{className:"pagination-nav__link",to:t.next.permalink},n.createElement("div",{className:"pagination-nav__sublabel"},n.createElement(l.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc"},"Next")),n.createElement("div",{className:"pagination-nav__label"},t.next.title," \xbb"))))}},970:function(e,t,a){a.r(t);var n=a(9901),r=a(8566),l=a(2831),i=a(9596),o=a(266),s=a(1980),c=a(5789);var d={unreleased:function(e){var t=e.siteTitle,a=e.versionMetadata;return n.createElement(i.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:n.createElement("b",null,a.label)}},"This is unreleased documentation for {siteTitle} {versionLabel} version.")},unmaintained:function(e){var t=e.siteTitle,a=e.versionMetadata;return n.createElement(i.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:n.createElement("b",null,a.label)}},"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.")}};function m(e){var t=d[e.versionMetadata.banner];return n.createElement(t,e)}function u(e){var t=e.versionLabel,a=e.to,r=e.onClick;return n.createElement(i.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:n.createElement("b",null,n.createElement(l.default,{to:a,onClick:r},n.createElement(i.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label"},"latest version")))}},"For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).")}function v(e){var t,a=e.versionMetadata,l=(0,r.default)().siteConfig.title,i=(0,o.gA)({failfast:!0}).pluginId,d=(0,s.useDocsPreferredVersion)(i).savePreferredVersionName,v=(0,o.Jo)(i),f=v.latestDocSuggestion,h=v.latestVersionSuggestion,p=null!=f?f:(t=h).docs.find((function(e){return e.id===t.mainDocId}));return n.createElement("div",{className:(0,c.Z)(s.ThemeClassNames.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert"},n.createElement("div",null,n.createElement(m,{siteTitle:l,versionMetadata:a})),n.createElement("div",{className:"margin-top--md"},n.createElement(u,{versionLabel:h.label,to:p.path,onClick:function(){return d(h.name)}})))}t.default=function(e){var t=e.versionMetadata;return t.banner?n.createElement(v,{versionMetadata:t}):n.createElement(n.Fragment,null)}},4957:function(e,t,a){a.r(t),a.d(t,{MainHeading:function(){return u},default:function(){return v}});var n=a(264),r=a(3920),l=a(9901),i=a(5789),o=a(9596),s=a(1980),c="anchorWithStickyNavbar_3pef",d="anchorWithHideOnScrollNavbar_22v4",m=["id"],u=function(e){var t=Object.assign({},e);return l.createElement("header",null,l.createElement("h1",(0,r.Z)({},t,{id:void 0}),t.children))},v=function(e){return"h1"===e?u:(t=e,function(e){var a,r=e.id,u=(0,n.Z)(e,m),v=(0,s.useThemeConfig)().navbar.hideOnScroll;return r?l.createElement(t,u,l.createElement("a",{"aria-hidden":"true",tabIndex:-1,className:(0,i.Z)("anchor","anchor__"+t,(a={},a[d]=v,a[c]=!v,a)),id:r}),u.children,l.createElement("a",{className:"hash-link",href:"#"+r,title:(0,o.I)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"#")):l.createElement(t,u)});var t}},7033:function(e,t,a){a.r(t),a.d(t,{default:function(){return o}});var n=a(9901),r=a(5030),l=a(1980),i=a(9882);function o(e){var t=e.title,a=e.description,o=e.keywords,s=e.image,c=e.children,d=(0,l.useTitleFormatter)(t),m=(0,i.C)().withBaseUrl,u=s?m(s,{absolute:!0}):void 0;return n.createElement(r.Z,null,t&&n.createElement("title",null,d),t&&n.createElement("meta",{property:"og:title",content:d}),a&&n.createElement("meta",{name:"description",content:a}),a&&n.createElement("meta",{property:"og:description",content:a}),o&&n.createElement("meta",{name:"keywords",content:Array.isArray(o)?o.join(","):o}),u&&n.createElement("meta",{property:"og:image",content:u}),u&&n.createElement("meta",{name:"twitter:image",content:u}),c)}},8284:function(e,t,a){a.r(t),a.d(t,{TOCHeadings:function(){return v},default:function(){return f}});var n=a(9901),r=a(5789),l=a(1980);function i(e){var t=e.getBoundingClientRect();return t.top===t.bottom?i(e.parentNode):t}function o(e){var t,a=e.anchorTopOffset,n=Array.from(document.querySelectorAll(".anchor.anchor__h2, .anchor.anchor__h3")),r=n.find((function(e){return i(e).top>=a}));return r?function(e){return e.top>0&&e.bottom<window.innerHeight/2}(i(r))?r:null!=(t=n[n.indexOf(r)-1])?t:null:n[n.length-1]}function s(){var e=(0,n.useRef)(0),t=(0,l.useThemeConfig)().navbar.hideOnScroll;return(0,n.useEffect)((function(){e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}var c=function(e){var t=(0,n.useRef)(void 0),a=s();(0,n.useEffect)((function(){var n=e.linkClassName,r=e.linkActiveClassName;function l(){var e=function(e){return Array.from(document.getElementsByClassName(e))}(n),l=o({anchorTopOffset:a.current}),i=e.find((function(e){return l&&l.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)}));e.forEach((function(e){!function(e,a){if(a){var n;t.current&&t.current!==e&&(null==(n=t.current)||n.classList.remove(r)),e.classList.add(r),t.current=e}else e.classList.remove(r)}(e,e===i)}))}return document.addEventListener("scroll",l),document.addEventListener("resize",l),l(),function(){document.removeEventListener("scroll",l),document.removeEventListener("resize",l)}}),[e,a])},d="tableOfContents_kBo8",m="table-of-contents__link",u={linkClassName:m,linkActiveClassName:"table-of-contents__link--active"};function v(e){var t=e.toc,a=e.isChild;return t.length?n.createElement("ul",{className:a?"":"table-of-contents table-of-contents__left-border"},t.map((function(e){return n.createElement("li",{key:e.id},n.createElement("a",{href:"#"+e.id,className:m,dangerouslySetInnerHTML:{__html:e.value}}),n.createElement(v,{isChild:!0,toc:e.children}))}))):null}var f=function(e){var t=e.toc;return c(u),n.createElement("div",{className:(0,r.Z)(d,"thin-scrollbar")},n.createElement(v,{toc:t}))}},302:function(e,t,a){a.r(t),a.d(t,{default:function(){return u}});var n=a(9901),r=a(5789),l=a(9596),i=a(1980),o="tocCollapsible_2oxa",s="tocCollapsibleButton_1q6c",c="tocCollapsibleContent_2CUY",d="tocCollapsibleExpanded_2g4j",m=a(8284);function u(e){var t,a=e.toc,u=e.className,v=(0,i.useCollapsible)({initialState:!0}),f=v.collapsed,h=v.toggleCollapsed;return n.createElement("div",{className:(0,r.Z)(o,(t={},t[d]=!f,t),u)},n.createElement("button",{type:"button",className:(0,r.Z)("clean-btn",s),onClick:h},n.createElement(l.Z,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component"},"On this page")),n.createElement(i.Collapsible,{lazy:!0,className:c,collapsed:f},n.createElement(m.TOCHeadings,{toc:a})))}},229:function(e,t,a){a.d(t,{Z:function(){return c}});var n=a(9901),r=a(5789),l=a(2831),i="tag_3rBB",o="tagRegular_38tn",s="tagWithCount_g-wB";var c=function(e){var t,a=e.permalink,c=e.name,d=e.count;return n.createElement(l.default,{href:a,className:(0,r.Z)(i,(t={},t[o]=!d,t[s]=d,t))},c,d&&n.createElement("span",null,d))}},7149:function(e,t,a){a.r(t);var n=a(9901),r=a(4080),l="desktop",i="mobile",o="ssr";function s(){return r.Z.canUseDOM?window.innerWidth>996?l:i:o}t.default=function(){var e=(0,n.useState)((function(){return s()})),t=e[0],a=e[1];return(0,n.useEffect)((function(){function e(){a(s())}return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e),clearTimeout(undefined)}}),[]),t}}}]);