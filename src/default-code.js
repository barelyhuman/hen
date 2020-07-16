export default `
<>
      <button className="button">
            Hello
      </button>
      <style jsx>
        {\`
          .button {
            background: #000;
            color: #fff;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            height: 32px;
            padding-left: 16px;
            padding-right: 16px;
            font-size: 14px;
            width: auto;
            outline: #000;
            border: 2px solid  #000;
            border-radius:  4px;
            transition: 250ms all ease;
          }

          .button:hover,
          .button:focus {
            background: #fff;
            color: #000;
          }
        \`}
      </style>
  </>
  `;
