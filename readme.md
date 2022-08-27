# @esm2cjs/is-online

This is a fork of https://github.com/sindresorhus/is-online, but automatically patched to support ESM **and** CommonJS, unlike the original repository.
This fork does NOT include browser support, only Node.js.

## Install

You can use an npm alias to install this package under the original name:

```
npm i is-online@npm:@esm2cjs/is-online
```

```jsonc
// package.json
"dependencies": {
    "is-online": "npm:@esm2cjs/is-online"
}
```

but `npm` might dedupe this incorrectly when other packages depend on the replaced package. If you can, prefer using the scoped package directly:

```
npm i @esm2cjs/is-online
```

```jsonc
// package.json
"dependencies": {
    "@esm2cjs/is-online": "^ver.si.on"
}
```

## Usage

```js
// Using ESM import syntax
import isOnline from "@esm2cjs/is-online";

// Using CommonJS require()
const isOnline = require("@esm2cjs/is-online").default;
```

> **Note:**
> Because the original module uses `export default`, you need to append `.default` to the `require()` call.

For more details, please see the original [repository](https://github.com/sindresorhus/is-online).

## Sponsoring

To support my efforts in maintaining the ESM/CommonJS hybrid, please sponsor [here](https://github.com/sponsors/AlCalzone).

To support the original author of the module, please sponsor [here](https://github.com/sindresorhus/is-online).
