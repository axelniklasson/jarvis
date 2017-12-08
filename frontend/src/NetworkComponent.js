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
    axios.get(process.env.REACT_APP_API_URL + "/network/active")
      .then(res => {
        const hosts = res.data;
        this.setState({ hosts });
      });
  }

  render() {
    return (
      <div>
        <h2>Network information</h2>
        <h3>Active hosts on network</h3>
        {this.state.hosts.length > 0 ? (
          <List>
            {this.state.hosts.map((host, index) => 
              <ListItem 
                key={index} primaryText={host.hostname} 
                secondaryText={"IP-address: " + host.ip_address + " - MAC-address: " + host.mac_address} 
                leftIcon={<Device />} />
            )}
          </List>
        ) : (
          <p>Scanning network...</p>
        )}
      </div>
    );
  }
}

export default NetworkComponent;
