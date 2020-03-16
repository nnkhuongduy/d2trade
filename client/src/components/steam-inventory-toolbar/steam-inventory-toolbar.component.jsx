import React from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import magnifyIcon from '@iconify/icons-mdi/magnify';
import sortIcon from '@iconify/icons-dashicons/sort';
import bxRefresh from '@iconify/icons-bx/bx-refresh';

import './steam-inventory-toolbar.component.scss';

class SteamInventoryToolbar extends React.Component {
  constructor() {
    super();
    this.state = {
      initialValue: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({ initialValue: e.target.value });
  }

  render() {
    return (
      <div className="steam-inven-toolbar">
        <div className="searchbar">
          <div>
            <Icon icon={magnifyIcon} width="1.5em" height="1.5em" />
          </div>
          <input type="text" value={this.state.initialValue} onChange={this.handleInputChange} placeholder="Search" />
        </div>
        <div className="tool-section">
          <div>
            <Icon icon={sortIcon} width="3em" height="3em" />
          </div>
          <div>
            <Icon icon={bxRefresh} width="3em" height="3em" />
          </div>
        </div>
      </div>
    )
  }
}

export default SteamInventoryToolbar;