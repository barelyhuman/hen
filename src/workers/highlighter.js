import hljs from 'highlight.js'

/* eslint no-global-assign: off */
onmessage = function (ev) {
  const value = hljs.highlightAuto(ev.data).value
  postMessage(value)
}
