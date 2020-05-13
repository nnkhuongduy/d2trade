import React from 'react'

import {
  Grid
} from '@material-ui/core'

import ConfigSwitch from './switch.component'

const Configs = ({ item, onChange }) => {

  return (
    <>
      {item &&
        <Grid container spacing={1} direction='column'>
          <Grid item>
            <ConfigSwitch
              label='Phân biệt Inscribed item'
              caption='Khi bật sẽ phân biệt item không có gem và item có gem. Dành cho những item đi kèm Kinetic Gem'
              name='isInscribed'
              value={item.configs.isInscribed}
              onChange={onChange}
            />
          </Grid>
        </Grid>
      }
    </>
  )
}

export default Configs