
import { useContext } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Context from './Context'
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircle from "@material-ui/icons/AccountCircle";
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStylesBis = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const useStyles = (theme) => ({
  header: {
    padding: theme.spacing(1),
    backgroundColor: '#122A42',
    flexShrink: 0,
  },
  headerlog: {
    padding: theme.spacing(4),
    backgroundColor: '#122A42',
    flexShrink: 0,
    textAlign: "center",
  },
  PowerSettingsNewIcon: {
    display: "right",
  },
  menu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    },
  },
})

export default ({
  drawerToggleListener
}) => {
  const history = useHistory()
  const styles = useStyles(useTheme())
  const classes = useStylesBis();
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible
  } = useContext(Context)
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (oauth) {
    return (
      <header css={styles.header}>
        <div className={classes.root}>
          <AppBar position="static" style={{ background: '#122A42' }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={drawerToggle}
                css={styles.menu}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                My Web App
              </Typography>
              {auth && (
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>My Email</MenuItem>
                    <MenuItem onClick={handleClose}>
                      {
                        oauth ?
                          <span>
                            {oauth.email}
                          </span>
                          :
                          <span>new user</span>
                      }
                    </MenuItem>
                  </Menu>
                </div>
              )}
              <Button color="inherit" onClick={onClickLogout}>Logout</Button>
            </Toolbar>
          </AppBar>
        </div>
      </header>
    );
  } else {
    return (
      <header css={styles.headerlog} >
       
          <Typography style={{ fontWeight: "bold", fontSize: 45, }}>Welcome on your Chat'App !</Typography>
        
      </header>
    );

  }


}
