import { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import crypto from 'crypto'
import qs from 'qs'
import axios from 'axios'

/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import Link from '@material-ui/core/Link'
import { TextField, Grid, Button, Paper, FormControlLabel, Checkbox, InputBase } from '@material-ui/core';
import {
  withStyles,
} from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Face, Fingerprint } from '@material-ui/icons'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// Local
import Context from './Context'

import {
  useHistory
} from "react-router-dom";
import { red } from '@material-ui/core/colors';

const base64URLEncode = (str) => {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

const sha256 = (buffer) => {
  return crypto
    .createHash('sha256')
    .update(buffer)
    .digest()
}

const useStyles = (theme) => ({
  root: {
    flex: '1 1 auto',
    /* background: theme.palette.background.default, */
    backgroundColor: '#1C7EB8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
})

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
})(TextField);

const Redirect = ({
  config,
  codeVerifier,
}) => {
  const styles = useStyles(useTheme())
  const classes = useStyles(useTheme())
  const redirect = (e) => {
    e.stopPropagation()
    const code_challenge = base64URLEncode(sha256(codeVerifier))
    const url = [
      `${config.authorization_endpoint}?`,
      `client_id=${config.client_id}&`,
      `scope=${config.scope}&`,
      `response_type=code&`,
      `redirect_uri=${config.redirect_uri}&`,
      `code_challenge=${code_challenge}&`,
      `code_challenge_method=S256`,
    ].join('')
    window.location = url
  }
  return (
    <div css={styles.root}>
      <Router>
        <Paper className={classes.padding} style={{ backgroundColor: "#122A42", textAlign: "center", paddingTop: '20px', fontSize: '150%', fontWeight: "bold" }}>
          Sign In !
        <div className={classes.margin} style={{ marginLeft: '50px', marginRight: '50px', marginBottom: '20px', marginTop: '20px' }}>
            <Grid container spacing={3} alignItems="flex-end">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                {/* <TextField id="email" label="Email" type="email" required /> */}
                <CssTextField id="email" label="Email" type="email" required />
              </Grid>
            </Grid>
            <Grid container spacing={3} alignItems="flex-end">
              <Grid item>
                <Fingerprint />
              </Grid>
              <Grid item>
                {/* <TextField id="password" label="Password" type="password" required /> */}
                <CssTextField id="password" label="Password" type="password" required />
              </Grid>
            </Grid>
            <Grid container spacing={3} alignItems="flex-end" style={{ marginTop: '8px' }}>
              <Grid item>
                <FormControlLabel control={
                  <Checkbox
                    color="white"
                  />
                } label="Remember me" />
              </Grid>
            </Grid>
            <Grid container justify="center" style={{ marginTop: '20px', marginBottom: '10px', padding: '10px' }}>
              <Button type="submit" id="subscribe-submit" variant="outlined" color="white" style={{ textTransform: "none", marginRight: '10px' }}>Login</Button>
              <Button onClick={redirect} variant="outlined" color="white" style={{ textTransform: "none", marginLeft: '10px' }}>Login with OAuth</Button>
            </Grid>
            <Route exact path="/">
              <Grid item justify="center">
                <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="white">Create an account</Button>
              </Grid>
            </Route>
          </div>
        </Paper>
      </Router>
    </div>
  );
}

const Tokens = ({
  oauth
}) => {
  const { setOauth } = useContext(Context)
  const styles = useStyles(useTheme())
  const { id_token } = oauth
  const id_payload = id_token.split('.')[1]
  const { email } = JSON.parse(atob(id_payload))
  const logout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  return (
    <div css={styles.root}>
      Welcome {email} <Link onClick={logout} color="secondary">logout</Link>
    </div>
  )
}

export default ({
  onUser
}) => {
  const styles = useStyles(useTheme())
  const history = useHistory();
  // const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { oauth, setOauth } = useContext(Context)
  const config = {
    authorization_endpoint: 'http://127.0.0.1:5556/dex/auth',
    token_endpoint: 'http://127.0.0.1:5556/dex/token',
    client_id: 'webtech-frontend',
    redirect_uri: 'http://127.0.0.1:3000',
    scope: 'openid%20email%20offline_access',
  }
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  // is there a code query parameters in the url 
  if (!code) { // no: we are not being redirected from an oauth server
    if (!oauth) {
      const codeVerifier = base64URLEncode(crypto.randomBytes(32))
      setCookie('code_verifier', codeVerifier)
      return (
        <Redirect codeVerifier={codeVerifier} config={config} css={styles.root} />
      )
    } else { // yes: user is already logged in, great, is is working
      return (
        <Tokens oauth={oauth} css={styles.root} />
      )
    }
  } else { // yes: we are coming from an oauth server
    const codeVerifier = cookies.code_verifier
    useEffect(() => {
      const fetch = async () => {
        try {
          const { data } = await axios.post(
            config.token_endpoint
            , qs.stringify({
              grant_type: 'authorization_code',
              client_id: `${config.client_id}`,
              code_verifier: `${codeVerifier}`,
              redirect_uri: `${config.redirect_uri}`,
              code: `${code}`,
            }))
          removeCookie('code_verifier')
          setOauth(data)
          // window.location = '/'
          history.push('/')
        } catch (err) {
          console.error(err)
        }
      }
      fetch()
    })
    return (
      <div css={styles.root}>Loading tokens</div>
    )
  }
}

