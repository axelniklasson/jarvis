import React from 'react';
import SchemesComponent from './SchemesComponent';

export default class DashboardComponent extends React.Component {
  render() {
    return (
      <div>
        <h2>Dashboard</h2>
        
        <h3>Apartment scheme</h3>
        <SchemesComponent />
      </div>
    );
  }
}

