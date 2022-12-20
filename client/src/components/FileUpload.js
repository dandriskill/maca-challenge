import React, { useState } from 'react';
import { validateFileExtension } from '../utils/files';
import PlatformService from '../api/PlatformService';
import {CircularProgress, Box, Typography, Button } from '@mui/material';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('isUploading'); // isUploading, isValidating, isSuccess, isError

  const handleChange = (e) => {
    setStatus('isUploading');
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus('isValidating');

    // Display error if no file is selected
    if (!file) {
      setStatus('isError');
      alert('No file selected!');
      return;
    }

    // Check file extension against a whitelist of extensions
    if (!validateFileExtension(file.name)) {
      setStatus('isError');
      alert('Incorrect file extension.');
      return;
    }

    // Append file to the form
    const formData = new FormData();
    formData.append('file', file);

    try {
      await PlatformService.post('/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setStatus('isSuccess');
    } catch (error) {
      console.log(error);
      setStatus('isError');
      alert('Something went wrong.');
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit} style={{ paddingTop: '20px' }}>
        <div>
          <Typography variant="subtitle1" style={{ padding: '20px 0'}}>
            Upload <strong>.csv</strong> or <strong>.json</strong> files...
          </Typography>
        </div>
        {status === 'isValidating' && <CircularProgress />}
        <input type="file" name="file" onChange={handleChange} />
        {status === 'isError' && (
          <Typography variant="subtitle1" style={{ padding: '20px 0'}}>Something went wrong.</Typography>
        )}
        {status === 'isSuccess' && (
          <Typography variant="subtitle1" style={{ padding: '20px 0'}}>Success!</Typography>
        )}
        <Button type="submit" variant="contained">
          Upload
        </Button>
      </form>
    </Box>
  );
}

export default FileUpload;
