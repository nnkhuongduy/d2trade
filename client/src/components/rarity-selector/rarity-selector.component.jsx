import React, { useState } from 'react'

import { useTheme } from '@material-ui/styles'
import {
  Menu, MenuItem, Button
} from '@material-ui/core'

const RaritySelector = ({ rarity, setRarity }) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const rarityClick = rarity => () => {
    setRarity(rarity)
    handleClose()
  }

  return (
    <>
      <Button
        aria-controls="rarity-menu"
        aria-haspopup="true"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        style={{ color: rarity && theme.palette.item[rarity.toLowerCase()] }}
      >
        {rarity ? rarity : 'Rarity'}
      </Button>
      <Menu
        id='rarity-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={rarityClick('Immortal')}>Immortal</MenuItem>
        <MenuItem onClick={rarityClick('Arcana')}>Arcana</MenuItem>
      </Menu>
    </>
  )
}

export default RaritySelector