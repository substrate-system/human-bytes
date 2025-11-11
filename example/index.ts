import { type FunctionComponent, render } from 'preact'
import { html } from 'htm/preact'
import prettyBytes from '../src/index.js'

console.log(prettyBytes(1337))

const Example:FunctionComponent<unknown> = function () {
    return html`<div>hello</div>`
}

render(html`<${Example} />`, document.getElementById('root')!)
