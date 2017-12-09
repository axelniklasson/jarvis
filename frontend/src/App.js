import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppComponent from './AppComponent'

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <AppComponent />
      </MuiThemeProvider>
    );
  }
}

