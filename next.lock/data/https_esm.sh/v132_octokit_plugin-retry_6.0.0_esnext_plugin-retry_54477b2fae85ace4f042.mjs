/* esm.sh - esbuild bundle(@octokit/plugin-retry@6.0.0) esnext production */
import y from"/v132/bottleneck@2.19.5/esnext/light.js";import{RequestError as c}from"/v132/@octokit/request-error@5.0.0/esnext/request-error.mjs";async function i(s,n,e,r){if(!e.request||!e.request.request)throw e;if(e.status>=400&&!s.doNotRetry.includes(e.status)){let t=r.request.retries!=null?r.request.retries:s.retries,u=Math.pow((r.request.retryCount||0)+1,2);throw n.retry.retryRequest(e,t,u)}throw e}async function l(s,n,e,r){let t=new y;return t.on("failed",function(u,a){let o=~~u.request.request.retries,q=~~u.request.request.retryAfter;if(r.request.retryCount=a.retryCount+1,o>a.retryCount)return q*s.retryAfterBaseValue}),t.schedule(f.bind(null,s,n,e),r)}async function f(s,n,e,r){let t=await e(e,r);if(t.data&&t.data.errors&&/Something went wrong while executing your query/.test(t.data.errors[0].message)){let u=new c(t.data.errors[0].message,500,{request:r,response:t});return i(s,n,u,r)}return t}var d="6.0.0";function w(s,n){let e=Object.assign({enabled:!0,retryAfterBaseValue:1e3,doNotRetry:[400,401,403,404,422,451],retries:3},n.retry);return e.enabled&&(s.hook.error("request",i.bind(null,e,s)),s.hook.wrap("request",l.bind(null,e,s))),{retry:{retryRequest:(r,t,u)=>(r.request.request=Object.assign({},r.request.request,{retries:t,retryAfter:u}),r)}}}w.VERSION=d;export{d as VERSION,w as retry};
//# sourceMappingURL=plugin-retry.mjs.map