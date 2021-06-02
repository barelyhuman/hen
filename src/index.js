import React from 'react'
import ReactDOM from 'react-dom'
import '../assets/css/reaper-theme-hljs.css'
import '../assets/css/raster2.css'
import '../assets/css/base.css'
import App from './App'

const Index = () => {
  return (
    <>
      <App />
    </>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))
