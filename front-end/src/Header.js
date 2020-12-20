import { useContext } from 'react'
import { Switch as SwitchRouter, useHistory } from 'react-router-dom';
import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Local
import { ManageAccount, ChannelModal } from './Dialogs1';
import Context from './Context'
// Layout
import { createMuiTheme, useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Dialog from '@material-ui/core/Dialog';
import { Switch } from '@material-ui/core';
// Icons
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStylesBis = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
    zIndex: '10'
  },
  appStyle: {
    background: theme.palette.primary.main,
  },
  title: {
    flexGrow: 1,
    color: "white"
  },
  menu: {
    color: "white"
  }
}));

const useStyles = (theme) => ({
  header: {
    padding: theme.spacing(1),
    background: theme.palette.primary.main,
    /* backgroundColor: '#122A42', */
    flexShrink: 0,
  },
  headerlog: {
    padding: theme.spacing(4),
    background: theme.palette.primary.main,
    /* backgroundColor: '#122A42', */
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
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [openChannel, setOpenChannel] = React.useState(false)
  const [openManageAccount, setOpenManageAccount] = React.useState(false)
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible,
    darkMode, setDarkMode
  } = useContext(Context)
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  const handleClickOpenManageAccount = () => {
    setOpenManageAccount(true);
  };
  const handleCloseManageAccount = () => {
    setOpenManageAccount(false);
  };
  const handleClickOpenChannel = () => {
    setOpenChannel(true);
  };
  const handleCloseChannel = () => {
    setOpenChannel(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  if (oauth) {
    return (
      <header css={styles.header}>
        <div className={classes.root}>
          <AppBar className={classes.appStyle} position="static">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={drawerToggle}
                css={styles.menu}
              >
                <MenuIcon />
              </IconButton>
              {/* <HomeIcon></HomeIcon> */}
              <Typography className={classes.title}>
                <Button
                  color="inherit"
                  href={`/'`}
                  onClick={(e) => {
                    e.preventDefault()
                    history.push(`/`)
                  }}>
                  Menu
                </Button>
              </Typography>
              <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              {auth && (
                <div>
                  <IconButton
                    color="inherit"
                    ref={anchorRef}
                    aria-controls={open ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                  >
                    <AccountCircle />
                  </IconButton>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom" ? "center top" : "center bottom"
                        }}
                      >
                        <Paper className={classes.menu} >
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              className={styles.dropmenu}
                              color="inherit"
                              css={styles.header}
                              autoFocusItem={open}
                              id="menu-list-grow"
                              onKeyDown={handleListKeyDown}
                            >
                              <MenuItem onClick={handleClickOpenChannel}>Create Channel</MenuItem>
                              <MenuItem onClick={handleClose}>Add Friends</MenuItem>
                              <MenuItem onClick={handleClickOpenManageAccount}>Manage Account</MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              )}
              <Button color="inherit" onClick={onClickLogout}>Logout</Button>
            </Toolbar>
          </AppBar>
        </div>
        <Dialog open={openManageAccount} onClose={handleCloseManageAccount} css={styles.icon}>
          <ManageAccount onChange={handleCloseManageAccount} />
        </Dialog>
        <Dialog open={openChannel} onClose={handleCloseChannel} css={styles.icon}>
          <ChannelModal onChange={handleCloseChannel} />
        </Dialog>
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
