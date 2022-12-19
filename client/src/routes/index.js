import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

// Code-splitting for frontend performance
const Layout = lazy(() => import('../components/Layout'));
const Dashboard = lazy(() => import('../components/Dashboard'));
const FileUpload = lazy(() => import('../components/FileUpload'));
const PageNotFound = lazy(() => import('../components/PageNotFound'));

const AppRouter = () => {
    return (
        <Suspense fallback={<CircularProgress />}>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        {/* Index route is the insights dashboard */}
                        <Route index element={<Dashboard />} />
                        {/* Route for uploading files (would become a modal with more time) */}
                        <Route exact path="upload" element={<FileUpload />} />
                    </Route>
                    {/* Catches all out-of-bounds browser navigation */}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>
        </Suspense>
    );
  };
  
  export default AppRouter;
