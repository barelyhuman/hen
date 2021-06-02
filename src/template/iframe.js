export const iframeTemplateCode = (code) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hen iframe</title>
    <script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://unpkg.com/classnames@latest/index.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">

      try{
          let _react = {};
        _react.default = React;
        let cn = classNames;
        
        const Snippet = ${code}
        

        const Index = () => {
          parent.postMessage("loaded-iframe");
          return (
            <>
              <Snippet />
            </>
          );
        };

        ReactDOM.render(<Index />, document.getElementById("root"));
      }
      catch(err){
        parent.postMessage({
          type:'error',
          data:err
        });
      }
    </script>
  </body>
</html>

`
