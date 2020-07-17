import React from "react";

const Button = ({ children, ...props }) => {
  return (
    <>
      <button {...props}>{children}</button>
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
          transition: all 0.2s ease;
        }

        button:hover {
          background: #fff;
          color: #000;
        }
      `}</style>
    </>
  );
};

export default Button;
