# package name here
[![tests](https://img.shields.io/github/actions/workflow/status/substrate-system/package/nodejs.yml?style=flat-square)](https://github.com/substrate-system/package/actions/workflows/nodejs.yml)
[![types](https://img.shields.io/npm/types/@substrate-system/icons?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![install size](https://flat.badgen.net/packagephobia/install/@nichoth/session-cookie)](https://packagephobia.com/result?p=@nichoth/session-cookie)
[![gzip size](https://img.shields.io/bundlephobia/minzip/@substrate-system/package?style=flat-square)](https://bundlephobia.com/@substrate-system/name/package/route-event)
[![dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg?style=flat-square)](package.json)
[![license](https://img.shields.io/badge/license-Big_Time-blue?style=flat-square)](LICENSE)

File sizes for humans.

[See a live demo](https://namespace.github.io/package-name/)

<details><summary><h2>Contents</h2></summary>
<!-- toc -->
</details>

## Install

```sh
npm i -S @substrate-system/human-size
```

## API

This exposes ESM and common JS via [package.json `exports` field](https://nodejs.org/api/packages.html#exports).

### ESM
```js
import '@substrate-system/human-size'
```

### Common JS
```js
require('@substrate-system/human-size')
```

## Use

### JS
```js
import '@substrate-system/human-size'
```

### Pre-built JS

This package exposes minified JS files too. Copy them to a location that is
accessible to your web server, then link to them in HTML.

#### copy

```sh
cp ./node_modules/@substrate-system/human-size/dist/index.min.js ./public/human-size.min.js
```

#### HTML

```html
<script type="module" src="./human-size.min.js"></script>
```
