import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import magnifyIcon from '@iconify/icons-mdi/magnify';
import sortIcon from '@iconify/icons-dashicons/sort';
import bxRefresh from '@iconify/icons-bx/bx-refresh';

import './steam-inventory-toolbar.component.scss';

const SteamInventoryToolbar = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  }


  return (
    <div className="steam-inven-toolbar">
      <div className="searchbar">
        <div>
          <Icon icon={magnifyIcon} width="1.5em" height="1.5em" />
        </div>
        <input type="text" value={searchValue} onChange={handleInputChange} placeholder="Search" />
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

export default SteamInventoryToolbar;