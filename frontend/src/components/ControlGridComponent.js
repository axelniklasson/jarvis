import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import PowerSvg from 'material-ui/svg-icons/action/power-settings-new';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

export default class ControlsComponent extends React.Component {

  handleClick = (key) => {
    // actually toggle the socket
  }

  render() {
    return (
      <div>
        <h4>{this.props.title}</h4>
        <div style={styles.root}>
          <GridList style={styles.gridList} cols={2.2}>
          {this.props.elements.map((el) => (
            <GridTile
              key={el.key}
              onClick={() => {this.handleClick(el.key)}}
              title={el.title}
              actionIcon={<IconButton><PowerSvg color="white" /></IconButton>}
              titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
              <img alt="lamp" src={el.img} />
            </GridTile>
          ))}
          </GridList>
        </div>
      </div>
    );
  }
}

