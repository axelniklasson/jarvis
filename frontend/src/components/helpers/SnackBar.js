import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class SnackBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: props.data.message,
      open: props.data.open,
      autoHide: 2000
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      message: nextProps.data.message,
      open: nextProps.data.open
    });  
  }

  openSnackbar = () => {
    this.setState({ open: true });
  }

  closeSnackbar = () => {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={this.state.autoHide}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}
