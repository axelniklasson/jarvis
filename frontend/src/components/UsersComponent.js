import React from 'react';
import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Tag from 'material-ui/svg-icons/action/label';
import Remove from 'material-ui/svg-icons/content/remove-circle';
import Add from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';

export default class UsersComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      snackbar: {
        text: '',
        open: false
      }
    };
  }

  componentDidMount() {
    this.fetchTags(); 
  }

  showSnackbar = (text) => {
    this.setState({
      ...this.state,
      snackbar: {
        text: text,
        open: true
      }
    });
  }

  closeSnackbar = () => {
    this.setState({
      ...this.state,
      snackbar: {
        text: '',
        open: false
      }
    });
  }

  fetchTags = () => {
    axios.get(process.env.REACT_APP_API_URL + '/tags/list')
      .then(res => {
        const tags = res.data.tags;
        this.setState({ tags });
      }).catch(err => {
        this.showSnackbar('Could not fetch tags');
      });
  }

  render() {
    return (
      <div>
        <h2>Users</h2>

        <List>
          {this.state.tags.map((tag, index) => 
            <ListItem
              key={index}
              leftAvatar={<Avatar icon={<Tag />} />}
              rightIcon={<Remove />}
              primaryText={tag.user}
              secondaryText={tag.tagID}
            />
          )}
        </List>

        {this.state.tags.length == 0 &&
            <p>No users added. Click the button below and get started!</p>
        }

        <RaisedButton label="Add user" primary={true} onClick={this.fetchData} icon={<Add />} />

        <Snackbar
          open={this.state.snackbar.open}
          message={this.state.snackbar.text}
          autoHideDuration={2000}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}
