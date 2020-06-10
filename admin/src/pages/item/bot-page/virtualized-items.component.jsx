import React, { useCallback } from 'react';
import { AutoSizer, List } from 'react-virtualized';
import clsx from 'clsx'

import { makeStyles } from '@material-ui/styles'
import ItemList from '../../../components/item/item-list/item-list.component'

const useStyles = makeStyles(theme => ({
  root: {
    '&:focus': {
      outline: 'none'
    }
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  rowAvailable: {
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
    }
  },
  rowUnavailable: {
    backgroundColor: theme.palette.grey[400],
    '&:hover': {
      backgroundColor: theme.palette.grey[500],
    }
  }
}))

const ItemsList = ({ items, height, onClick }) => {
  const classes = useStyles()

  const rowRenderer = useCallback(({ index, key, style }) => (
    <div
      key={key}
      style={style}
      onClick={() => onClick(items[index])}
      className={clsx(classes.row, {
        [classes.rowAvailable]: items[index].available,
        [classes.rowUnavailable]: !items[index].available
      })}
    >
      <ItemList item={items[index]} />
    </div>
  ), [items])

  return (
    <div>
      <AutoSizer>
        {({ width }) => (
          <List
            height={height}
            overscanRowCount={10}
            rowCount={items.length}
            rowHeight={60}
            rowRenderer={rowRenderer}
            scrollToIndex={0}
            width={width}
            className={classes.root}
          />
        )}
      </AutoSizer>
    </div>
  )
}

export default ItemsList