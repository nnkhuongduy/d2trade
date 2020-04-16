import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import RarityFilterButton from '../rarity-filter-button/rarity-filter-button.component'

import { setRarityContainer } from '../../redux/rarity-filter/rarity-filter.actions'

import { selectRarityContainer } from '../../redux/rarity-filter/rarity-filter.selectors'

import './rarity-filter-box.component.scss'

const RarityFilterBox = ({ type, rarityContainer, setRarityContainer, ...props }) => {
  const rarityContainerRef = useRef(null)

  const componentStyles = {
    right: type === "bot" && "calc(100% + 20px)",
    left: type === "user" && "calc(100% + 20px)"
  }

  useEffect(() => {

    const clickOutsideHandle = e => {
      if (rarityContainerRef.current && !rarityContainerRef.current.contains(e.target) && !e.target.className.includes("btn-filter"))
        setRarityContainer(null)
    }

    document.addEventListener("mousedown", clickOutsideHandle)

    return () => {
      document.removeEventListener("mousedown", clickOutsideHandle)
    }

  }, [setRarityContainer])

  return (
    <div ref={rarityContainerRef} className="rarity-filter-box" style={componentStyles}>
      <RarityFilterButton type={type} rarityValue={'Mythical'}></RarityFilterButton>
      <RarityFilterButton type={type} rarityValue={'Immortal'}></RarityFilterButton>
      <RarityFilterButton type={type} rarityValue={'Arcana'}></RarityFilterButton>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setRarityContainer: type => dispatch(setRarityContainer(type))
})

const mapStateToProps = createStructuredSelector({
  rarityContainer: selectRarityContainer
})

export default connect(mapStateToProps, mapDispatchToProps)(RarityFilterBox)