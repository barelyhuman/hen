export const iframeTemplateCode = (imports, snippet) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hen iframe</title>

    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css">

  </head>
  <body>
    <div id="root"></div>
    <script type="module">


    import React from 'https://esm.sh/react';
    import {render} from 'https://esm.sh/react-dom';


      ${imports}

      try{
        ${snippet}
      }catch(err){
        parent.postMessage({
          type:'error',
          data:err
        });
      }
    

    </script>
  </body>
</html>

`;
