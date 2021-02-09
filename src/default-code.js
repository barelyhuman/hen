export default `
const Spacer = (props) => {
  const style = {
    height: 1,
    width: 1,
    display: props.inline ? "inline-block" : "block",
  };

  const spacingMultiplier = 8;

  if (props.x) {
    style.marginLeft = spacingMultiplier * props.x;
  }

  if (props.y) {
    style.marginTop = spacingMultiplier * props.y;
  }

  return <div style={style}>{props.children}</div>;
};

const Input = ({ children, ...props }) => {
  return (
    <>
      <input {...props} />
      <style jsx>{\`
        input {
          background: #fff;
          color: #000;
          border: 2px solid rgba(12,12,13,0.1);
          border-radius: 4px;
          height: 32px;
          padding: 0 16px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          transition: all 0.2s ease;
        }

        input:hover,input:focus {
          border-color:#000;
          outline:#000;
        }
      \`}</style>
    </>
  );
};

const Button = ({ children, ...props }) => {
  return (
    <>
      <button {...props}>{children}</button>
      <style jsx>{\`
        button {
          background: #000;
          color: #fff;
          border: 2px solid rgba(12,12,13,0.1);
          border-radius: 4px;
          height: 32px;
          padding: 0 16px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          transition: all 0.2s ease;
        }

        button:hover{
          border-color:#000;
          outline:#000;
          color:#000;
          background:#fff;
        }
      \`}</style>
    </>
  );
};

const Snippet = () => {
  const [value, setValue] = React.useState("");
  const handleClick = () => {
    alert(\`Holy Crap, Why would you type this? \$\{value\}\`);
  };
  return (
    <>
      <Input
        placeholder="hello"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Spacer y={1} />
      <Button onClick={handleClick}> Submit </Button>
    </>
  );
};
`;
