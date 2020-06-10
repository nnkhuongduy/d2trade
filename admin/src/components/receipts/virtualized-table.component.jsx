import React, { PureComponent } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/styles'
import {
  TableCell, TableSortLabel, Avatar
} from '@material-ui/core'

import { AutoSizer, Column, Table } from 'react-virtualized'

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
    },
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
        {cellData}
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
        <div style={{ fontSize: '0.75rem', textAlign: 'center' }}>
          {sortable ? <TableSortLabel active={activeSort} onClick={onSortClick(columnIndex)} direction={direction}>
            {label}
          </TableSortLabel> : label}
        </div>
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
  classes: PropTypes.object,
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