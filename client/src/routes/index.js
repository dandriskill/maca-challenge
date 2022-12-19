import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileUpload from '../components/FileUpload';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/* TODO: Root route is the insights dashboard */}
                <Route exact path="/" element={<Fragment />} />
                {/* List of all files (metadata) */}
                <Route exact path="/files" element={<Fragment />} />
                {/* Should /upload become a simple modal within the files route? */}
                <Route exact path="/upload" element={<FileUpload />} />
                {/* Clicking a file in the file list downloads the file from the backend (this is a 'nice to have') */}
                <Route exact path="/download/:fileName" element={<Fragment />} />
            </Routes>
        </Router>
    );
  };
  
  export default AppRouter;
