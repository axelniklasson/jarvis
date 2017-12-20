import React from 'react';
import { Route } from 'react-router-dom';
import NavComponent from './NavComponent'
import DashboardComponent from './DashboardComponent';
import DevicesComponent from './DevicesComponent';
import SettingsComponent from './SettingsComponent';
import UsersComponent from './UsersComponent';

const AppComponent = () => (
  <div>
    <NavComponent />
    
    <div className="main-container">
      <Route exact path="/" component={ DashboardComponent }/>
      <Route path="/devices" component={ DevicesComponent }/>
      <Route path="/users" component={ UsersComponent } />
      <Route path="/settings" component={ SettingsComponent }/>
    </div>
  </div>
);

export default AppComponent;
