import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={<Fragment />} />
            <Route exact path="/upload" component={<Fragment />} />
          </Switch>
        </Router>
      </div>
  );
};

export default App;
