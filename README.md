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
- [Example](#example)
- [API](#api)
  * [ESM](#esm)
  * [Common JS](#common-js)
  * [`humanBytes(num, opts)`](#humanbytesnum-opts)
  * [Output Formats](#output-formats)
  * [More Examples](#more-examples)
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
import { humanBytes } from '@substrate-system/human-bytes'

const result = humanBytes(1337)
// => '1.34 kB'
```

#### Parameters

##### `num`

The number to format. Can be either a `number` or `bigint`.

* Must be a finite number (throws `TypeError` for `NaN`, `Infinity`,
  or non-numeric values)
* Supports negative values
* Supports decimal values for `number` type

##### `options` (optional)

```ts
export interface Options {
    /**
     * Include plus sign for positive numbers. If the difference is exactly
     * zero a space character will be prepended instead for better alignment.
     * @default false
     */
    signed?:boolean

    /**
     * Format the number as bits instead of bytes. This can be useful when,
     * for example, referring to bit rate.
     * @default false
     */
    bits?:boolean

    /**
     * Format the number using the Binary Prefix instead of the SI Prefix.
     * This can be useful for presenting memory amounts.
     * However, this should not be used for presenting file sizes.
     * @default false
     */
    binary?:boolean

    /**
     * The minimum number of fraction digits to display.
     * If neither `minimumFractionDigits` or `maximumFractionDigits` are set,
     * the default behavior is to round to 3 significant digits.
     */
    minimumFractionDigits?:number

    /**
     * The maximum number of fraction digits to display.
     * If neither `minimumFractionDigits` or `maximumFractionDigits` are set,
     * the default behavior is to round to 3 significant digits.
     */
    maximumFractionDigits?:number

    /**
     * Put a space between the number and unit.
     * @default true
     */
    space?:boolean

    /**
     * Use a non-breaking space between the number and unit.
     * @default false
     */
    nonBreakingSpace?:boolean

    /**
     * The locale to use for number formatting.
     * - If `true`, the system default locale is used.
     * - If a string, the value is expected to be a locale-key
     *   (for example: `de`).
     * - If an array of strings, the first supported locale will be used.
     * @default false
     */
    locale?:string|string[]|boolean

    /**
     * Fixed width for the result string. The string will be padded with spaces
     * on the left if needed.
     */
    fixedWidth?:number
}
```

### Output Formats

Return a human-readable string representation of the byte value.
The output format depends on the options provided:

#### Default (SI Prefix, Bytes)

Uses base 1000 with standard byte units:
* `B` (Bytes)
* `kB` (Kilobytes)
* `MB` (Megabytes)
* `GB` (Gigabytes)
* `TB` (Terabytes)
* `PB` (Petabytes)
* `EB` (Exabytes)
* `ZB` (Zettabytes)
* `YB` (Yottabytes)

```js
humanBytes(0)         // => '0 B'
humanBytes(999)       // => '999 B'
humanBytes(1000)      // => '1 kB'
humanBytes(1000000)   // => '1 MB'
humanBytes(1e16)      // => '10 PB'
```

#### Binary Prefix (base 1024)

Uses base 1024 with binary units:

* `B` (Bytes)
* `KiB` (Kibibytes)
* `MiB` (Mebibytes)
* `GiB` (Gibibytes)
* `TiB` (Tebibytes)
* `PiB` (Pebibytes)
* `EiB` (Exbibytes)
* `ZiB` (Zebibytes)
* `YiB` (Yobibytes)

```js
humanBytes(1024, { binary: true })      // => '1 KiB'
humanBytes(1048576, { binary: true })   // => '1 MiB'
humanBytes(1e16, { binary: true })      // => '8.88 PiB'
```

#### Bits

Uses base 1000 with bit units:

* `b` (bits)
* `kbit` (kilobits)
* `Mbit` (megabits)
* `Gbit` (gigabits)
* `Tbit` (terabits)
* `Pbit` (petabits)
* `Ebit` (exabits)
* `Zbit` (zettabits)
* `Ybit` (yottabits)

```js
humanBytes(1000, { bits: true })   // => '1 kbit'
humanBytes(1e16, { bits: true })   // => '10 Pbit'
```

#### Binary Bits

Uses base 1024 with binary bit units:

* `b` (bits)
* `kibit` (kibibits)
* `Mibit` (mebibits)
* `Gibit` (gibibits)
* `Tibit` (tebibits)
* `Pibit` (pebibits)
* `Eibit` (exbibits)
* `Zibit` (zebibits)
* `Yibit` (yobibits)

```js
humanBytes(1024, { bits: true, binary: true })  // => '1 kibit'
humanBytes(1e6, { bits: true, binary: true })   // => '977 kibit'
```

### More Examples

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

## See Also

The example for this module uses a pretty checkbox,
[created by following this guide](https://moderncss.dev/pure-css-custom-checkbox-style/).
