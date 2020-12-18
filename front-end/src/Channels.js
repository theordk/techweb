import { useContext, useEffect } from 'react';
import axios from 'axios';
//import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// Local
import Context from './Context'
import { useHistory } from 'react-router-dom'

const styles = {
   root: {
    color: "black"
   },
  channel: {
    padding: '.2rem .5rem',
    whiteSpace: 'nowrap',
    color: "black",
    //background: theme.palette.primary.main,
    /* backgroundColor: "blue" */
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 215,
    background: theme.palette.primary.main,
    marginLeft: theme.spacing(1),
    marginTop: 5,
  },
  Paper: {
    marginRight: theme.spacing(0.8),
    display: "flex",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default () => {
  const stylesBis = useStyles(useTheme())
  const {
    oauth,
    channels, setChannels,
    classes = useStyles()
  } = useContext(Context)
  const history = useHistory();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: channels } = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          },
          params: {
            user: `${oauth.email}`
          },
        })
        setChannels(channels)
      } catch (err) {
        console.error(err)
      }
    }
    fetch()
  }, [oauth, setChannels])
  return (
    <ul style={styles.root}>
      <Paper component="form" className={stylesBis.root}>
        <InputBase  
          className={stylesBis.input}
          placeholder="Search Channel"
          inputProps={{ "aria-label": "search channel" }}
        />
        <IconButton
          type="submit"
          className={stylesBis.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
        <Divider className={stylesBis.divider} orientation="vertical" />
      </Paper>
      { channels.map((channel, i) => (
        <li key={i} css={styles.channel}>
          {/* <div className={classes.root}> */}
          <Paper className={stylesBis.paper}>
            <MenuList>
              <MenuItem href={`/channels/${channel.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  history.push(`/channels/${channel.id}`)
                }}
              >
                <div css={styles.channel}>
                  {channel.name}
                </div>
              </MenuItem>
            </MenuList>
          </Paper>
          {/* </div> */}
        </li>
      ))}
    </ul>
  );
}
