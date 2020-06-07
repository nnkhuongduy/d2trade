import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'

import {
  CellMeasurerCache, CellMeasurer, createMasonryCellPositioner, AutoSizer, Masonry
} from 'react-virtualized'

import { withStyles } from '@material-ui/styles'

import ItemCard from '../item/item-card.component'

import { selectBotStash, selectUserStash } from '../../redux/stash/stash.selectors'

const styles = theme => ({
  root: {
    '&:focus': {
      outline: 'none'
    }
  },
})

class ItemsMasonryClass extends React.PureComponent {
  static propsTypes = {
    items: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this._columnCount = 0;

    this._cache = new CellMeasurerCache({
      defaultHeight: 215,
      defaultWidth: 100,
      fixedWidth: true
    })

    this.state = {
      gutterSize: 10,
      columnWidth: this.props.matches ? 80 : 100,
      overscanByPixels: 5,
      items: this.props.items,
      matches: this.props.matches
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
      items: props.items,
      columnWidth: props.matches ? 80 : 100
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
    const { onItemClick, botStash, userStash } = this.props

    return (
      <Fragment key={key}>
        {item && <CellMeasurer cache={this._cache} index={index} parent={parent}>
          <div style={{
            ...style
          }}>

            <ItemCard
              item={item}
              selectable
              onClick={onItemClick}
              disabled={
                Boolean(botStash.filter(stashItem => stashItem.assetId === item.assetId).length) ||
                Boolean(userStash.filter(stashItem => stashItem.assetId === item.assetId).length)
              }
            />
          </div>
        </CellMeasurer>}
      </Fragment>
    )
  }

  _initCellPositioner() {
    if (typeof this._cellPositioner === 'undefined') {
      const { gutterSize, columnWidth } = this.state

      this._cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: this._cache,
        columnCount: this._columnCount,
        columnWidth: columnWidth,
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
      columnWidth: columnWidth,
      spacer: gutterSize
    })
  }

  _setMasonryRef(ref) {
    this._masonry = ref;
  }
}

const mapStateToProps = createStructuredSelector({
  botStash: selectBotStash,
  userStash: selectUserStash
})

export default compose(withStyles(styles), connect(mapStateToProps))(ItemsMasonryClass)