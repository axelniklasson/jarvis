import React from 'react';
import axios from 'axios';
import { List, ListItem } from 'material-ui/List';
import Device from 'material-ui/svg-icons/device/devices';
import SnackBar from './helpers/SnackBar'
import RaisedButton from 'material-ui/RaisedButton';
import Refresh from 'material-ui/svg-icons/av/loop'

export default class NetworkComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hosts: [],
      snackbar: {
        message: '',
        open: false
      }
    };
  }

  showSnackbar = (message) => {
    this.setState({
      snackbar: {
        message: message,
        open: true
      }
    });
  }

  fetchData = () => {
    axios.get(process.env.REACT_APP_API_URL + '/network/active')
      .then(res => {
        const hosts = res.data;
        this.setState({ hosts });
      }).catch(err => {
        this.showSnackbar('Could not fetch hosts on network');
      });
  }

  componentDidMount() {
    this.refreshHostsInterval = setInterval(this.fetchData, 3000);
    this.fetchData();
  }

  componentWillUnmount() {
    clearInterval(this.refreshHostsInterval);
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
                key={index} primaryText={host.hostname !== "?" ? (host.hostname) : ("No hostname available")}
                secondaryText={"IP-address: " + host.ip_address + " - MAC-address: " + host.mac_address} 
                leftIcon={<Device />} />
            )}
          </List>
        ) : (
          <p>Scanning network every third second...</p>
        )}

        <RaisedButton label="Update" primary={true} onClick={this.fetchData} icon={<Refresh />} />

        <SnackBar 
          data={this.state.snackbar}
        />
      </div>
    );
  }
}

