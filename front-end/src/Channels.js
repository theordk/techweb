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
import styled from 'styled-components';
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
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    width: 235,
    background: theme.palette.secondary.dark,
    marginLeft: theme.spacing(1),
    marginTop: 10,
  },
  paper: {
    marginRight: theme.spacing(0),
    padding: theme.spacing(0.1),
    display: "flex",
    backgroundColor: theme.palette.secondary.light,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  divider: {
    height: 28,
    margin: 4,
  },
  divider2: {
    background: theme.palette.secondary.dark,
    marginBottom: '5px'
  }
}));

/* const HoverPaper = styled.p`
	color: #000;
	:hover {
		color: #ed1212;
		cursor: pointer;
	}
` */

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
      <Divider classes={{root: classes.divider2}} variant="middle"></Divider>
      { channels.map((channel, i) => (
        <li key={i} css={styles.channel}>
          <Paper
            className={stylesBis.paper}
            href={`/channels/${channel.id}`}
            onClick={(e) => {
              e.preventDefault()
              history.push(`/channels/${channel.id}`)
            }}>
            <MenuList>
              <MenuItem>
                <div css={styles.channel}>
                  {channel.name}
                </div>
              </MenuItem>
            </MenuList>
          </Paper>
        </li>
      ))}
    </ul>
  );
}
