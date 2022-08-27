var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var esm_exports = {};
__export(esm_exports, {
  default: () => isOnline
});
module.exports = __toCommonJS(esm_exports);
var import_node_os = __toESM(require("node:os"));
var import_got = __toESM(require("@esm2cjs/got"));
var import_public_ip = __toESM(require("@esm2cjs/public-ip"));
var import_p_any = __toESM(require("@esm2cjs/p-any"));
var import_p_timeout = __toESM(require("@esm2cjs/p-timeout"));
const appleCheck = (options) => {
  const gotPromise = (0, import_got.default)("https://captive.apple.com/hotspot-detect.html", {
    timeout: {
      request: options.timeout
    },
    dnsLookupIpVersion: options.ipVersion,
    headers: {
      "user-agent": "CaptiveNetworkSupport/1.0 wispr"
    }
  });
  const promise = (async () => {
    try {
      const { body } = await gotPromise;
      if (!body || !body.includes("Success")) {
        throw new Error("Apple check failed");
      }
    } catch (error) {
      if (!(error instanceof import_got.CancelError)) {
        throw error;
      }
    }
  })();
  promise.cancel = gotPromise.cancel;
  return promise;
};
function isOnline(options) {
  options = {
    timeout: 5e3,
    ipVersion: 4,
    ...options
  };
  if (Object.values(import_node_os.default.networkInterfaces()).flat().every(({ internal }) => internal)) {
    return false;
  }
  if (![4, 6].includes(options.ipVersion)) {
    throw new TypeError("`ipVersion` must be 4 or 6");
  }
  const publicIpFunctionName = options.ipVersion === 4 ? "v4" : "v6";
  const queries = [];
  const promise = (0, import_p_any.default)([
    (async () => {
      const query = import_public_ip.default[publicIpFunctionName](options);
      queries.push(query);
      await query;
      return true;
    })(),
    (async () => {
      const query = import_public_ip.default[publicIpFunctionName]({ ...options, onlyHttps: true });
      queries.push(query);
      await query;
      return true;
    })(),
    (async () => {
      const query = appleCheck(options);
      queries.push(query);
      await query;
      return true;
    })()
  ]);
  return (0, import_p_timeout.default)(promise, options.timeout).catch(() => {
    for (const query of queries) {
      query.cancel();
    }
    return false;
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=index.js.map
