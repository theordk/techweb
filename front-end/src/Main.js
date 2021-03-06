import {useContext} from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Drawer from '@material-ui/core/Drawer';
// Local
import Context from './Context'
import Channels from './Channels'
import Channel from './Channel'
import Welcome from './Welcome'
import {
  Route,
  Switch,
} from 'react-router-dom'

const useStyles = (theme) => ({
  root: {
    background: theme.palette.secondary.dark,
    overflow: 'hidden',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  drawer: {
    width: '260px',
    display: 'none',
  },
  drawerVisible: {
    display: 'block',
  },
})

const useStylesBis = makeStyles((theme) => ({
  paper: {
    background: theme.palette.primary.main,
  },
}));

export default () => {
  const {
    currentChannel,
    drawerVisible,
  } = useContext(Context)
  const theme = useTheme()
  const styles = useStyles(theme)
  const classes = useStylesBis(theme)
  const alwaysOpen = useMediaQuery(theme.breakpoints.up('sm'))
  const isDrawerVisible = alwaysOpen || drawerVisible
  return (
    <main css={styles.root}>
      <Drawer
        PaperProps={{ style: { position: 'relative' } }}
        BackdropProps={{ style: { position: 'relative' } }}
        ModalProps={{
          style: { position: 'relative' }
        }}
        variant="persistent"
        open={isDrawerVisible}
        css={[styles.drawer, isDrawerVisible && styles.drawerVisible]}
        classes={{ paper: classes.paper }}
      >
        <Channels />
      </Drawer>
      <Switch>
        <Route path="/channels/:id">
          <Channel />
        </Route>
        <Route path="/">
          <Welcome />
        </Route>
      </Switch>
    </main>
  );
}
