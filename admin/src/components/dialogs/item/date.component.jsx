import React, { useState, useEffect } from 'react'
import moment from 'moment-timezone'

import {
  Grid
} from '@material-ui/core'

import InfoContainer from '../../info-container/info-container.component'

const DateTab = ({ item }) => {
  const [dateInfo, setDateInfo] = useState([
    { label: 'Lần đầu khởi tạo', content: '' },
    { label: 'Cập nhật gần nhất', content: '' }
  ])

  useEffect(() => {
    if (item)
      setDateInfo([
        { label: 'Lần đầu khởi tạo', content: moment(item.createdAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY') },
        { label: 'Cập nhật gần nhất', content: moment(item.updatedAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY') }
      ])
  }, [item])

  return (
    <Grid container direction='column' spacing={1}>
      <Grid item>
        {dateInfo.map((info, index) => (
          <InfoContainer
            key={index}
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