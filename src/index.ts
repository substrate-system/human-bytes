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

const BYTE_UNITS = [
    'B',
    'kB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB',
] as const

const BIBYTE_UNITS = [
    'B',
    'KiB',
    'MiB',
    'GiB',
    'TiB',
    'PiB',
    'EiB',
    'ZiB',
    'YiB',
] as const

const BIT_UNITS = [
    'b',
    'kbit',
    'Mbit',
    'Gbit',
    'Tbit',
    'Pbit',
    'Ebit',
    'Zbit',
    'Ybit',
] as const

const BIBIT_UNITS = [
    'b',
    'kibit',
    'Mibit',
    'Gibit',
    'Tibit',
    'Pibit',
    'Eibit',
    'Zibit',
    'Yibit',
] as const

/**
 * Formats the given number using `Number#toLocaleString`.
 *   - If locale is a string, the value is expected to be a locale-key
 *     (for example: `de`).
 *   - If locale is true, the system default locale is used for translation.
 *   - If no value for locale is specified, the number is returned unmodified.
 */
const toLocaleString = (
    number:number|bigint,
    locale?:string|string[]|boolean,
    options?:Intl.NumberFormatOptions
):string => {
    let result = number.toString()
    if (typeof number === 'bigint') {
        // bigint.toLocaleString doesn't accept options in TypeScript's
        // type definitions
        if (typeof locale === 'string' || Array.isArray(locale)) {
            result = number.toLocaleString(locale)
        } else if (locale === true) {
            result = number.toLocaleString()
        }
    } else {
        // number type supports full locale string options
        if (typeof locale === 'string' || Array.isArray(locale)) {
            result = number.toLocaleString(locale, options)
        } else if (locale === true || options !== undefined) {
            result = number.toLocaleString(undefined, options)
        }
    }

    return result
}

const log10 = (numberOrBigInt:number|bigint):number => {
    if (typeof numberOrBigInt === 'number') {
        return Math.log10(numberOrBigInt)
    }

    const string = numberOrBigInt.toString(10)

    return string.length + Math.log10(Number(`0.${string.slice(0, 15)}`))
}

const log = (numberOrBigInt:number|bigint):number => {
    if (typeof numberOrBigInt === 'number') {
        return Math.log(numberOrBigInt)
    }

    return log10(numberOrBigInt) * Math.log(10)
}

const divide = (numberOrBigInt:number|bigint, divisor:number):number => {
    if (typeof numberOrBigInt === 'number') {
        return numberOrBigInt / divisor
    }

    const integerPart = numberOrBigInt / BigInt(divisor)
    const remainder = numberOrBigInt % BigInt(divisor)
    return Number(integerPart) + (Number(remainder) / divisor)
}

const applyFixedWidth = (result:string, fixedWidth?:number):string => {
    if (fixedWidth === undefined) {
        return result
    }

    if (
        typeof fixedWidth !== 'number' ||
        !Number.isSafeInteger(fixedWidth) ||
        fixedWidth < 0
    ) {
        throw new TypeError('Expected fixedWidth to be a non-negative ' +
            `integer, got ${typeof fixedWidth}: ${fixedWidth}`)
    }

    if (fixedWidth === 0) {
        return result
    }

    return result.length < fixedWidth ? result.padStart(fixedWidth, ' ') : result
}

function buildLocaleOptions (
    options:Options
):Intl.NumberFormatOptions|undefined {
    const { minimumFractionDigits, maximumFractionDigits } = options

    if (
        minimumFractionDigits === undefined &&
        maximumFractionDigits === undefined
    ) {
        return undefined
    }

    return {
        ...(minimumFractionDigits !== undefined && { minimumFractionDigits }),
        ...(maximumFractionDigits !== undefined && { maximumFractionDigits }),
        roundingMode: 'trunc',
    } as Intl.NumberFormatOptions
}

export function humanBytes (
    number:number|bigint,
    options?:Options
):string {
    if (typeof number !== 'bigint' && !Number.isFinite(number)) {
        throw new TypeError(
            `Expected a finite number, got ${typeof number}: ${number}`
        )
    }

    const mergedOptions:Required<Pick<
        Options, 'bits'|'binary'|'space'|'nonBreakingSpace'
    >> & Options = {
        bits: false,
        binary: false,
        space: true,
        nonBreakingSpace: false,
        ...options,
    }

    const UNITS = mergedOptions.bits ?
        (mergedOptions.binary ? BIBIT_UNITS : BIT_UNITS) :
        (mergedOptions.binary ? BIBYTE_UNITS : BYTE_UNITS)

    const separator = mergedOptions.space ?
        (mergedOptions.nonBreakingSpace ? '\u00A0' : ' ') :
        ''

    // Handle signed zero case
    const isZero = typeof number === 'number' ? number === 0 : number === 0n
    if (mergedOptions.signed && isZero) {
        const result = ` 0${separator}${UNITS[0]}`
        return applyFixedWidth(result, mergedOptions.fixedWidth)
    }

    const isNegative = number < 0
    const prefix = isNegative ? '-' : (mergedOptions.signed ? '+' : '')

    if (isNegative) {
        number = -number
    }

    const localeOptions = buildLocaleOptions(mergedOptions)
    let result: string

    if (number < 1) {
        const numberString = toLocaleString(
            number,
            mergedOptions.locale,
            localeOptions
        )
        result = prefix + numberString + separator + UNITS[0]
    } else {
        const n = (mergedOptions.binary ?
            log(number) / Math.log(1024) :
            log10(number) / 3)
        const exponent = Math.min(Math.floor(n), UNITS.length - 1)
        let dividedNumber: number | string = divide(number, (mergedOptions.binary ? 1024 : 1000) ** exponent)

        if (!localeOptions) {
            const minPrecision = Math.max(
                3,
                Math.floor(dividedNumber).toString().length
            )
            dividedNumber = dividedNumber.toPrecision(minPrecision)
        }

        const numberString = toLocaleString(
            Number(dividedNumber),
            mergedOptions.locale,
            localeOptions
        )
        const unit = UNITS[exponent]
        result = prefix + numberString + separator + unit
    }

    return applyFixedWidth(result, mergedOptions.fixedWidth)
}

export default humanBytes
