import React from 'react';
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Tag from 'material-ui/svg-icons/hardware/security';
import Remove from 'material-ui/svg-icons/content/remove-circle';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AddUserDialog from './users/AddUserDialog';
import SnackBar from './helpers/SnackBar'

export default class UsersComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      snackbar: {
        message: '',
        open: false
      },
      modal: {
        open: false,
        tag: {}
      }
    };
  }

  componentDidMount() {
    this.fetchTags(); 
  }

  showSnackbar = (message) => {
    this.setState({
      snackbar: {
        message: message,
        open: true
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

  showDeleteDialog = (index) => {
    const tag = this.state.tags[index];
    this.setState({
      ...this.state,
      modal: {
        open: true,
        tag: tag
      }
    });
  }

  closeDialog = () => {
    this.setState({
      ...this.state,
      modal: {
        open: false,
        tag: {}
      },
      addModal: {
        open: false,
        tag: {}
      }
    });
  }

  deleteUser = () => {
    const tag = this.state.modal.tag;
    axios.post(process.env.REACT_APP_API_URL + '/tags/remove?tagid=' + tag.tagID)
      .then(res => {
        this.showSnackbar('User ' + tag.user + ' is deleted!');
        this.fetchTags();
      }).catch(err => {
        this.showSnackbar('Could not delete user ' + tag.user);
      });
    
    this.closeDialog();
  }

  addUser = (user) => {
    axios.post(process.env.REACT_APP_API_URL + '/tags/add?tagid=' + user.tagID + "&name=" + user.name)
      .then(res => {
        this.showSnackbar('User ' + user.name + ' is added!');
        this.fetchTags();
      }).catch(err => {
        this.showSnackbar('Could not add user ' + user.name);
      });
  }

  render() {
    const deleteActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closeDialog}
      />,
      <FlatButton
        label="Delete user"
        primary={true}
        onClick={this.deleteUser}
      />,
    ];

    return (
      <div>
        <h2>Users</h2>
        <p>These users and their corresponding tags are authorized by Jarvis.</p>

        <List>
          {this.state.tags.map((tag, index) => 
            <ListItem
              key={index}
              onClick={() => { this.showDeleteDialog(index) }}
              leftAvatar={<Avatar icon={<Tag />} />}
              rightIcon={<Remove />}
              primaryText={tag.user}
              secondaryText={"Tag ID: " + tag.tagID}
            />
          )}
        </List>

        {this.state.tags.length === 0 &&
            <p>No users added. Click the button below and get started!</p>
        }
        

        <Dialog
          title={"Delete " + this.state.modal.tag.user + "?"}
          actions={deleteActions}
          modal={false}
          open={this.state.modal.open}
          onRequestClose={this.closeDialog}
        >
          The user {this.state.modal.tag.user} will not be able to arm/disarm the alarm system among other things. This cannot be undone.
        </Dialog>

        <AddUserDialog 
          onSubmit={this.addUser}
        />

        <SnackBar 
          data={this.state.snackbar}
        />
      </div>
    );
  }
}
