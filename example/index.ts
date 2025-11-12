import { type FunctionComponent, render } from 'preact'
import { html } from 'htm/preact'
import { signal, useSignal, type Signal } from '@preact/signals'
import '@substrate-system/css-normalize'
import { type Options, humanBytes } from '../src/index.js'
import Debug from '@substrate-system/debug'

const debug = Debug(import.meta.env.DEV)

const state:{
    input:Signal<string>;
    opts:{
        bits:Signal<boolean>
        binary:Signal<boolean>
        signed:Signal<boolean>
        space:Signal<boolean>
        nonBreakingSpace:Signal<boolean>
        locale:Signal<string>
        minimumFractionDigits:Signal<string>
        maximumFractionDigits:Signal<string>
        fixedWidth:Signal<string>
    }
} = {
    input: signal('1234567890'),
    opts: {
        bits: signal<boolean>(false),
        binary: signal<boolean>(false),
        signed: signal<boolean>(false),
        space: signal<boolean>(true),
        nonBreakingSpace: signal<boolean>(false),
        locale: signal<string>(''),
        minimumFractionDigits: signal<string>(''),
        maximumFractionDigits: signal<string>(''),
        fixedWidth: signal<string>('')
    }
}

function handleInput (ev:Event) {
    const target = ev.target as HTMLInputElement
    state.input.value = target.value
}

function handleCheckbox (key:keyof typeof state.opts) {
    return (ev:Event) => {
        const target = ev.target as HTMLInputElement
        ;(state.opts[key] as Signal<boolean>).value = target.checked
    }
}

function handleTextInput (key:keyof typeof state.opts) {
    return (ev:Event) => {
        const target = ev.target as HTMLInputElement
        ;(state.opts[key] as Signal<string>).value = target.value
    }
}

const Example:FunctionComponent = function () {
    const inputValue = state.input.value
    let error = ''

    const result = useSignal<null|string>(null)

    debug('rendering...', result.value)

    // Build options object from state
    const opts:Options = ([
        'bits',
        'binary',
        'signed',
        'space',
        'nonBreakingSpace',
    ]).reduce((acc, k) => {
        acc[k] = state.opts[k].value
        return acc
    }, {})

    if (state.opts.locale.value) {
        const localeVal = state.opts.locale.value
        if (localeVal === 'true') {
            opts.locale = true
        } else if (localeVal.includes(',')) {
            opts.locale = localeVal.split(',').map(s => s.trim())
        } else {
            opts.locale = localeVal
        }
    }

    if (state.opts.minimumFractionDigits.value) {
        opts.minimumFractionDigits = parseInt(
            state.opts.minimumFractionDigits.value
        )
    }
    if (state.opts.maximumFractionDigits.value) {
        opts.maximumFractionDigits = parseInt(
            state.opts.maximumFractionDigits.value
        )
    }
    if (state.opts.fixedWidth.value) {
        opts.fixedWidth = parseInt(state.opts.fixedWidth.value)
    }

    try {
        const num = inputValue.includes('.') ?
            parseFloat(inputValue) :
            BigInt(inputValue)
        result.value = humanBytes(num, opts)
    } catch (err) {
        error = err instanceof Error ? err.message : String(err)
    }

    return html`<div class="app">
        <h1>Human File Sizes</h1>

        <p class="description">
            Convert byte values to human-readable file size strings.
            Supports both numbers and BigInts.
        </p>

        <div class="converter">
            <div class="input-output">
                <label>
                    <div class="label-text">Bytes:</div>
                    <input
                        type="text"
                        name="input"
                        id="input"
                        value=${inputValue}
                        onInput=${handleInput}
                        placeholder="Enter a number"
                    />
                </label>

                ${error ? html`
                    <div class="error">
                        <strong>Error:</strong> ${error}
                    </div>
                ` : html`
                    <div class="result">
                        <div class="result-label">Human readable:</div>
                        <div class="result-value">${result.value}</div>
                    </div>
                `}
            </div>

            <fieldset class="options">
                <legend>Options</legend>

                <label class="checkbox-label">
                    <input
                        type="checkbox"
                        name="bits"
                        checked=${state.opts.bits.value}
                        onChange=${handleCheckbox('bits')}
                    />
                    <span>bits - Format as bits instead of bytes</span>
                </label>

                <label class="checkbox-label">
                    <input
                        type="checkbox"
                        name="binary"
                        checked=${state.opts.binary.value}
                        onChange=${handleCheckbox('binary')}
                    />
                    <span>binary - Use binary prefix (base 1024)</span>
                </label>

                <label class="checkbox-label">
                    <input
                        type="checkbox"
                        name="signed"
                        checked=${state.opts.signed.value}
                        onChange=${handleCheckbox('signed')}
                    />
                    <span>signed - Include + sign for positive numbers</span>
                </label>

                <label class="checkbox-label">
                    <input
                        type="checkbox"
                        name="space"
                        checked=${state.opts.space.value}
                        onChange=${handleCheckbox('space')}
                    />
                    <span>space - Add space between number and unit</span>
                </label>

                <label class="checkbox-label">
                    <input
                        type="checkbox"
                        name="non-breaking"
                        checked=${state.opts.nonBreakingSpace.value}
                        onChange=${handleCheckbox('nonBreakingSpace')}
                    />
                    <span>nonBreakingSpace - Use non-breaking space</span>
                </label>

                <label>
                    <div class="label-text">locale (string, array, or "true"):</div>
                    <input
                        type="text"
                        name="locale"
                        value=${state.opts.locale.value}
                        onInput=${handleTextInput('locale')}
                        placeholder="e.g., 'de' or 'en,de' or 'true'"
                    />
                </label>

                <label>
                    <div class="label-text">minimumFractionDigits:</div>
                    <input
                        name="min"
                        type="number"
                        min="0"
                        value=${state.opts.minimumFractionDigits.value}
                        onInput=${handleTextInput('minimumFractionDigits')}
                        placeholder="e.g., 2"
                    />
                </label>

                <label>
                    <div class="label-text">maximumFractionDigits:</div>
                    <input
                        name="max"
                        type="number"
                        min="0"
                        value=${state.opts.maximumFractionDigits.value}
                        onInput=${handleTextInput('maximumFractionDigits')}
                        placeholder="e.g., 2"
                    />
                </label>

                <label>
                    <div class="label-text">fixedWidth</div>
                    <p id="fw-description">
                        (The string will be padded with spaces on the
                        left if needed.)
                    </p>
                    <input
                        name="fixed-width"
                        aria-describedby="fw-description"
                        type="number"
                        min="0"
                        value=${state.opts.fixedWidth.value}
                        onInput=${handleTextInput('fixedWidth')}
                        placeholder="e.g., 10"
                    />
                </label>
            </fieldset>
        </div>
    </div>`
}

render(html`<${Example} />`, document.getElementById('root')!)
