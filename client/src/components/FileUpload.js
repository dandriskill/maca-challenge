import React, { useState } from 'react';
import { validateFileExtension } from '../utils/files';

// TODO: Utilize MUI components
function FileUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('isUploading'); // isUploading, isValidating, isSuccess

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setStatus('isValidating');

    // Display error if no file is selected
    if (!file) {
      setError('No file selected.');
      return;
    }

    // Check file extension against a whitelist of extensions
    if (!validateFileExtension(file.name)) {
      setError('Incorrect file extension.');
      return;
    }

    // Append file to the form
    const formData = new FormData();
    formData.append('file', file);

    // Send the POST request to the file upload endpoint
    fetch('/files', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setStatus('isSuccess');
      })
      .catch(err => {
        setError('Something went wrong.');
        setStatus('isUploading');
      });
  };

  // TODO: Add spinner when validating, remove on 'isSuccess' and 'isUploading'
  // TODO: Add error message below the form input when there is an error
  // TODO: Add success message on successful upload (users can upload on 'isUploading' and on 'isSuccess')
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default FileUpload;
