# human bytes
[![tests](https://img.shields.io/github/actions/workflow/status/substrate-system/human-bytes/nodejs.yml?style=flat-square)](https://github.com/substrate-system/human-bytes/actions/workflows/nodejs.yml)
[![types](https://img.shields.io/npm/types/@substrate-system/human-bytes?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![install size](https://flat.badgen.net/packagephobia/install/@substrate-system/human-bytes)](https://packagephobia.com/result?p=@substrate-system/human-bytes)
[![gzip size](https://img.shields.io/bundlephobia/minzip/@substrate-system/human-bytes?style=flat-square)](https://bundlephobia.com/@substrate-system/name/package/human-bytes)
[![dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg?style=flat-square)](package.json)
[![license](https://img.shields.io/badge/license-Big_Time-blue?style=flat-square)](LICENSE)

File sizes for humans.

[See a live demo](https://namespace.github.io/package-name/)

<details><summary><h2>Contents</h2></summary>

<!-- toc -->

- [Install](#install)
- [API](#api)
  * [ESM](#esm)
  * [Common JS](#common-js)
- [Use](#use)
  * [JS](#js)
  * [Pre-built JS](#pre-built-js)

<!-- tocstop -->

</details>

## Install

```sh
npm i -S @substrate-system/human-bytes
```

-------

## Example

```js
import { humanBytes } from '@substrate-system/human-bytes'

const readble = humanBytes(1337)
// => 1.34 kB
```

-------

## API

This exposes ESM and common JS via [package.json `exports` field](https://nodejs.org/api/packages.html#exports).

### ESM
```js
import '@substrate-system/human-bytes'
```

### Common JS
```js
require('@substrate-system/human-bytes')
```

-------

### `humanBytes(num, opts)`

```ts
humanBytes(n:number|bigint, options?:Options):string
```

#### Example

```js
```

#### Parameters

##### `num`

The number to format. Can be either a `number` or `bigint`.

* Must be a finite number (throws `TypeError` for `NaN`, `Infinity`,
  or non-numeric values)
* Supports negative values
* Supports decimal values for `number` type

##### `options` (optional)

###### `signed:boolean` (default: `false`)

Include plus sign for positive numbers. If the value is exactly zero,
a space character will be prepended instead for better alignment.

```js
humanBytes(42, { signed: true })
// => '+42 B'

humanBytes(-13, { signed: true })
// => '-13 B'

humanBytes(0, { signed: true })
// => ' 0 B'
```

##### `bits` (boolean, default: `false`)
Format the number as bits instead of bytes. Useful for representing bit rates.

```js
humanBytes(1337)
// => '1.34 kB'

humanBytes(1337, { bits: true })
// => '1.34 kbit'
```

##### `binary` (boolean, default: `false`)
Format the number using Binary Prefix (base 1024) instead of SI Prefix (base 1000). Useful for memory amounts, but should not be used for file sizes.

```js
humanBytes(1025)
// => '1.02 kB'

humanBytes(1025, { binary: true })
// => '1 KiB'
```

##### `minimumFractionDigits` (number, optional)
The minimum number of fraction digits to display. If neither `minimumFractionDigits` nor `maximumFractionDigits` are set, the default behavior is to round to 3 significant digits.

```js
humanBytes(1900, { minimumFractionDigits: 3 })
// => '1.900 kB'
```

##### `maximumFractionDigits` (number, optional)
The maximum number of fraction digits to display. If neither `minimumFractionDigits` nor `maximumFractionDigits` are set, the default behavior is to round to 3 significant digits.

```js
humanBytes(1900, { maximumFractionDigits: 1 })
// => '1.9 kB'

humanBytes(1911, { maximumFractionDigits: 1 })
// => '1.9 kB'
```

##### `space` (boolean, default: `true`)
Put a space between the number and unit.

```js
humanBytes(999)
// => '999 B'

humanBytes(999, { space: false })
// => '999B'
```

##### `nonBreakingSpace` (boolean, default: `false`)
Use a non-breaking space (`\u00A0`) between the number and unit instead of a regular space.

```js
humanBytes(1337, { nonBreakingSpace: true })
// => '1.34 kB' (with non-breaking space)
```

##### `locale` (string | string[] | boolean, default: `false`)
The locale to use for number formatting.
- If `true`: uses the system default locale
- If a string: the value is expected to be a locale key (e.g., `'de'`, `'en'`)
- If an array of strings: the first supported locale will be used

```js
humanBytes(1337, { locale: 'de' })
// => '1,34 kB'

humanBytes(1e30, { locale: 'de' })
// => '1.000.000 YB'

humanBytes(1337, { locale: ['unknown', 'de', 'en'] })
// => '1,34 kB' (uses 'de' as first supported locale)

humanBytes(1337, { locale: true })
// => Uses system locale
```

##### `fixedWidth` (number, optional)
Fixed width for the result string. The string will be padded with spaces on the left if needed.
- Must be a non-negative integer
- If `0` or `undefined`, no padding is applied
- If the result is wider than `fixedWidth`, no padding is applied

```js
humanBytes(1, { fixedWidth: 7 })
// => '    1 B'

humanBytes(1000, { fixedWidth: 7 })
// => '   1 kB'

humanBytes(1337, { fixedWidth: 10 })
// => '   1.34 kB'
```

### Output Formats

The function returns a human-readable string representation of the byte value. The output format depends on the options provided:

#### Default (SI Prefix, Bytes)
Uses base 1000 with standard byte units:
- `B` (Bytes)
- `kB` (Kilobytes)
- `MB` (Megabytes)
- `GB` (Gigabytes)
- `TB` (Terabytes)
- `PB` (Petabytes)
- `EB` (Exabytes)
- `ZB` (Zettabytes)
- `YB` (Yottabytes)

```js
humanBytes(0)         // => '0 B'
humanBytes(999)       // => '999 B'
humanBytes(1000)      // => '1 kB'
humanBytes(1000000)   // => '1 MB'
humanBytes(1e16)      // => '10 PB'
```

#### Binary Prefix (base 1024)
Uses base 1024 with binary units:
- `B` (Bytes)
- `KiB` (Kibibytes)
- `MiB` (Mebibytes)
- `GiB` (Gibibytes)
- `TiB` (Tebibytes)
- `PiB` (Pebibytes)
- `EiB` (Exbibytes)
- `ZiB` (Zebibytes)
- `YiB` (Yobibytes)

```js
humanBytes(1024, { binary: true })      // => '1 KiB'
humanBytes(1048576, { binary: true })   // => '1 MiB'
humanBytes(1e16, { binary: true })      // => '8.88 PiB'
```

#### Bits
Uses base 1000 with bit units:
- `b` (bits)
- `kbit` (kilobits)
- `Mbit` (megabits)
- `Gbit` (gigabits)
- `Tbit` (terabits)
- `Pbit` (petabits)
- `Ebit` (exabits)
- `Zbit` (zettabits)
- `Ybit` (yottabits)

```js
humanBytes(1000, { bits: true })   // => '1 kbit'
humanBytes(1e16, { bits: true })   // => '10 Pbit'
```

#### Binary Bits
Uses base 1024 with binary bit units:
- `b` (bits)
- `kibit` (kibibits)
- `Mibit` (mebibits)
- `Gibit` (gibibits)
- `Tibit` (tebibits)
- `Pibit` (pebibits)
- `Eibit` (exbibits)
- `Zibit` (zebibits)
- `Yibit` (yobibits)

```js
humanBytes(1024, { bits: true, binary: true })  // => '1 kibit'
humanBytes(1e6, { bits: true, binary: true })   // => '977 kibit'
```

### Additional Examples

#### Combining Options

```js
// Signed binary format with custom precision
humanBytes(42, { signed: true, binary: true, maximumFractionDigits: 2 })
// => '+42 B'

// Fixed width with locale formatting
humanBytes(1337, { fixedWidth: 10, locale: 'de' })
// => '   1,34 kB'

// Bits with no space
humanBytes(1500, { bits: true, space: false })
// => '1.5kbit'

// Negative numbers
humanBytes(-1000)
// => '-1 kB'

humanBytes(-1000, { signed: true })
// => '-1 kB'
```

#### BigInt Support

```js
humanBytes(1337n)
// => '1.34 kB'

humanBytes(10n ** 16n)
// => '10 PB'

humanBytes(10n ** 30n, { binary: true })
// => '827181 YiB'
```

## Use

### JS
```js
import '@substrate-system/human-bytes'
```

### Pre-built JS

This package exposes minified JS files too. Copy them to a location that is
accessible to your web server, then link to them in HTML.

#### copy

```sh
cp ./node_modules/@substrate-system/human-bytes/dist/index.min.js ./public/human-bytes.min.js
```

#### HTML

```html
<script type="module" src="./human-bytes.min.js"></script>
```
