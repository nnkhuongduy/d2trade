import React from 'react'

import {
  Grid
} from '@material-ui/core'

const InfoContainer = ({ itemsAlign = [3, 1, 8], info }) => {
  return (
    <Grid container alignItems='center'>
      <Grid item xs={itemsAlign[0]}>
        {info.label}
      </Grid>
      <Grid item xs={itemsAlign[1]}>
        :
      </Grid>
      <Grid item xs={itemsAlign[2]}>
        {info.content}
      </Grid>
    </Grid>
  )
}

export default InfoContainer