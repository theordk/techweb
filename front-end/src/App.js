import { useContext, useState } from 'react'
import { green } from "@material-ui/core/colors";
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Local
import Oups from './Oups'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Login from './Login'
import Context from './Context'

// Rooter
import {
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom"

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors'



const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
}

export default () => {
  const location = useLocation()
  const {oauth} = useContext(Context)
  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false)
  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible)
  }
  return (
    <div className="App" css={styles.root}>
      <Header drawerToggleListener={drawerToggleListener}/>
      <Switch>
        <Route exact path="/">
          {
            oauth ? (
              <Redirect
                to={{
                  pathname: "/channels",
                  state: { from: location }
                }}
              />
            ) : (
              <Login />
            )
          }
        </Route>
        <Route path="/channels">
          {
            oauth ? (
              <Main />
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: location }
                }}
              />
            )
          }
        </Route>
        <Route path="/Oups">
          <Oups />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}
