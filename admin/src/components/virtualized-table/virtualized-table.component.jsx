import React, { PureComponent } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/styles'
import {
  TableCell, TableSortLabel, Grid, IconButton
} from '@material-ui/core'
import { Add, Edit, Launch } from '@material-ui/icons'

import { AutoSizer, Column, Table } from 'react-virtualized'

import UserAvatar from '../user/user-avatar/user-avatar.component'

const styles = theme => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box'
  },
  table: {
    '& .ReactVirtualized_Table_headerRow': {
      flip: false,
      paddingRight: theme.direction === 'rtl' ? '0px !important' : undefined,
    }
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
  span: {
    ...theme.spanEffect
  },
})

class VirtualizedTable extends PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48
  }

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null
    })
  }

  cellRenderer = ({ dataKey, rowData, cellData }) => {
    const { classes, rowHeight, onRowClick } = this.props

    return (
      <TableCell
        component='div'
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null
        })}
        variant='body'
        style={{ height: rowHeight }}
      >
        {dataKey === 'personaname' &&
          <UserAvatar user={rowData} />
        }
        {dataKey === 'accountBalance' && parseInt(cellData).toLocaleString('en-US')}
        {dataKey === 'lastLogin' && moment(cellData).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY hh:mm:ss A')}
        {dataKey === 'actions' && <Grid container spacing={1} alignItems='center'>
          <Grid item>
            <IconButton size='small' onClick={() => rowData.onAddClick(rowData)}>
              <Add />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton size='small' onClick={() => rowData.onSetClick(rowData)}>
              <Edit fontSize='small' style={{ padding: '2px' }} />
            </IconButton>
          </Grid>
        </Grid>}
        {dataKey === 'more' && <IconButton size='small' component={Link} to={`users/${rowData.steamid}`}>
          <Launch fontSize='small' style={{ padding: '4px' }} />
        </IconButton>}
        {dataKey !== 'accountBalance' && dataKey !== 'lastLogin' && dataKey !== 'actions' && dataKey !== 'more'
          && (dataKey === 'personaname' ? <Link to={`users/${rowData.steamid}`}><span className={classes.span}>{cellData}</span></Link> : cellData)
        }
      </TableCell>
    )
  }

  headerRender = ({ columnData: { sortable, direction, onSortClick, activeSort }, label, columnIndex }) => {
    const { headerHeight, classes } = this.props

    return (
      <TableCell
        component='div'
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant='head'
        style={{ height: headerHeight }}
      >
        {sortable ? <TableSortLabel active={activeSort} onClick={onSortClick(columnIndex)} direction={direction}>
          {label}
        </TableSortLabel> : label}
      </TableCell>
    )
  }

  render() {
    const { classes, columns, rowHeight, headerHeight, onSortClick, ...tableProps } = this.props

    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit'
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, widthPerc, sortable, direction, activeSort, ...other }, index) => (
              <Column
                key={dataKey}
                headerRenderer={(headerProps) =>
                  this.headerRender({
                    ...headerProps,
                    columnIndex: index
                  })
                }
                className={classes.flexContainer}
                cellRenderer={this.cellRenderer}
                dataKey={dataKey}
                width={width / 100 * widthPerc}
                columnData={{
                  sortable: sortable,
                  direction: direction,
                  onSortClick: onSortClick,
                  activeSort: activeSort
                }}
                {...other}
              />
            ))}
          </Table>
        )}
      </AutoSizer>
    )
  }
}

VirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      widthPerc: PropTypes.number.isRequired,
      sortable: PropTypes.bool.isRequired,
      direction: PropTypes.string,
      activeSort: PropTypes.bool
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
  onSortClick: PropTypes.func,
};

export default withStyles(styles)(VirtualizedTable)