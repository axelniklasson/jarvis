import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';

export default class NavComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  toggleDrawer = () => this.setState({ open: !this.state.open });

  closeDrawer = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <AppBar 
          title = { "Jarvis" }
          onLeftIconButtonClick = { this.toggleDrawer.bind(this) }
        />

        <Drawer 
          open={ this.state.open } 
          docked={false} 
          onRequestChange={ (open) => this.setState({ open }) }
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <MenuItem onClick={ this.closeDrawer }>Dashboard</MenuItem>
          </Link>

          <Link to="/devices" style={{ textDecoration: "none" }}>
            <MenuItem onClick={ this.closeDrawer}>Devices</MenuItem>
          </Link>

          <Link to="/network" style={{ textDecoration: "none" }}>
            <MenuItem onClick={ this.closeDrawer}>Network</MenuItem>
          </Link>

          <Link to="/settings" style={{ textDecoration: "none" }}>
            <MenuItem onClick={ this.closeDrawer }>Settings</MenuItem>
          </Link>
        </Drawer>
      </div>
    );
  }
}
