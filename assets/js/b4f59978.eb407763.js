"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3491],{7522:function(t,e,n){n.d(e,{Zo:function(){return u},kt:function(){return m}});var a=n(9901);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function c(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},o=Object.keys(t);for(a=0;a<o.length;a++)n=o[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(a=0;a<o.length;a++)n=o[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var s=a.createContext({}),l=function(t){var e=a.useContext(s),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},u=function(t){var e=l(t.components);return a.createElement(s.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},p=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,o=t.originalType,s=t.parentName,u=c(t,["components","mdxType","originalType","parentName"]),p=l(n),m=r,h=p["".concat(s,".").concat(m)]||p[m]||d[m]||o;return n?a.createElement(h,i(i({ref:e},u),{},{components:n})):a.createElement(h,i({ref:e},u))}));function m(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var o=n.length,i=new Array(o);i[0]=p;var c={};for(var s in e)hasOwnProperty.call(e,s)&&(c[s]=e[s]);c.originalType=t,c.mdxType="string"==typeof t?t:r,i[1]=c;for(var l=2;l<o;l++)i[l]=n[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},6683:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return c},contentTitle:function(){return s},metadata:function(){return l},toc:function(){return u},default:function(){return p}});var a=n(3920),r=n(264),o=(n(9901),n(7522)),i=["components"],c={sidebar_position:3},s="Contracts",l={unversionedId:"getting-started/contracts",id:"getting-started/contracts",isDocsHomePage:!1,title:"Contracts",description:"Smart Contracts are what power most dApps, and it's common that you'll need to read data from them, in addition to write data to them using transactions.",source:"@site/docs/getting-started/contracts.md",sourceDirName:"getting-started",slug:"/getting-started/contracts",permalink:"/ethereal-react/getting-started/contracts",editUrl:"https://github.com/kesne/ethereal-react/edit/main/packages/website/docs/getting-started/contracts.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Displaying User Information",permalink:"/ethereal-react/getting-started/displaying-user"},next:{title:"Loading and Error States",permalink:"/ethereal-react/getting-started/loading-and-error-states"}},u=[{value:"Defining a contract",id:"defining-a-contract",children:[]},{value:"Reading data from contracts",id:"reading-data-from-contracts",children:[]},{value:"Writing data to contracts (transactions)",id:"writing-data-to-contracts-transactions",children:[{value:"Waiting for transactions",id:"waiting-for-transactions",children:[]}]}],d={toc:u};function p(t){var e=t.components,n=(0,r.Z)(t,i);return(0,o.kt)("wrapper",(0,a.Z)({},d,n,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"contracts"},"Contracts"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://ethereum.org/en/developers/docs/smart-contracts/"},"Smart Contracts")," are what power most dApps, and it's common that you'll need to read data from them, in addition to write data to them using transactions."),(0,o.kt)("p",null,"For more details, we recommend reading the ",(0,o.kt)("a",{parentName:"p",href:"https://docs.ethers.io/v5/getting-started/#getting-started--contracts"},"ethers documentation on contracts"),"."),(0,o.kt)("h2",{id:"defining-a-contract"},"Defining a contract"),(0,o.kt)("p",null,"Defining a contract requires two pieces of information:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The address that the contract is deployed to. Note that this address may change based on the ",(0,o.kt)("a",{parentName:"li",href:"https://ethereum.org/en/developers/docs/networks/"},"network")," that you are connected to."),(0,o.kt)("li",{parentName:"ul"},"The ABI of the contract.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"This can be defined as an output when running the ",(0,o.kt)("a",{parentName:"li",href:"https://docs.soliditylang.org/en/v0.5.1/index.html"},"Solidity compiler"),"."),(0,o.kt)("li",{parentName:"ul"},"If you are using Hardhat, you can use the ",(0,o.kt)("a",{parentName:"li",href:"https://hardhat.org/plugins/hardhat-abi-exporter.html"},"ABI exporter plugin")," to generate this.")))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},'import { useContract } from "ethereal-react";\n\nconst CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";\nconst CONTRACT_ABI = [\n  "function setGreeting(string memory greeting)",\n  "function greeting() view returns (string memory)",\n];\n\nconst contract = useContract(CONTRACT_ADDRESS, CONTRACT_ABI);\n')),(0,o.kt)("p",null,"We include ",(0,o.kt)("a",{parentName:"p",href:"/ethereal-react/advanced/ABIs"},"common ABIs")," for well-known contract types (ERC-20 and ERC-721 tokens)."),(0,o.kt)("p",null,"For full TypeScript support, you can also use a generated TypeChain factory in place of a contract ABI. For more details, ",(0,o.kt)("a",{parentName:"p",href:"/ethereal-react/advanced/typechain"},"you can read the TypeChain docs"),"."),(0,o.kt)("h2",{id:"reading-data-from-contracts"},"Reading data from contracts"),(0,o.kt)("p",null,"You can read data easily from any contract that has a ",(0,o.kt)("inlineCode",{parentName:"p"},"view")," function on it. To do so, use the ",(0,o.kt)("inlineCode",{parentName:"p"},"useReadContract")," hook."),(0,o.kt)("p",null,"The hook takes the following arguments:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The contract, loaded via the ",(0,o.kt)("inlineCode",{parentName:"li"},"useContract")," hook."),(0,o.kt)("li",{parentName:"ul"},"The function name on the contract to invoke. Should be a ",(0,o.kt)("inlineCode",{parentName:"li"},"view")," function.")),(0,o.kt)("p",null,"Any additional arguments will be passed to the contract function."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},'import { useContract, useReadContract } from "ethereal-react";\n\nfunction Greeting() {\n  const contract = useContract(CONTRACT_ADDRESS, CONTRACT_ABI);\n  const greeting = useReadContract(contract, "greeting");\n\n  return <div>Current greeting: {greeting}</div>;\n}\n')),(0,o.kt)("h2",{id:"writing-data-to-contracts-transactions"},"Writing data to contracts (transactions)"),(0,o.kt)("p",null,"You can write data to any contract by using the ",(0,o.kt)("inlineCode",{parentName:"p"},"useWriteContract")," hook. The hook takes the following arguments:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The contract, loaded via the ",(0,o.kt)("inlineCode",{parentName:"li"},"useContract")," hook."),(0,o.kt)("li",{parentName:"ul"},"The function name on the contract to invoke.")),(0,o.kt)("p",null,"The hook returns a tuple containg the following elements:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"A mutation function, which can be called to call the contract. This will prompt the user to initiate a transaction on Ethereum. Any arguments passed to this function will be passed to the contract function."),(0,o.kt)("li",{parentName:"ul"},"An object containing the current status of the mutation. This contains a ",(0,o.kt)("inlineCode",{parentName:"li"},"loading")," boolean, an ",(0,o.kt)("inlineCode",{parentName:"li"},"error")," property, and a ",(0,o.kt)("inlineCode",{parentName:"li"},"data")," payload for when the transaction is completed.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},'import { useContract, useWriteContract } from "ethereal-react";\n\nfunction UpdateGreeting() {\n  const contract = useContract(CONTRACT_ADDRESS, CONTRACT_ABI);\n  const [setGreeting, { loading }] = useWriteContract(contract, "setGreeting");\n\n  return (\n    <button onClick={() => setGreeting("Hello, docs!")}>Update Greeting</button>\n  );\n}\n')),(0,o.kt)("h3",{id:"waiting-for-transactions"},"Waiting for transactions"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"useWriteContract")," hook initiates a transaction, but it does not wait for it to be confirmed to the blockchain. If you wish to wait for the transaction to be confirmed, you can use the ",(0,o.kt)("inlineCode",{parentName:"p"},"useWaitForTransaction")," hook. This will cause the component to suspend while the transaction is confirmed. You can also specify the number of confirmations that you wish to wait for."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},'import { Suspense } from "react";\nimport {\n  useContract,\n  useReadContract,\n  useWriteContract,\n  useWaitForTransaction,\n} from "ethereal-react";\n\nfunction Greeting({ transaction }) {\n  // Wait for the transaction to be confirmed:\n  useWaitForTransaction(transaction);\n  const contract = useContract(CONTRACT_ADDRESS, CONTRACT_ABI);\n  const greeting = useReadContract(contract, "greeting");\n  return <div>Current greeting: {greeting}</div>;\n}\n\nfunction UpdateGreeting() {\n  const contract = useContract(CONTRACT_ADDRESS, CONTRACT_ABI);\n  const [setGreeting, { loading, data }] = useWriteContract(\n    contract,\n    "setGreeting"\n  );\n\n  // Once this transaction has started, render the updated greeting:\n  if (data) {\n    return (\n      <Suspense\n        fallback={<div>Waiting for transaction to be confirmed...</div>}\n      >\n        <Greeting transaction={data} />\n      </Suspense>\n    );\n  }\n\n  return (\n    <button onClick={() => setGreeting("Hello, docs!")}>Update Greeting</button>\n  );\n}\n')))}p.isMDXComponent=!0}}]);