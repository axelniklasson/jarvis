import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppComponent from './components/AppComponent'
import { BrowserRouter as Router } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <AppComponent />
        </Router>
      </MuiThemeProvider>
    );
  }
}

