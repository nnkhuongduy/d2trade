import React, { useState, useEffect } from 'react'

import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ResultItem from './result-item.component'
import NameInput from './name-input.component'
import PriceInput from './price-input.component'
import HeroInput from './hero-input.component'
import RarityInput from './rarity-input.component'

import './new-item-box.component.scss'

const INITIAL_ITEM = {
  name: "",
  iconUrl: "",
  prices: {
    usd: 0,
    vnd: 0
  },
  hero: "",
  rarity: ""
}

const BlueCheckBox = withStyles({
  root: {
    color: blue['300'],
    '&$checked': {
      color: blue['A200']
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />)

const NewItemBox = ({ ...props }) => {

  const [currentItem, setCurrentItem] = useState(INITIAL_ITEM)
  const [enable, setEnable] = useState(true)

  useEffect(() => {
    console.log("CURRENT ITEM:")
    console.log(currentItem)
  }, [currentItem])

  return (
    <div className={'new-item-box'}>
      <ResultItem itemState={{ currentItem, setCurrentItem }} />
      <div className={'item-input'}>
        <NameInput itemState={{ currentItem, setCurrentItem }} />
        <PriceInput itemState={{ currentItem, setCurrentItem }} />
        <HeroInput itemState={{ currentItem, setCurrentItem }} />
        <RarityInput itemState={{ currentItem, setCurrentItem }} />
        <FormControlLabel
          control={<BlueCheckBox checked={enable} onChange={() => setEnable(state => !state)} name="enable" />}
          label="Enable Item"
        />
      </div>
    </div>
  )
}

export default NewItemBox