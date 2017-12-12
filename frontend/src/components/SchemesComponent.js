import React from 'react';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import TheaterSvg from 'material-ui/svg-icons/action/theaters';
import PowerSvg from 'material-ui/svg-icons/action/power-settings-new';
import MoonSvg from 'material-ui/svg-icons/image/brightness-3';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  }
};


export default class SchemesComponent extends React.Component {
  constructor(props) {
    super(props);

    // these schemes should be fetched from server and heavily cached
    this.state = {
      chipData: [
        { key: 0, label: 'Film', icon: 'theater' },
        { key: 1, label: 'Kväll', icon: 'moon' },
        { key: 2, label: 'Sova', icon: 'power' }
      ],
      selectedScheme: 0
    };
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick = (key) => {
    this.setState({ selectedScheme: key }); 
  }

  renderChip(data) {
    // Choose correct icon
    let icon;
    switch(data.icon) {
      case 'theater':
        icon = <TheaterSvg />
        break

      case 'moon':
        icon = <MoonSvg />
        break

      case 'power':
        icon = <PowerSvg />
        break

      default: 
        break
    }

    return ( 
      <Chip
        key={data.key}
        backgroundColor={this.state.selectedScheme === data.key ? '#C9C9C9' : '#E0E0E0'}
        onClick={() => {this.handleClick(data.key)}}
        style={styles.chip}
      >
        <Avatar color="#444" icon={icon} />
        {data.label}
      </Chip>
    )
  }

  render() {
    return (
      <div style={styles.wrapper}>
        {this.state.chipData.map(this.renderChip, this)}
      </div>
    )
  }
}
