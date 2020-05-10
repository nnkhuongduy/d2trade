import React, { useState, useEffect } from 'react'

import {
  Grid, Typography, TextField, Divider
} from '@material-ui/core'

import HeroesSelector from '../../heroes-selector/heroes-selector.component'

const Info = ({ item, onChange }) => {
  const [name, setName] = useState()

  useEffect(() => {
    if (item) setName(item.name)
  }, [item])

  return (
    <Grid container spacing={1} direction='column'>
      <Grid item>
        <Divider />
      </Grid>
      <Grid item style={{ textAlign: 'center' }}>
        <Typography variant='h6'>Thông tin Item</Typography>
      </Grid>
      <Grid item>
        <form noValidate autoComplete='off'>
          <TextField label={'Tên Item'} InputLabelProps={{ shrink: item ? true : undefined }} value={name} disabled={Boolean(item)} variant='filled' size='small' />
        </form>
      </Grid>
      <Grid item>
        <Typography variant='body2'>Hero :</Typography>
        <HeroesSelector hero={item && item.hero} setHero={onChange} />
      </Grid>
    </Grid>
  )
}

export default Info