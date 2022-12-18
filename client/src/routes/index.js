import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Routes = () => {
    return (
        <Router>
            <Switch>
                {/* TODO: Root route is the insights dashboard */}
                <Route exact path="/" component={<Fragment />} />
                {/* List of all files (metadata) */}
                <Route exact path="/files" component={<Fragment />} />
                {/* Should /upload become a simple modal within the files route? */}
                <Route exact path="/upload" component={<Fragment />} />
                {/* Clicking a file in the file list downloads the file from the backend (this is a 'nice to have') */}
                <Route exact path="/download/:fileName" component={<Fragment />} />
            </Switch>
        </Router>
    );
  };
  
  export default Routes;
