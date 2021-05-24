import React from 'react'
import cn from 'classnames'

const Button = ({ children, secondary, ...props }) => {
  const classList = cn({ secondary })
  return (
    <>
      <button className={classList} {...props}>
        {children}
      </button>
      <style jsx>{`
        button {
          background: #000;
          color: #fff;
          border: 2px solid #000;
          border-radius: 4px;
          height: 32px;
          padding: 0 16px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          font-weight:bold;
          transition: all 0.2s ease;
          outline:transparent;
        }

        button:hover {
          background: #fff;
          color: #000;
          cursor:pointer;
        }

        button.secondary {
          color: #4c566a;
          background: transparent;
          border:0px;
        }

        button.secondary:hover {
          background: #eceff4;
        }
      `}
      </style>
    </>
  )
}

export default Button
