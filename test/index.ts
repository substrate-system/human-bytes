import { test } from '@substrate-system/tapzero'
import prettyBytes from '../src/index.js'

test('pretty bytes', async t => {
    const result = prettyBytes(1337)
    t.equal(result, '1.34 kB', 'should format bytes correctly')
})

test('throws on invalid input', t => {
    t.throws(() => {
        // @ts-expect-error - testing invalid input
        prettyBytes('')
    })

    t.throws(() => {
        // @ts-expect-error - testing invalid input
        prettyBytes('1')
    })

    t.throws(() => {
        prettyBytes(Number.NaN)
    })

    t.throws(() => {
        // @ts-expect-error - testing invalid input
        prettyBytes(true)
    })

    t.throws(() => {
        prettyBytes(Number.POSITIVE_INFINITY)
    })

    t.throws(() => {
        prettyBytes(Number.NEGATIVE_INFINITY)
    })

    t.throws(() => {
        // @ts-expect-error - testing invalid input
        prettyBytes(null)
    })

    // Invalid fixedWidth
    t.throws(() => {
        prettyBytes(1337, { fixedWidth: -1 })
    })

    t.throws(() => {
        prettyBytes(1337, { fixedWidth: 1.5 })
    })
})

test('converts bytes to human readable strings', t => {
    t.equal(prettyBytes(0), '0 B')
    t.equal(prettyBytes(0n), '0 B')
    t.equal(prettyBytes(0.4), '0.4 B')
    t.equal(prettyBytes(0.7), '0.7 B')
    t.equal(prettyBytes(10), '10 B')
    t.equal(prettyBytes(10n), '10 B')
    t.equal(prettyBytes(10.1), '10.1 B')
    t.equal(prettyBytes(999), '999 B')
    t.equal(prettyBytes(999n), '999 B')
    t.equal(prettyBytes(1001), '1 kB')
    t.equal(prettyBytes(1001n), '1 kB')
    t.equal(prettyBytes(1e16), '10 PB')
    t.equal(prettyBytes(10n ** 16n), '10 PB')
    t.equal(prettyBytes(1e30), '1000000 YB')
    t.equal(prettyBytes(10n ** 30n), '1000000 YB')
    t.equal(prettyBytes(827_181 * 1e26), '82718100 YB')
})

test('supports negative number', t => {
    t.equal(prettyBytes(-0.4), '-0.4 B')
    t.equal(prettyBytes(-0.7), '-0.7 B')
    t.equal(prettyBytes(-10.1), '-10.1 B')
    t.equal(prettyBytes(-999), '-999 B')
    t.equal(prettyBytes(-999n), '-999 B')
    t.equal(prettyBytes(-1001), '-1 kB')
    t.equal(prettyBytes(-1001n), '-1 kB')
})

test('locale option', t => {
    t.equal(prettyBytes(-0.4, { locale: 'de' }), '-0,4 B')
    t.equal(prettyBytes(0.4, { locale: 'de' }), '0,4 B')
    t.equal(prettyBytes(1001, { locale: 'de' }), '1 kB')
    t.equal(prettyBytes(1001n, { locale: 'de' }), '1 kB')
    t.equal(prettyBytes(10.1, { locale: 'de' }), '10,1 B')
    t.equal(prettyBytes(1e30, { locale: 'de' }), '1.000.000 YB')
    t.equal(prettyBytes(10n ** 30n, { locale: 'de' }), '1.000.000 YB')
    t.equal(prettyBytes(827_181 * 1e26, { locale: 'de' }), '82.718.100 YB')

    t.equal(prettyBytes(-0.4, { locale: 'en' }), '-0.4 B')
    t.equal(prettyBytes(0.4, { locale: 'en' }), '0.4 B')
    t.equal(prettyBytes(1001, { locale: 'en' }), '1 kB')
    t.equal(prettyBytes(1001n, { locale: 'en' }), '1 kB')
    t.equal(prettyBytes(10.1, { locale: 'en' }), '10.1 B')
    t.equal(prettyBytes(1e30, { locale: 'en' }), '1,000,000 YB')
    t.equal(prettyBytes(10n ** 30n, { locale: 'en' }), '1,000,000 YB')
    t.equal(prettyBytes(827_181 * 1e26, { locale: 'en' }), '82,718,100 YB')

    t.equal(
        prettyBytes(-0.4, { locale: ['unknown', 'de', 'en'] }),
        '-0,4 B'
    )
    t.equal(
        prettyBytes(0.4, { locale: ['unknown', 'de', 'en'] }),
        '0,4 B'
    )
    t.equal(
        prettyBytes(1001, { locale: ['unknown', 'de', 'en'] }),
        '1 kB'
    )
    t.equal(
        prettyBytes(1001n, { locale: ['unknown', 'de', 'en'] }),
        '1 kB'
    )
    t.equal(
        prettyBytes(10.1, { locale: ['unknown', 'de', 'en'] }),
        '10,1 B'
    )
    t.equal(
        prettyBytes(1e30, { locale: ['unknown', 'de', 'en'] }),
        '1.000.000 YB'
    )
    t.equal(
        prettyBytes(10n ** 30n, { locale: ['unknown', 'de', 'en'] }),
        '1.000.000 YB'
    )
    t.equal(
        prettyBytes(827_181 * 1e26, { locale: ['unknown', 'de', 'en'] }),
        '82.718.100 YB'
    )

    t.equal(prettyBytes(-0.4, { locale: true }), '-0.4 B')
    t.equal(prettyBytes(0.4, { locale: true }), '0.4 B')
    t.equal(prettyBytes(1001, { locale: true }), '1 kB')
    t.equal(prettyBytes(1001n, { locale: true }), '1 kB')
    t.equal(prettyBytes(10.1, { locale: true }), '10.1 B')
    t.equal(prettyBytes(1e30, { locale: true }), '1,000,000 YB')
    t.equal(prettyBytes(10n ** 30n, { locale: true }), '1,000,000 YB')
    t.equal(prettyBytes(827_181 * 1e26, { locale: true }), '82,718,100 YB')

    t.equal(prettyBytes(-0.4, { locale: false }), '-0.4 B')
    t.equal(prettyBytes(0.4, { locale: false }), '0.4 B')
    t.equal(prettyBytes(1001, { locale: false }), '1 kB')
    t.equal(prettyBytes(1001n, { locale: false }), '1 kB')
    t.equal(prettyBytes(10.1, { locale: false }), '10.1 B')
    t.equal(prettyBytes(1e30, { locale: false }), '1000000 YB')
    t.equal(prettyBytes(10n ** 30n, { locale: false }), '1000000 YB')
    t.equal(prettyBytes(827_181 * 1e26, { locale: false }), '82718100 YB')

    t.equal(prettyBytes(-0.4, { locale: undefined }), '-0.4 B')
    t.equal(prettyBytes(0.4, { locale: undefined }), '0.4 B')
    t.equal(prettyBytes(1001, { locale: undefined }), '1 kB')
    t.equal(prettyBytes(1001n, { locale: undefined }), '1 kB')
    t.equal(prettyBytes(10.1, { locale: undefined }), '10.1 B')
    t.equal(prettyBytes(1e30, { locale: undefined }), '1000000 YB')
    t.equal(prettyBytes(10n ** 30n, { locale: undefined }), '1000000 YB')
    t.equal(prettyBytes(827_181 * 1e26, { locale: undefined }), '82718100 YB')
})

test('signed option', t => {
    t.equal(prettyBytes(42, { signed: true }), '+42 B')
    t.equal(prettyBytes(42n, { signed: true }), '+42 B')
    t.equal(prettyBytes(-13, { signed: true }), '-13 B')
    t.equal(prettyBytes(-13n, { signed: true }), '-13 B')
    t.equal(prettyBytes(0, { signed: true }), ' 0 B')
    t.equal(prettyBytes(0n, { signed: true }), ' 0 B')
})

test('bits option', t => {
    t.equal(prettyBytes(0, { bits: true }), '0 b')
    t.equal(prettyBytes(0n, { bits: true }), '0 b')
    t.equal(prettyBytes(0.4, { bits: true }), '0.4 b')
    t.equal(prettyBytes(0.7, { bits: true }), '0.7 b')
    t.equal(prettyBytes(10, { bits: true }), '10 b')
    t.equal(prettyBytes(10n, { bits: true }), '10 b')
    t.equal(prettyBytes(10.1, { bits: true }), '10.1 b')
    t.equal(prettyBytes(999, { bits: true }), '999 b')
    t.equal(prettyBytes(999n, { bits: true }), '999 b')
    t.equal(prettyBytes(1001, { bits: true }), '1 kbit')
    t.equal(prettyBytes(1001n, { bits: true }), '1 kbit')
    t.equal(prettyBytes(1e16, { bits: true }), '10 Pbit')
    t.equal(prettyBytes(10n ** 16n, { bits: true }), '10 Pbit')
    t.equal(prettyBytes(1e30, { bits: true }), '1000000 Ybit')
    t.equal(prettyBytes(10n ** 30n, { bits: true }), '1000000 Ybit')
    t.equal(prettyBytes(827_181 * 1e26, { bits: true }), '82718100 Ybit')
})

test('binary option', t => {
    t.equal(prettyBytes(0, { binary: true }), '0 B')
    t.equal(prettyBytes(0n, { binary: true }), '0 B')
    t.equal(prettyBytes(4, { binary: true }), '4 B')
    t.equal(prettyBytes(4n, { binary: true }), '4 B')
    t.equal(prettyBytes(10, { binary: true }), '10 B')
    t.equal(prettyBytes(10n, { binary: true }), '10 B')
    t.equal(prettyBytes(10.1, { binary: true }), '10.1 B')
    t.equal(prettyBytes(999, { binary: true }), '999 B')
    t.equal(prettyBytes(999n, { binary: true }), '999 B')
    t.equal(prettyBytes(1025, { binary: true }), '1 KiB')
    t.equal(prettyBytes(1025n, { binary: true }), '1 KiB')
    t.equal(prettyBytes(1001, { binary: true }), '1001 B')
    t.equal(prettyBytes(1001n, { binary: true }), '1001 B')
    t.equal(prettyBytes(1e16, { binary: true }), '8.88 PiB')
    t.equal(prettyBytes(10n ** 16n, { binary: true }), '8.88 PiB')
    t.equal(prettyBytes(1e30, { binary: true }), '827181 YiB')
    t.equal(prettyBytes(10n ** 30n, { binary: true }), '827181 YiB')
})

test('bits and binary option', t => {
    t.equal(prettyBytes(0, { bits: true, binary: true }), '0 b')
    t.equal(prettyBytes(0n, { bits: true, binary: true }), '0 b')
    t.equal(prettyBytes(4, { bits: true, binary: true }), '4 b')
    t.equal(prettyBytes(4n, { bits: true, binary: true }), '4 b')
    t.equal(prettyBytes(10, { bits: true, binary: true }), '10 b')
    t.equal(prettyBytes(10n, { bits: true, binary: true }), '10 b')
    t.equal(prettyBytes(999, { bits: true, binary: true }), '999 b')
    t.equal(prettyBytes(999n, { bits: true, binary: true }), '999 b')
    t.equal(prettyBytes(1025, { bits: true, binary: true }), '1 kibit')
    t.equal(prettyBytes(1025n, { bits: true, binary: true }), '1 kibit')
    t.equal(prettyBytes(1e6, { bits: true, binary: true }), '977 kibit')
    t.equal(prettyBytes(10n ** 6n, { bits: true, binary: true }), '977 kibit')
    t.equal(prettyBytes(1e30, { bits: true, binary: true }), '827181 Yibit')
    t.equal(prettyBytes(10n ** 30n, { bits: true, binary: true }), '827181 Yibit')
})

test('fractional digits options', t => {
    t.equal(prettyBytes(1900, { maximumFractionDigits: 1 }), '1.9 kB')
    t.equal(prettyBytes(1900n, { maximumFractionDigits: 1 }), '1.9 kB')
    t.equal(prettyBytes(1900, { minimumFractionDigits: 3 }), '1.900 kB')
    t.equal(prettyBytes(1900n, { minimumFractionDigits: 3 }), '1.900 kB')
    t.equal(prettyBytes(1911, { maximumFractionDigits: 1 }), '1.9 kB')
    t.equal(prettyBytes(1911n, { maximumFractionDigits: 1 }), '1.9 kB')
    t.equal(prettyBytes(1111, { maximumFractionDigits: 2 }), '1.11 kB')
    t.equal(prettyBytes(1111n, { maximumFractionDigits: 2 }), '1.11 kB')
    t.equal(prettyBytes(1019, { maximumFractionDigits: 3 }), '1.019 kB')
    t.equal(prettyBytes(1019n, { maximumFractionDigits: 3 }), '1.019 kB')
    t.equal(prettyBytes(1001, { maximumFractionDigits: 3 }), '1.001 kB')
    t.equal(prettyBytes(1001n, { maximumFractionDigits: 3 }), '1.001 kB')
    t.equal(
        prettyBytes(1000, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 3
        }),
        '1.0 kB'
    )
    t.equal(
        prettyBytes(1000n, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 3
        }),
        '1.0 kB'
    )
    t.equal(
        prettyBytes(3942, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 2
        }),
        '3.94 kB'
    )
    t.equal(
        prettyBytes(3942n, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 2
        }),
        '3.94 kB'
    )
    t.equal(prettyBytes(59_952_784, { maximumFractionDigits: 1 }), '59.9 MB')
    t.equal(prettyBytes(59_952_784n, { maximumFractionDigits: 1 }), '59.9 MB')
    t.equal(
        prettyBytes(59_952_784, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }),
        '59.9 MB'
    )
    t.equal(
        prettyBytes(59_952_784n, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }),
        '59.9 MB'
    )
    t.equal(
        prettyBytes(4001, { maximumFractionDigits: 3, binary: true }),
        '3.907 KiB'
    )
    t.equal(
        prettyBytes(4001n, { maximumFractionDigits: 3, binary: true }),
        '3.907 KiB'
    )
    t.equal(
        prettyBytes(18_717, { maximumFractionDigits: 2, binary: true }),
        '18.27 KiB'
    )
    t.equal(
        prettyBytes(18_717n, { maximumFractionDigits: 2, binary: true }),
        '18.27 KiB'
    )
    t.equal(
        prettyBytes(18_717, { maximumFractionDigits: 4, binary: true }),
        '18.2783 KiB'
    )
    t.equal(
        prettyBytes(18_717n, { maximumFractionDigits: 4, binary: true }),
        '18.2783 KiB'
    )
    t.equal(
        prettyBytes(32_768, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 3,
            binary: true
        }),
        '32.00 KiB'
    )
    t.equal(
        prettyBytes(32_768n, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 3,
            binary: true
        }),
        '32.00 KiB'
    )
    t.equal(
        prettyBytes(65_536, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 3,
            binary: true
        }),
        '64.0 KiB'
    )
    t.equal(
        prettyBytes(65_536n, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 3,
            binary: true
        }),
        '64.0 KiB'
    )
})

test('space option', t => {
    t.equal(prettyBytes(0), '0 B')
    t.equal(prettyBytes(0n), '0 B')
    t.equal(prettyBytes(0, { space: false }), '0B')
    t.equal(prettyBytes(0n, { space: false }), '0B')
    t.equal(prettyBytes(999), '999 B')
    t.equal(prettyBytes(999n), '999 B')
    t.equal(prettyBytes(999, { space: false }), '999B')
    t.equal(prettyBytes(999n, { space: false }), '999B')
    t.equal(prettyBytes(-13, { signed: true }), '-13 B')
    t.equal(prettyBytes(-13n, { signed: true }), '-13 B')
    t.equal(
        prettyBytes(-13, { signed: true, space: false }),
        '-13B'
    )
    t.equal(
        prettyBytes(-13n, { signed: true, space: false }),
        '-13B'
    )
    t.equal(prettyBytes(42, { signed: true }), '+42 B')
    t.equal(prettyBytes(42n, { signed: true }), '+42 B')
    t.equal(
        prettyBytes(42, { signed: true, space: false }),
        '+42B'
    )
    t.equal(
        prettyBytes(42n, { signed: true, space: false }),
        '+42B'
    )
})

test('nonBreakingSpace option', t => {
    // Basic non-breaking space functionality
    t.equal(
        prettyBytes(1337, { nonBreakingSpace: true }),
        '1.34\u00A0kB'
    )
    t.equal(
        prettyBytes(1337n, { nonBreakingSpace: true }),
        '1.34\u00A0kB'
    )

    // When space: false, nonBreakingSpace should be ignored
    t.equal(
        prettyBytes(1337, { space: false, nonBreakingSpace: true }),
        '1.34kB'
    )
    t.equal(
        prettyBytes(1337n, { space: false, nonBreakingSpace: true }),
        '1.34kB'
    )

    // Test with signed option (special case with leading space for zero)
    t.equal(
        prettyBytes(0, { signed: true, nonBreakingSpace: true }),
        ' 0\u00A0B'
    )
    t.equal(
        prettyBytes(0n, { signed: true, nonBreakingSpace: true }),
        ' 0\u00A0B'
    )
})

test('fixedWidth option', t => {
    // Basic fixed width functionality
    t.equal(prettyBytes(1, { fixedWidth: 7 }), '    1 B')
    t.equal(prettyBytes(100, { fixedWidth: 7 }), '  100 B')
    t.equal(prettyBytes(1000, { fixedWidth: 7 }), '   1 kB')
    t.equal(prettyBytes(100_000, { fixedWidth: 7 }), ' 100 kB')
    t.equal(prettyBytes(1_000_000, { fixedWidth: 7 }), '   1 MB')

    // With bigint (representative cases only)
    t.equal(prettyBytes(1n, { fixedWidth: 7 }), '    1 B')
    t.equal(prettyBytes(1_000_000n, { fixedWidth: 7 }), '   1 MB')

    // Different width
    t.equal(prettyBytes(1337, { fixedWidth: 10 }), '   1.34 kB')

    // With binary option
    t.equal(
        prettyBytes(1024, { fixedWidth: 8, binary: true }),
        '   1 KiB'
    )
    t.equal(
        prettyBytes(10_240, { fixedWidth: 8, binary: true }),
        '  10 KiB'
    )

    // With signed option
    t.equal(
        prettyBytes(42, { fixedWidth: 8, signed: true }),
        '   +42 B'
    )
    t.equal(
        prettyBytes(-13, { fixedWidth: 8, signed: true }),
        '   -13 B'
    )
    t.equal(
        prettyBytes(0, { fixedWidth: 8, signed: true }),
        '     0 B'
    )

    // When output is wider than fixedWidth, no padding is applied
    t.equal(
        prettyBytes(1_000_000_000_000, { fixedWidth: 3 }),
        '1 TB'
    )

    // With locale
    t.equal(
        prettyBytes(1337, { fixedWidth: 8, locale: 'de' }),
        ' 1,34 kB'
    )

    // With bits option
    t.equal(
        prettyBytes(1337, { fixedWidth: 10, bits: true }),
        ' 1.34 kbit'
    )

    // FixedWidth: undefined (default) should not add padding
    t.equal(
        prettyBytes(1337, { fixedWidth: undefined }),
        '1.34 kB'
    )
    t.equal(prettyBytes(1337, {}), '1.34 kB') // Default behavior

    // With no space
    t.equal(
        prettyBytes(1337, { fixedWidth: 7, space: false }),
        ' 1.34kB'
    )

    // Edge cases
    t.equal(
        prettyBytes(1337, { fixedWidth: 0 }),
        '1.34 kB'
    ) // No padding for 0 width

    // Invalid fixedWidth values should throw
    t.throws(() => prettyBytes(1337, { fixedWidth: -5 }))
    t.throws(() =>
        prettyBytes(1337, { fixedWidth: Number.POSITIVE_INFINITY })
    )
    t.throws(() => prettyBytes(1337, { fixedWidth: Number.NaN }))
    t.throws(() => prettyBytes(1337, { fixedWidth: 3.5 }))
    t.throws(() => prettyBytes(1337, {
        // @ts-expect-error - testing invalid input
        fixedWidth: '10'
    }))
    t.throws(() =>
        prettyBytes(1337, { fixedWidth: Number.MAX_SAFE_INTEGER + 1 })
    )

    // With fractional digits
    t.equal(
        prettyBytes(1500, {
            fixedWidth: 10,
            maximumFractionDigits: 1
        }),
        '    1.5 kB'
    )

    // With small numbers
    t.equal(prettyBytes(0.5, { fixedWidth: 8 }), '   0.5 B')

    // With negative numbers (non-signed)
    t.equal(prettyBytes(-1337, { fixedWidth: 8 }), '-1.34 kB')

    // With non-breaking space
    t.equal(
        prettyBytes(1337, { fixedWidth: 8, nonBreakingSpace: true }),
        ' 1.34\u00A0kB'
    )
})
