import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export const createZip = (files) => {
  var zip = new JSZip();
  const hen = zip.folder('hen');
  const components = hen.folder('components');
  files.forEach((fileItem) => {
    components.file(fileItem.name, fileItem.content);
  });
  zip.generateAsync({ type: 'blob' }).then(function (content) {
    saveAs(content, 'hen.zip');
  });
};
