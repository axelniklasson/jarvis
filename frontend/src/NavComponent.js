import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class NavComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  toggleDrawer = () => this.setState({open: !this.state.open});

  closeDrawer = () => this.setState({open: false});

  render() {
    return (
      <div>
        <AppBar 
          title = { "Jarvis" }
          onLeftIconButtonClick = { this.toggleDrawer.bind(this) }
        />

        <Drawer 
          open={this.state.open} 
          docked={false} 
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onClick={this.closeDrawer}>Dashboard</MenuItem>
          <MenuItem onClick={this.closeDrawer}>Devices</MenuItem>
          <MenuItem onClick={this.closeDrawer}>Network</MenuItem>
          <MenuItem onClick={this.closeDrawer}>Settings</MenuItem>
        </Drawer>
      </div>
    );
  }
}
