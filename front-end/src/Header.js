import { useContext } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Context from './Context'
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircle from "@material-ui/icons/AccountCircle";
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Link from '@material-ui/core/Link'
import HomeIcon from '@material-ui/icons/Home';

const useStylesBis = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
    zIndex: '10'
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
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
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
              {/* <HomeIcon></HomeIcon> */}
              <Typography className={classes.title}>
                <Button href={`/'`}
                  onClick={(e) => {
                    e.preventDefault()
                    history.push(`/`)
                  }}>
                  Menu
                </Button>
              </Typography>
              {auth && (
                <div>
                  <IconButton
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
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>                
                            <MenuList
                            className={styles.dropmenu}
                              autoFocusItem={open}
                              id="menu-list-grow"
                              onKeyDown={handleListKeyDown}                           
                            >
                              <MenuItem onClick={handleClose}>Profile</MenuItem>
                              <MenuItem onClick={handleClose}>My account</MenuItem>
                              <MenuItem onClick={handleClose}>Logout</MenuItem>
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
