import { type FunctionComponent, render } from 'preact'
import { html } from 'htm/preact'
import { signal } from '@preact/signals'
import humanBytes from '../src/index.js'

const state = {
    input: signal('1234567890')
}

function handleInput (ev:Event) {
    const target = ev.target as HTMLInputElement
    state.input.value = target.value
}

const Example:FunctionComponent = function () {
    const inputValue = state.input.value
    let result = ''
    let error = ''

    try {
        const num = inputValue.includes('.') ?
            parseFloat(inputValue) :
            BigInt(inputValue)
        result = humanBytes(num)
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
                    <div class="result-value">${result}</div>
                </div>
            `}
        </div>
    </div>`
}

render(html`<${Example} />`, document.getElementById('root')!)
