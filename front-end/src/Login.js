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
import Cookies from 'js-cookie';

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

const crypto = require('crypto');

const base64URLEncode = (str) => (
  str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
)
const sha256 = (buffer) => (
  crypto
    .createHash('sha256')
    .update(buffer)
    .digest()
)

var code_verifier
var code_challenge
var url

const handler = (authorization_endpoint, client_id, redirect_uri, scope) => (
  code_verifier = base64URLEncode(crypto.randomBytes(32)),
  code_challenge = base64URLEncode(sha256(code_verifier)),
  Cookies.set('verifier', code_verifier),
  url = new URL(authorization_endpoint+ "?client_id=" + client_id 
  + "&scope=" + scope
  + "&response_type=code&redirect_uri=" + redirect_uri 
  + "&code_challenge="+ code_challenge 
  + "&code_challenge_method=S256"),
  url.toString()
)

//var url = "https://www.google.com"
if (window.location.href === "http://localhost:3000/") {
  if (Cookies.get('credential' === null)) {
    handler("http://127.0.0.1:5556/dex/auth", "techweb", "http://localhost:3000/callback","openid")
  }
}
else{
  
}

export default ({
  onUser
}) => {
  const styles = useStyles(useTheme())
  const classes = useStyles(useTheme())
  return (
    <div css={styles.root}>
      <div backgroundColor = "red">
      <fieldset>
          <a href={url} >test </a>
      </fieldset>
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
