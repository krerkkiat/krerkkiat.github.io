/* esm.sh - esbuild bundle(octokit@3.1.0) esnext production */
import{Octokit as a}from"/v132/@octokit/core@5.0.0/esnext/core.mjs";import{paginateRest as i}from"/v132/@octokit/plugin-paginate-rest@8.0.0/esnext/plugin-paginate-rest.mjs";import{paginateGraphql as u}from"/v132/@octokit/plugin-paginate-graphql@4.0.0/esnext/plugin-paginate-graphql.mjs";import{restEndpointMethods as f}from"/v132/@octokit/plugin-rest-endpoint-methods@9.0.0/esnext/plugin-rest-endpoint-methods.mjs";import{retry as m}from"/v132/@octokit/plugin-retry@6.0.0/esnext/plugin-retry.mjs";import{throttling as p}from"/v132/@octokit/plugin-throttling@7.0.0/esnext/plugin-throttling.mjs";import{RequestError as $}from"/v132/@octokit/request-error@5.0.0/esnext/request-error.mjs";import{App as l}from"/v132/@octokit/app@14.0.0/esnext/app.mjs";import{OAuthApp as g}from"/v132/@octokit/oauth-app@6.0.0/esnext/oauth-app.mjs";import{createNodeMiddleware as E}from"/v132/@octokit/app@14.0.0/esnext/app.mjs";var n="3.1.0",o=a.plugin(f,i,u,m,p).defaults({userAgent:`octokit.js/${n}`,throttle:{onRateLimit:s,onSecondaryRateLimit:d}});function s(e,t,r){if(r.log.warn(`Request quota exhausted for request ${t.method} ${t.url}`),t.request.retryCount===0)return r.log.info(`Retrying after ${e} seconds!`),!0}function d(e,t,r){if(r.log.warn(`SecondaryRateLimit detected for request ${t.method} ${t.url}`),t.request.retryCount===0)return r.log.info(`Retrying after ${e} seconds!`),!0}var L=l.defaults({Octokit:o}),S=g.defaults({Octokit:o});export{L as App,S as OAuthApp,o as Octokit,$ as RequestError,E as createNodeMiddleware};
//# sourceMappingURL=octokit.mjs.map