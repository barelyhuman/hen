import debounce from 'lodash.debounce'
import parserBabel from 'prettier/parser-babel'
import prettier from 'prettier/standalone'

import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'

import React, { useCallback, useState } from 'react'
import useMousetrap from 'react-hook-mousetrap'
import Editor from 'react-simple-code-editor'
import Button from './button'
import Spacer from './spacer'

import { findNodesFromCode } from '../lib/findNodesFromCode'
import { isSnippetNode } from '../lib/isSnippetNode'
import { createZip } from '../lib/createZip'

export default (props) => {
  const [code, setCode] = useState(props.code)
  const [experimentalExport, setExperimentalExport] = useState(false)

  const formatCallback = useCallback(() => {
    formatCode(code)
  }, [code])

  useMousetrap(['ctrl+shift+f'], formatCallback)

  const debouncedTrigger = debounce(props.onCodeChange, 1000)

  const handleValueChange = (code) => {
    const _value = code
    setCode(_value)
    debouncedTrigger(_value)
  }

  const formatCode = (toFormatCode) => {
    const _value = prettier.format(toFormatCode, {
      parser: 'babel',
      plugins: [parserBabel]
    })
    setCode(_value)
    props.onCodeChange(_value)
  }

  const exportCode = () => {
    const files = []
    if (experimentalExport) {
      const nodes = findNodesFromCode(code)
      const validNodes = nodes.filter((item) => !isSnippetNode(item))

      validNodes.forEach((item) => {
        files.push({
          name: String(item.name).toLowerCase() + '.js',
          content: item.code
        })
      })
    } else {
      const file = { name: 'hen.js', content: code }
      files.push(file)
    }

    createZip(files)
  }

  return (
    <>
      <div>
        <Button onClick={(e) => formatCode(code)}>Format (Ctrl+Shift+F)</Button>
        <Spacer x={1} inline />
        <Button secondary onClick={(e) => exportCode(code)}>
          Export Code
        </Button>
        <Spacer y={2} />
        <div>
          <label htmlFor=''>
            <input
              type='checkbox'
              value={experimentalExport}
              onChange={(e) => setExperimentalExport(e.target.value)}
            />
            Enable experimental split export?
          </label>
        </div>
      </div>
      <Spacer y={1} />
      <Editor
        value={code}
        onValueChange={handleValueChange}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: 'Hack, monospace',
          lineHeight: '30px',
          fontSize: '16px'
        }}
        className='hen-code-wrapper'
        textareaClassName='hen-code-editor'
        preClassName='hen-code-editor-pre'
      />
      <style jsx global>
        {`
          .hen-code-wrapper {
          }

          .hen-code-editor + .hen-code-editor-pre {
            min-height: 200px;
            border: 2px solid rgba(12, 12, 13, 0.1) !important;
            border-radius: 4px;
          }

          .hen-code-editor:focus + .hen-code-editor-pre,
          .hen-code-editor:hover + .hen-code-editor-pre {
            border-color: #000 !important;
          }
        `}
      </style>
    </>
  )
}
