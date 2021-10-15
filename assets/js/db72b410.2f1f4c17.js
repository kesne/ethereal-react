"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6651],{7522:function(e,t,r){r.d(t,{Zo:function(){return d},kt:function(){return g}});var n=r(9901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},d=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),p=l(r),g=a,m=p["".concat(c,".").concat(g)]||p[g]||u[g]||o;return r?n.createElement(m,s(s({ref:t},d),{},{components:r})):n.createElement(m,s({ref:t},d))}));function g(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,s=new Array(o);s[0]=p;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,s[1]=i;for(var l=2;l<o;l++)s[l]=r[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},3197:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return i},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return d},default:function(){return p}});var n=r(3920),a=r(264),o=(r(9901),r(7522)),s=["components"],i={sidebar_position:4},c="Loading and Error States",l={unversionedId:"getting-started/loading-and-error-states",id:"getting-started/loading-and-error-states",isDocsHomePage:!1,title:"Loading and Error States",description:"Loading states with ethereal-react are managed with React Suspense, and error states are managed with Error Boundaries.",source:"@site/docs/getting-started/loading-and-error-states.md",sourceDirName:"getting-started",slug:"/getting-started/loading-and-error-states",permalink:"/ethereal-react/getting-started/loading-and-error-states",editUrl:"https://github.com/kesne/ethereal-react/edit/main/packages/website/docs/getting-started/loading-and-error-states.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Contracts",permalink:"/ethereal-react/getting-started/contracts"},next:{title:"Setting up WalletConnect",permalink:"/ethereal-react/getting-started/wallet-connect"}},d=[{value:"Loading States",id:"loading-states",children:[]},{value:"Error States",id:"error-states",children:[]}],u={toc:d};function p(e){var t=e.components,r=(0,a.Z)(e,s);return(0,o.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"loading-and-error-states"},"Loading and Error States"),(0,o.kt)("p",null,"Loading states with ",(0,o.kt)("inlineCode",{parentName:"p"},"ethereal-react")," are managed with ",(0,o.kt)("a",{parentName:"p",href:"https://reactjs.org/docs/react-api.html#reactsuspense"},"React Suspense"),", and error states are managed with ",(0,o.kt)("a",{parentName:"p",href:"https://reactjs.org/docs/error-boundaries.html"},"Error Boundaries"),"."),(0,o.kt)("h2",{id:"loading-states"},"Loading States"),(0,o.kt)("p",null,"When components use ",(0,o.kt)("inlineCode",{parentName:"p"},"ethereal-react")," hooks that load async data, the component will suspend while the data is loaded. The hooks will directly return the data."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},'import { Suspense } from "react";\nimport { useBalance } from "ethereal-react";\n\nfunction User() {\n  // If the balance has not yet been fetched, this will cause the component to suspend,\n  // and the `fallback` in the parent `Suspense` component will be rendered.\n  const balance = useBalance();\n\n  return <div>User has {balance.toString()} eth</div>;\n}\n\nfunction UserLoading() {\n  return <div>Loading user balance....</div>;\n}\n\nfunction App() {\n  return (\n    <Suspense fallback={<UserLoading />}>\n      <User />\n    </Suspense>\n  );\n}\n')),(0,o.kt)("p",null,"For more details about how suspense and data fetching interop, you can read the ",(0,o.kt)("a",{parentName:"p",href:"https://reactjs.org/docs/concurrent-mode-suspense.html"},"Suspense for Data Fetching")," documentation."),(0,o.kt)("h2",{id:"error-states"},"Error States"),(0,o.kt)("p",null,"In the event that loading data results in an error, it will trigger an error that can be caught with an Error Boundary. We recommend using ",(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/react-error-boundary"},(0,o.kt)("inlineCode",{parentName:"a"},"react-error-boundary"))," to make it easy to write error boundaries."),(0,o.kt)("p",null,"In general, the Error Boundary should exist above the ",(0,o.kt)("inlineCode",{parentName:"p"},"Suspense")," component, as this will correctly catch errors that occurred while loading data."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},'import { Suspense } from "react";\nimport { ErrorBoundary, FallbackProps } from "react-error-boundary";\n\nfunction ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {\n  return (\n    <div role="alert">\n      <p>Something went wrong:</p>\n      <pre>{error.message}</pre>\n      <button onClick={resetErrorBoundary}>Try again</button>\n    </div>\n  );\n}\n\nfunction App() {\n  return (\n    <ErrorBoundary>\n      <Suspense fallback={<UserLoading />}>\n        <User />\n      </Suspense>\n    </ErrorBoundary>\n  );\n}\n')))}p.isMDXComponent=!0}}]);