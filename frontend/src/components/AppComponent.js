import React from 'react';
import NavComponent from './NavComponent'
import DashboardComponent from './DashboardComponent';
import DevicesComponent from './DevicesComponent';
import NetworkComponent from './NetworkComponent';
import SettingsComponent from './SettingsComponent';
import { Route } from 'react-router-dom';

const AppComponent = () => (
  <div>
    <NavComponent />
    
    <div className="main-container">
      <Route exact path="/" component={ DashboardComponent }/>
      <Route path="/devices" component={ DevicesComponent }/>
      <Route path="/network" component={ NetworkComponent }/>
      <Route path="/settings" component={ SettingsComponent }/>
    </div>
  </div>
);

export default AppComponent;
