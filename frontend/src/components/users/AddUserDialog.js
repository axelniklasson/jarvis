import React from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';

export default class AddUserDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      reading: false,
      completed: 0,
      user: {
        name: '',
        tagID: ''
      }
    };
  }

  calculateCompletion = () => {
    let completed = this.state.completed;
    completed += 1;
    this.setState({ completed });
  }

  readTag = () => {
    this.setState({ reading: true });
    this.interval = setInterval(this.calculateCompletion, 50);

    axios.get(process.env.REACT_APP_API_URL + '/tags/read')
      .then(res => {
        const user = this.state.user;
        user.tagID = res.data.tagID;

        this.setState({
          reading: false,
          user
        });

        clearInterval(this.interval);
      }).catch(err => {
        clearInterval(this.interval);
        this.readTag();
      });
  }

  open = () => {
    this.setState({
      open: true
    });

    this.readTag();
  }

  close = () => {
    this.setState({
      open: false,
      completed: 0,
      user: {
        name: '',
        tagID: ''
      }
    });
  }

  submit = () => {
    this.props.onSubmit(this.state.user);
    this.close();
  }

  handleNameChange = (e) => {
    const user = this.state.user;
    user.name = e.target.value;
    this.setState({ user });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.close}
      />,
      <FlatButton
        label="Add user"
        primary={true}
        disabled={this.state.user.name === '' || this.state.user.tagID === ''}
        onClick={this.submit}
      />
    ];

    return (
      <div>
        <RaisedButton label="Add user" primary={true} onClick={this.open} />

        <Dialog
          title={"Add user"}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.close}
        >
          <TextField
            floatingLabelText="Name of user"
            value={this.state.user.name}
            onChange={this.handleNameChange}
          />

          {this.state.reading ? (
            <div>
              <p>Please register tag at base station within 5 seconds..</p>
              <LinearProgress mode="determinate" value={this.state.completed} />
            </div>
          ) : (
            <TextField
              floatingLabelText="Tag ID"
              disabled={true}
              value={this.state.user.tagID}
            />
          )}
        </Dialog>
      </div>
    );
  }
}
