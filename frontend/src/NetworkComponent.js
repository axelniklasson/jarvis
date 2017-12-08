import React from 'react';
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';
import Device from 'material-ui/svg-icons/device/devices';


class NetworkComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hosts: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/network/active')
      .then(res => {
        this.setState({ hosts: res.data });
      });
  }

  render() {
    return (
      <div>
        <h2>Network information</h2>
        <h3>Active hosts on network</h3>
        <List>
          {this.state.hosts.map(host => 
            <ListItem 
              primaryText={host.hostname} secondaryText={"IP-address: " + host.ip_address + " - MAC-address: " + host.mac_address} 
              leftIcon={<Device />} />
          )}
        </List>
      </div>
    );
  }

  foo(host) {
    return host.mac_address;
  }

}

export default NetworkComponent;
