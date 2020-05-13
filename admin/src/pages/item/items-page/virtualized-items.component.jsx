import PropTypes from 'prop-types'
import React from 'react'

import {
  CellMeasurerCache, CellMeasurer, createMasonryCellPositioner, AutoSizer, Masonry
} from 'react-virtualized'

import ItemCard from '../../../components/item-card/item-card.component'

export default class ItemsMasonry extends React.PureComponent {
  static propsTypes = {
    items: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)

    this._columnCount = 0;

    this._cache = new CellMeasurerCache({
      defaultHeight: 215,
      defaultWidth: 150,
      fixedWidth: true
    })

    this.state = {
      gutterSize: 10,
      columnWidth: 200,
      overscanByPixels: 5,
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

  _calculateColumnCount() {
    const { gutterSize } = this.state
    const { columnWidth } = this.state

    this._columnCount = Math.floor(this._width / (columnWidth + gutterSize))
  }

  _cellRenderer({ index, key, parent, style }) {
    const item = this.props.items[index]
    const { columnWidth } = this.state

    return (
      <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
        <div style={{
          ...style
        }}>
          <ItemCard item={item} width={columnWidth} />
        </div>
      </CellMeasurer>
    )
  }

  _initCellPositioner() {
    if (typeof this._cellPositioner === 'undefined') {
      const { gutterSize } = this.state
      const { columnWidth } = this.state

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

    const { overscanByPixels } = this.state
    const { items } = this.props

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
      />
    )
  }

  _resetCellPositioner() {
    const { gutterSize } = this.state
    const { columnWidth } = this.state

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