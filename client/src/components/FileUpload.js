import React, { useState } from 'react';
import { getFileExtension } from '../utils/files';

// TODO: Validate allowed file extensions
// TODO: Create loading/success state and accompanying UI behavior
// TODO: Style form
function FileUpload() {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    // TODO: Confirm response shape is as expected (manual testing)
    // Send the POST request to the file upload endpoint
    fetch('/files', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default FileUpload;
