export default `// You can import modules from esm and use them accordingly
import cn from "https://esm.sh/clsx";
import { If } from "https://esm.sh/react-extras";
import { format } from "https://esm.sh/@barelyhuman/date-utils";

() => {
  // All code should be here , including component definitions

  function Toggle({
    checked,
    accented,
    onChange,
    label,
    className,
    size = 12,
    ...props
  }) {
    const classNames = cn("toggle-button", className);
    return (
      <>
        <div className={classNames}>
          <input onChange={() => {}} type="checkbox" />
          <span></span>
        </div>
        <style jsx>{\`
          .toggle-button {
            position: relative;
            width: 33px;
            height: 24px;
            display: inline-block;
            border-radius: 40px;
          }

          input[type="checkbox"] {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            margin: 0px;
            cursor: pointer;
            opacity: 0;
            z-index: 3;
          }

          .toggle-button span {
            position: absolute;
            top: 0px;
            right: 0px;
            bottom: 0px;
            left: 0px;
            overflow: hidden;
            background-color: transparent;
            transition: 0.8s ease border-color, background-color;
          }

          .toggle-button span:before {
            content: "";
            position: absolute;
            top: 50%;
            width: 1px;
            height: 13px;
            border-width: 2px;
            border-style: solid;
            background: #b3b3b3;
            border-color: #b3b3b3;
            margin-left: 0px;

            transform: translate(0px, -50%);
            transition: 0.4s ease border-radius, 0.4s ease transform,
              0.6s ease width, 0.6s ease margin-left, 0.8s ease border-color;
            z-index: 2;
          }

          .toggle-button span:after {
            content: "";
            position: absolute;
            height: 4px;
            width: 100%;
            border-radius: 100px;
            top: 50%;
            bottom: 0px;
            transform: translateY(-50%);
            left: 0px;
            right: 0px;
            background: #b3b3b3;
            z-index: 1;
          }

          .toggle-button input[type="checkbox"]:active + span:before {
            width: 80px;
            border-radius: 40px;
          }

          .toggle-button input[type="checkbox"]:checked:active + span:before {
            margin-left: -22px;
          }

          .toggle-button input[type="checkbox"]:checked + span {
            border-color: #000;
          }

          .toggle-button input[type="checkbox"]:checked + span:before {
            border-color: \${accented ? "var(--accent)" : "#000"};
            box-shadow: none;
            height: 13px;
            width: 13px;
            border-radius: 40px;
            transform: translate(16px, -50%);
            background: #fff;
          }
        \`}</style>
      </>
    );
  }

  const Spacer = ({ x, y, ...props }) => {
    return (
      <div
        style={{
          marginTop: y || 0,
          marginBottom: y || 0,
          marginLeft: x || 0,
          marginRight: x || 0,
        }}
      ></div>
    );
  };

  const Input = (props) => {
    return (
      <>
        <input {...props} />
        <style jsx>{\`
          input {
            background: #fff;
            color: #000;
            border: 2px solid rgba(12, 12, 13, 0.1);
            border-radius: 4px;
            height: 40px;
            min-width: 250px;
            padding: 0 16px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            transition: all 0.2s ease;
          }

          input:hover,
          input:focus {
            border-color: #000;
            outline: #000;
          }
        \`}</style>
      </>
    );
  };

  return (
    <>
      <Input placeholder="Password Input" type="password" />
      <Spacer y={16} x={8} />
      <Input placeholder="Text Input" />
      <Spacer y={16} x={8} />
      <Toggle />
      <Spacer y={16} x={8} />
      <Toggle accented />
      <style jsx global>{\`
        :root {
          --accent: red;
        }
      \`}</style>
    </>
  );
};
`;
