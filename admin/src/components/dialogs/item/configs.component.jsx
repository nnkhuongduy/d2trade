import React from 'react'

import {
  Grid
} from '@material-ui/core'

import Switch from './switch.component'

const Configs = ({ item, onChange }) => {

  return (
    <>
      <Grid container spacing={1} direction='column'>
        <Grid item>
          <Switch
            label='Vô hiệu hóa item'
            caption='Tạm thời không sử dụng thông tin item này'
            name='isDisabled'
            value={item.configs.isDisabled}
            onChange={val => onChange({ ...item, configs: { ...item.configs, isDisabled: val } })}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Configs