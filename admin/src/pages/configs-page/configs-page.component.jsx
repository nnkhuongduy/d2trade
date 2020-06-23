import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import {
  Paper, Grid, Collapse, TextField, LinearProgress, IconButton, Button
} from '@material-ui/core'
import { Edit, Done, Refresh } from '@material-ui/icons'

import Confirmation from '../../components/dialogs/confirmation/confirmation.component'
import Toolbar from '../../components/toolbar/toolbar.component'
import PasswordDialog from './password-dialog.component'

import { fetchSiteConfigsStart, putSiteConfigStart } from '../../redux/site-configs/site-configs.actions'
import { updatePasswordStart } from '../../redux/admin/admin.actions'

import { selectSiteConfigs, selectHandling } from '../../redux/site-configs/site-configs.selectors'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(4),
    boxSizing: 'border-box'
  }
}))

const INITIAL_ROWS = [
  {
    label: 'Rate chuyển đơn vị tự động',
    data: 'currencyRate',
    value: 0,
    type: 'number',
    edit: false
  },
  {
    label: 'Tên tài khoản Adimn',
    data: 'adminName',
    value: '',
    type: 'text',
    edit: false
  }
]

const ConfigsPage = ({ configs, fetchConfigs, handling, putConfig, updatePassword }) => {
  const classes = useStyles()

  const [rows, setRows] = useState(INITIAL_ROWS)
  const [confirm, setConfirm] = useState(false)
  const [edit, setEdit] = useState(null)
  const [tools, setTools] = useState([
    {
      label: 'refresh',
      Icon: <Refresh />,
      func: () => { fetchConfigs() }
    }
  ])
  const [dialog, setDialog] = useState(false)

  useEffect(() => {
    if (!configs)
      fetchConfigs()
  }, [])

  useEffect(() => {
    if (configs)
      setRows(rows.map((row, index) => ({ ...row, value: configs[index].value })))
  }, [configs])

  const onChange = (index, value) => {
    const newRows = [...rows]

    newRows[index] = { ...newRows[index], value: value }
    setRows(newRows)
  }

  const onConfirm = () => {
    putConfig(edit)
  }

  const onEdit = index => {
    const newRows = [...rows]

    newRows[index].edit = !newRows[index].edit
    setRows(newRows)
  }

  const onSave = index => {
    const newRows = [...rows]

    newRows[index].edit = !newRows[index].edit
    setRows(newRows)

    if (rows[index].value !== configs[index].value) {
      setConfirm(true)
      setEdit({ name: rows[index].data, value: rows[index].value })
    }
  }

  return (
    <>
      <Grid container direction='column'>
        <Collapse in={handling}>
          <Grid item>
            <LinearProgress />
          </Grid>
        </Collapse>
        <Grid item style={{ alignSelf: 'flex-end' }}>
          <Toolbar tools={tools} onChange={tools => setTools(tools)} />
        </Grid>
        {configs &&
          <Grid item>
            <Grid container justify='center'>
              <Grid item xs={12} md={8}>
                <Paper className={classes.paper}>
                  <Grid container direction='column' spacing={1}>
                    {rows.map((row, index) => (
                      <Grid item key={index}>
                        <Grid container alignItems='center'>
                          <Grid item xs={4}>
                            {row.label}
                          </Grid>
                          <Grid item xs={1}>
                            :
                        </Grid>
                          <Grid item xs={6}>
                            {row.edit ?
                              <TextField
                                margin='none'
                                type={row.type}
                                size='small'
                                value={row.value}
                                onChange={e => onChange(index, e.target.value)}
                              />
                              :
                              row.value
                            }
                          </Grid>
                          <Grid item xs={1}>
                            {row.edit ?
                              <IconButton size='small' onClick={() => onSave(index)}>
                                <Done fontSize="small" />
                              </IconButton>
                              :
                              <IconButton size='small' onClick={() => onEdit(index)}>
                                <Edit fontSize="small" />
                              </IconButton>}
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                    <Grid item>
                      <Button variant='contained' color='secondary' onClick={() => setDialog(true)}>Đổi mật khẩu ADMIN</Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>}
      </Grid>
      <Confirmation
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={onConfirm}
      />
      <PasswordDialog
        open={dialog}
        onClose={() => setDialog(false)}
        onConfirm={password => updatePassword(password)}
      />
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchConfigs: () => dispatch(fetchSiteConfigsStart()),
  putConfig: config => dispatch(putSiteConfigStart(config)),
  updatePassword: password => dispatch(updatePasswordStart(password))
})

const mapStateToProps = createStructuredSelector({
  configs: selectSiteConfigs,
  handling: selectHandling
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfigsPage)