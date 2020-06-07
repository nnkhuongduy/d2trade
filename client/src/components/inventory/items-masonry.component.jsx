import React from 'react'

import { useTheme } from '@material-ui/styles'
import { useMediaQuery } from '@material-ui/core'

import ItemsMasonryClass from './virtualized-table.component'

const ItemsMasonry = ({ ...props }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <ItemsMasonryClass matches={matches} {...props} />
  )
}

export default ItemsMasonry