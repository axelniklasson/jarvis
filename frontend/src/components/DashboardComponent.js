import React from 'react';
import SchemesComponent from './SchemesComponent';
import AlarmComponent from './AlarmComponent';
import ControlGridComponent from './ControlGridComponent';
import LampImage from './images/lamp.jpg';
import CoffeMachineImage from './images/coffemachine.png';

const styles = {
  top: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap"
  }
};

export default class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lamps: [], 
      appliances: []
    };
  }

  componentDidMount() {
    this.fetchLamps();
    this.fetchAppliances();
  }

  fetchLamps() {
    let lamps = [
      { key: 0, img: LampImage, title: 'Sänglampa' },
      { key: 1, img: LampImage, title: 'Sofflampa' },
      { key: 2, img: LampImage, title: 'Adventsljusstake' },
    ];

    this.setState({ lamps });
  }

  fetchAppliances() {
    let appliances = [
      { key: 0, img: CoffeMachineImage, title: 'Kaffebryggare' }
    ];

    this.setState({ appliances });
  }

  render = () => {
    return (
      <div>
        <h2>Dashboard</h2>

        <div style={styles.top} className="flex-container">
          <div>
            <h3>Apartment scheme</h3>
            <SchemesComponent />
          </div>

          <div>
            <h3>Alarm</h3>
            <AlarmComponent />
          </div>
        </div>

        <div style={styles.top} className="flex-container">
          <h3>Controls</h3>
          <ControlGridComponent title="Lamps" elements={this.state.lamps} />
          <ControlGridComponent title="Appliances" elements={this.state.appliances} />
        </div>
      </div>
    );
  }
}

