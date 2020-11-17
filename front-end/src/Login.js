import {} from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = (theme) => ({
  root: {
    flex: '1 1 auto',
    //background: theme.palette.background.default,
    background: "#054c6e",
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& > div': {
      margin: `${theme.spacing(1)}`,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    '& fieldset': {
      border: 'none',
      '& label': {
        marginBottom: theme.spacing(.5),
        display: 'block',
      },
    },
    '& button': {
      border: 'none',
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(8),
    },
  },
})

export default ({
  onUser
}) => {
  const styles = useStyles(useTheme())
  const classes = useStyles(useTheme())
  return (
    <div css={styles.root}>
      <div backgroundColor = "red">
        <div className={classes.root}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField id="username" label="Username" name="username"/>
          </Grid>
        </Grid>
      </div>
        <div className={classes.root}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <VpnKeyIcon />
          </Grid>
          <Grid item>
            <TextField id="password" label="Password" name="password" type="password"/>
          </Grid>
        </Grid>
      </div>
      <div></div>
        <Button
        variant="contained"
        color="#05253D"
        className={classes.button}
        startIcon={<CheckCircleIcon />}
        style={{justifyContent: 'center'}}
        type="submit" value="login" onClick={ (e) => {
          e.stopPropagation()
          onUser({username: 'david'})
        }} 
      >Login</Button>
      </div>
    </div>
  );
}
