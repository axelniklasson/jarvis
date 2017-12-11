import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Lamp from 'material-ui/svg-icons/action/lightbulb-outline';
import Device from 'material-ui/svg-icons/hardware/devices-other';

export default class DevicesComponent extends React.Component {
  render() {
    return (
      <div>
        <h2>Devices</h2>

        <List>
          <Subheader>Lamps</Subheader>

          <ListItem
            leftAvatar={<Avatar icon={<Lamp />} />}
            primaryText="Sänglampa"
            secondaryText="NEXA fjärrströmbrytare"
          />
      
          <ListItem
            leftAvatar={<Avatar icon={<Lamp />} />}
            primaryText="Sofflampa"
            secondaryText="NEXA fjärrströmbrytare"
          />

          <ListItem
            leftAvatar={<Avatar icon={<Lamp />} />}
            primaryText="Adventsljusstake"
            secondaryText="NEXA fjärrströmbrytare"
          />
        </List>

        <Divider />

        <List>
          <Subheader>Appliances</Subheader>

          <ListItem
            leftAvatar={<Avatar icon={<Device />} />}
            primaryText="Kaffebryggare"
            secondaryText="NEXA fjärrströmbrytare"
          />
        </List>
      </div>
    );
  }
}

