import React, { useState, useEffect } from 'react'

import {
  Grid
} from '@material-ui/core'

import InfoContainer from '../../info-container/info-container.component'

const DateTab = ({ item }) => {
  const [dateInfo, setDateInfo] = useState([
    { label: 'Lần đầu khởi tạo', value: 0 },
    { label: 'Cập nhật gần nhất', value: 0 }
  ])

  useEffect(() => {
    if (item)
      setDateInfo([
        { label: 'Lần đầu khởi tạo', value: item.createdAt, isDate: true },
        { label: 'Cập nhật gần nhất', value: item.updatedAt, isDate: true }
      ])
  }, [item])

  return (
    <Grid container direction='column' spacing={1}>
      <Grid item>
        {dateInfo.map(info => (
          <InfoContainer
            info={info}
            layout={[5, 1, 6]}
            styles={{ root: { fontSize: '0.9rem' }, value: { textAlign: 'right' } }}
          />
        ))}
      </Grid>
    </Grid>
  )
}

export default DateTab