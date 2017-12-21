import React from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import Lock from 'material-ui/svg-icons/action/lock';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import SnackBar from './helpers/SnackBar'

export default class AlarmComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alarm: {
        status: ''
      },
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

  fetchAlarmStatus = () => {
    axios.get(process.env.REACT_APP_API_URL + '/alarm/status')
      .then(res => {
        this.setState({ alarm: res.data.alarm });
      }).catch(err => {
        const alarm = this.state.alarm;
        alarm.status = "disconnected";
        this.setState({ alarm });
        this.showSnackbar('Could not get alarm status');
      });
  }
  
  armAlarm = () => {
    axios.post(process.env.REACT_APP_API_URL + '/alarm/arm')
      .then(res => {
        const alarm = res.data.alarm;
        this.setState({ alarm });
      }).catch(err => {
        this.showSnackbar('Could not arm alarm');
      });
  }

  disarmAlarm = () => {
    axios.post(process.env.REACT_APP_API_URL + '/alarm/disarm')
      .then(res => {
        const alarm = res.data.alarm;
        this.setState({ alarm });
      }).catch(err => {
        this.showSnackbar('Could not disarm alarm');
      });
  }

  componentDidMount() {
    this.checkAlarmInterval = setInterval(this.fetchAlarmStatus, 5000);
    this.fetchAlarmStatus();
  }

  componentWillUnmount() {
    clearInterval(this.checkAlarmInterval);
  }

  render() {
    return (
      <div>
        {this.state.alarm.status === "unknown" ? (
          <p>Checking alarm status..</p>
        ) : (
          <p>The alarm is {this.state.alarm.status}.</p>
        )}

        {this.state.alarm.status === "armed" ? (
          <RaisedButton label="Disarm" primary={true} onClick={this.disarmAlarm} icon={<LockOpen />} />
        ) : (
          <RaisedButton label="Arm" primary={true} onClick={this.armAlarm} icon={<Lock />} />
        ) }

        <SnackBar 
          data={this.state.snackbar}
        />
      </div>
    )
  }
}
