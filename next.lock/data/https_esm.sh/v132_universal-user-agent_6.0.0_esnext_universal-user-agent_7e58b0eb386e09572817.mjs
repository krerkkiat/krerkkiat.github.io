/* esm.sh - esbuild bundle(universal-user-agent@6.0.0) esnext production */
import __Process$ from "/v132/node_process.js";
function e(){return typeof navigator=="object"&&"userAgent"in navigator?navigator.userAgent:typeof __Process$=="object"&&"version"in __Process$?`Node.js/${__Process$.version.substr(1)} (${__Process$.platform}; ${__Process$.arch})`:"<environment undetectable>"}export{e as getUserAgent};
//# sourceMappingURL=universal-user-agent.mjs.map