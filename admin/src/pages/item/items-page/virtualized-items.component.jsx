import PropTypes from 'prop-types'
import React from 'react'

import {
  CellMeasurerCache, CellMeasurer, createMasonryCellPositioner, AutoSizer, Masonry
} from 'react-virtualized'

import { withStyles } from '@material-ui/styles'
import {
  Badge
} from '@material-ui/core'
import {
  CheckCircle, RadioButtonUnchecked
} from '@material-ui/icons'

import ItemCard from '../../../components/item/item-card/item-card.component'

const margin = 8

const styles = theme => ({
  root: {
    '&:focus': {
      outline: 'none'
    }
  },
  badge: {
    margin: margin
  }
})

class ItemsMasonry extends React.PureComponent {
  static propsTypes = {
    items: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    deleteState: PropTypes.bool,
    deleteItems: PropTypes.object,
    onDeleteClick: PropTypes.func,
    onItemClick: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this._columnCount = 0;

    this._cache = new CellMeasurerCache({
      defaultHeight: 215,
      defaultWidth: 200,
      fixedWidth: true
    })

    this.state = {
      gutterSize: 10,
      columnWidth: 200,
      overscanByPixels: 5,
      deleteState: this.props.deleteState,
      deleteItems: this.props.deleteItems,
      items: this.props.items
    }

    this._cellRenderer = this._cellRenderer.bind(this)
    this._onResize = this._onResize.bind(this)
    this._renderAutoSizer = this._renderAutoSizer.bind(this)
    this._renderMasonry = this._renderMasonry.bind(this)
    this._setMasonryRef = this._setMasonryRef.bind(this)
  }

  render() {
    const { height } = this.props

    let child = this._renderAutoSizer({ height })

    return (
      <>
        {child}
      </>
    )
  }

  componentDidUpdate() {

    this.setState((state, props) => ({
      deleteState: props.deleteState,
      deleteItems: props.deleteItems,
      items: props.items,
      // columnWidth: props.deleteItems.active ? 200 : 200 + margin,
    }))

    this._calculateColumnCount();
    this._resetCellPositioner();
    this._masonry.recomputeCellPositions()
  }

  _calculateColumnCount() {
    const { gutterSize, columnWidth } = this.state

    this._columnCount = Math.floor(this._width / (columnWidth + gutterSize))
  }

  _cellRenderer({ index, key, parent, style }) {
    const item = this.state.items[index]
    const { columnWidth, deleteState, deleteItems } = this.state
    const { classes, onDeleteClick, onItemClick } = this.props

    return (
      <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
        <div style={{
          ...style
        }}>
          {item && (deleteState ?
            <Badge
              badgeContent={
                deleteItems[item.name] ? <CheckCircle color='secondary' /> : <RadioButtonUnchecked color='secondary' />
              }
              classes={{ root: classes.badge }}
            ><ItemCard item={item} width={columnWidth} selectable onClick={item => onDeleteClick(item.name)} />
            </Badge> :
            <ItemCard item={item} width={columnWidth} selectable onClick={item => onItemClick(item)} />
          )}
        </div>
      </CellMeasurer>
    )
  }

  _initCellPositioner() {
    if (typeof this._cellPositioner === 'undefined') {
      const { gutterSize, columnWidth } = this.state

      this._cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: this._cache,
        columnCount: this._columnCount,
        columnWidth,
        spacer: gutterSize
      })
    }
  }

  _onResize({ width }) {
    this._width = width

    this._calculateColumnCount();
    this._resetCellPositioner();
    this._masonry.recomputeCellPositions()
  }

  _renderAutoSizer({ height, scrollTop }) {
    this._scrollTop = scrollTop
    this._height = height

    const { overscanByPixels } = this.state

    return (
      <AutoSizer
        disableHeight
        height={this._height}
        onResize={this._onResize}
        overscanByPixels={overscanByPixels}
        scrollTop={this._scrollTop}
      >
        {this._renderMasonry}
      </AutoSizer>
    )
  }

  _renderMasonry({ width }) {
    this._width = width

    this._calculateColumnCount()
    this._initCellPositioner()

    const { overscanByPixels, items } = this.state
    const { classes } = this.props

    return (
      <Masonry
        cellCount={items.length}
        cellMeasurerCache={this._cache}
        cellPositioner={this._cellPositioner}
        cellRenderer={this._cellRenderer}
        height={this._height}
        overscanByPixels={overscanByPixels}
        ref={this._setMasonryRef}
        scrollTop={this._scrollTop}
        width={width}
        className={classes.root}
      />
    )
  }

  _resetCellPositioner() {
    const { gutterSize, columnWidth } = this.state

    this._cellPositioner.reset({
      columnCount: this._columnCount,
      columnWidth,
      spacer: gutterSize
    })
  }

  _setMasonryRef(ref) {
    this._masonry = ref;
  }
}

export default withStyles(styles)(ItemsMasonry)