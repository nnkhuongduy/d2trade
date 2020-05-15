import React, { useEffect, useState } from 'react'

import {
  Grid
} from '@material-ui/core'

import Switch from './switch.component'

const Configs = ({ item, onChange }) => {
  const [inscribed, setInscribed] = useState(false)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    setInscribed(item.configs.isInscribed)
    setDisabled(item.configs.isDisabled)
  }, [item])

  useEffect(() => {
    onChange({ ...item, configs: { ...item.configs, isInscribed: inscribed, isDisabled: disabled } })
  }, [inscribed, disabled])

  return (
    <>
      <Grid container spacing={1} direction='column'>
        <Grid item>
          <Switch
            label='Phân biệt Inscribed item'
            caption='Khi bật sẽ phân biệt item không có gem và item có gem. Dành cho những item đi kèm Kinetic Gem'
            name='isInscribed'
            value={inscribed}
            onChange={val => setInscribed(val)}
          />
        </Grid>
        <Grid item>
          <Switch
            label='Vô hiệu hóa item'
            caption='Tạm thời không sử dụng thông tin item này'
            name='isDisabled'
            value={disabled}
            onChange={val => setDisabled(val)}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Configs