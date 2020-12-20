import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState, useContext} from 'react'
import { useHistory } from 'react-router-dom'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Tooltip, Typography } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Button, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
// Markdown
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
import Divider from '@material-ui/core/Divider';
// Time
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import updateLocale from 'dayjs/plugin/updateLocale'
/* import LocalizedFormat from 'dayjs/plugin/LocalizedFormat' */
import axios from 'axios';
import Context from './../Context'
import Dialog from '@material-ui/core/Dialog';

var LocalizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(LocalizedFormat)

dayjs.extend(calendar)
/* dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  calendar: {
    sameElse: 'DD/MM/YYYY hh:mm A'
  }
}) */


const useStylesBis = makeStyles((theme) => ({
  root: {
    alignContent: 'center',
    alignItems: 'center',
    //width:'18%',
    margin: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  paperstyle: {
    background: theme.palette.primary.main,
    border: '1px solid white',
    textAlign: "center",
    padding: '20px',
    fontSize: '150%',
    fontWeight: "bold",
    color: "white",
  },
  input: {
    color: "white"
  }
}));

const useStyles = (theme) => ({
  root: {
    position: 'relative',
    marginleft: '10px',
    flex: '1 1 auto',
    'pre': {

      overflowY: 'auto',
    },
    '& ul': {
      'margin': 0,
      'padding': 0,
      'textIndent': 0,
      'listStyleType': 0,
    },
  },
  message: {
    padding: '.2rem .5rem',
    '& button': {
      'display': 'none'
    },
    ':hover': {
      backgroundColor: 'rgba(255,255,255,.05)',
      '& button': {
        'display': 'block'
      }
    },
  },
  fabWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50px',
  },
  fab: {
    position: 'fixed !important',
    top: 0,
    width: '50px',
  },
  title: {
    marginLeft: '10px',
    /*  position: "fixed", */
  },
  icons: {
    display: "flex",
    float: "right"
  },
  buttons: {
    display: "flex",
  },
  margin: {
    marginLeft: '50px',
    marginRight: '50px',
    marginBottom: '20px',
    marginTop: '20px',
  }
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
  error: {},
})(TextField);

export default forwardRef(({
  channel,
  messages,
  onScrollDown,
  fetchMessages
}, ref) => {
  const history = useHistory()
  const { oauth, setChannels } = useContext(Context)
  const [newMessage, setNewMessage] = useState('')
  const [openUpdate, setOpenUpdate] = useState({})
  const [admins, setAdmins] = useState('')
  const [openAdmin, setOpenAdmin] = useState(false)

  const [friends, setFriends] = useState('')
  const [openFriends, setOpenFriends] = useState(false)

  const [name, setName] = useState('')
  const [openName, setOpenName] = useState(false)

  const [openDelete, setOpenDelete] = useState(false)

  const addAdmins = async (e) => {
    e.preventDefault()
    let listWithoutSpaces = admins.replace(/ /g, '')
    const adminsList = listWithoutSpaces.split(',')
    let finalAdminsList = adminsList.concat(channel.chanAdmin)

    await axios.put(`http://localhost:3001/channels/${channel.id}`, {
      name: `${channel.name}`,
      list: `${channel.list}`,
      chanAdmin: `${finalAdminsList}`,     
    }, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      },
    })
    
    setOpenAdmin(false)
  }


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


  const addFriends = async (e) => {
    e.preventDefault()
    let listWithoutSpaces = friends.replace(/ /g, '')
    const friendsList = listWithoutSpaces.split(',')
    let finalFriendsList = friendsList.concat(channel.list)

    await axios.put(`http://localhost:3001/channels/${channel.id}`, {
      name: `${channel.name}`,
      list: `${finalFriendsList}`,
      chanAdmin: `${channel.chanAdmin}`,     
    }, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      },
    })
    
    setOpenFriends(false)
  }

  const newName = async (e) => {
    e.preventDefault()

    await axios.put(`http://localhost:3001/channels/${channel.id}`, {
      name: `${name}`,
      list: `${channel.list}`,
      chanAdmin: `${channel.chanAdmin}`,     
    }, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      },
    })
    
    setOpenName(false)
    fetch()
    
  }


  const deleteChannel = async (e) => {
    e.preventDefault()

    await axios.delete(`http://localhost:3001/channels/${channel.id}`,{
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      },
    })
    fetch()
    history.push('/channels')
    
    
  }


  
  
  const handleClickOpenUpdate = (i) => {
    setOpenUpdate(prev => Boolean(!prev[i]) ? { ...prev, [i]: true } : { ...prev, [i]: false })
  }
  const handleCloseUpdate = () => {
    setOpenUpdate(false)
  };
  const handleSubmit = async (creation, channelId) => {
    updateMessage(creation, channelId)
    handleCloseUpdate()
    fetchMessages()
  }
  const deleteMessage = async (message, channelId) => {
    await axios.delete(`http://localhost:3001/channels/${channelId}/messages`, {
      params: {
        channelId: `${channelId}`,
        messageCreation: `${message}`
      },
    })
    fetchMessages()
  }
  const updateMessage = async (creation, channelId) => {
    await axios.delete(`http://localhost:3001/channels/${channelId}/messages`, {
      params: {
        channelId: `${channelId}`,
        messageCreation: `${creation}`
      },
    })
    const { data: message } = await axios.post(
      `http://localhost:3001/channels/${channel.id}/messages`
      , {
        content: newMessage,
        author: `${oauth.email}`,
        creation: `${creation}`
      })
    fetchMessages()
  }

  const styles = useStyles(useTheme())
  const classes = useStylesBis();
  // Expose the `scroll` action
  useImperativeHandle(ref, () => ({
    scroll: scroll
  }));
  const rootEl = useRef(null)
  const scrollEl = useRef(null)
  const scroll = () => {
    scrollEl.current.scrollIntoView()
  }
  // See https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
  const throttleTimeout = useRef(null) // react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const rootNode = rootEl.current // react-hooks/exhaustive-deps
    const handleScroll = () => {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null
          const { scrollTop, offsetHeight, scrollHeight } = rootNode // react-hooks/exhaustive-deps
          onScrollDown(scrollTop + offsetHeight < scrollHeight)
        }, 200)
      }
    }
    handleScroll()
    rootNode.addEventListener('scroll', handleScroll)

    return () => rootNode.removeEventListener('scroll', handleScroll)
  })
  return (

    <div css={styles.root} ref={rootEl}>
      <h1 css={styles.title}>Messages for {channel.name}</h1>
      {channel.chanAdmin.includes(`${oauth.email}`) ? 
      <div>
      <button onClick={() => setOpenName(true)}>change name</button>
      <button onClick={() => setOpenAdmin(true)}> add admins </button>
      <button onClick={() => setOpenDelete(true)}>Delete Channel</button>

      <Dialog open={openAdmin} onClose={() => setOpenAdmin(false)}>
        <form onSubmit={addAdmins}>
          <input type="text" onChange={(event) => setAdmins(event.target.value)}/>
          <button type="submit">Confirm</button>
        </form>
      </Dialog>
      <Dialog open={openFriends} onClose={() => setOpenFriends(false)}>
        <form onSubmit={addFriends}>
          <input type="text" onChange={(event) => setFriends(event.target.value)}/>
          <button type="submit">Confirm</button>
        </form>
      </Dialog>
      <Dialog open={openName} onClose={() => setOpenName(false)}>
        <form onSubmit={newName}>
          <input type="text" onChange={(event) => setName(event.target.value)}/>
          <button type="submit">Confirm</button>
        </form>
      </Dialog>
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <form onSubmit={deleteChannel}>
          <p>Are you sure you want to delete this channel ?</p>
          <button type="submit">Confirm</button>
        </form>
      </Dialog>
      </div>
      : null
      }
      <button onClick={() => setOpenFriends(true)}>add users</button>
      <div>
        <ul>
          {messages.map((message, i) => {
            const { contents: content } = unified()
              .use(markdown)
              .use(remark2rehype)
              .use(html)
              .processSync(message.content)
            return (
              <li key={i} css={styles.message}  >
                {`${oauth.email}` === message.author ?
                  <div>
                    <Dialog open={openUpdate[i]} onClose={(i) => handleCloseUpdate} css={styles.icon}>
                      <Paper className={classes.paperstyle}>
                        Modify your message
                      <div css={styles.margin}>
                          <form autoComplete="off" onSubmit={() => handleSubmit(message.creation, message.channelId)}>
                            <Box className={classes.root}>
                              <CssTextField
                                className={classes.margin}
                                label="New Message"
                                variant="outlined"
                                id="custom-css-outlined-input"
                                color="inherit"
                                InputProps={{
                                  classes: {
                                    input: classes.input,
                                  },
                                  inputMode: "numeric"
                                }}
                                InputLabelProps={{
                                  style: { color: '#fff' },
                                }}
                                onChange={(event) => setNewMessage(event.target.value)}
                              />
                            </Box>
                            <div css={styles.buttons}>
                              <Box className={classes.root}>
                                <Button type="button" color="inherit" onClick={handleCloseUpdate}>Cancel</Button>
                              </Box>
                              <Box className={classes.root}>
                                <Button type="submit" color="inherit">Update Message</Button>
                              </Box>
                            </div>
                          </form>
                        </div>
                      </Paper>
                    </Dialog>
                  </div>
                  : null
                }
                <p>
                  <div css={styles.icons} >
                    <Tooltip title="Delete">
                      <IconButton
                        aria-label="delete"
                        color="inherit"
                        onClick={() => deleteMessage(message.creation, message.channelId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        aria-label="edit"
                        color="inherit"
                        onClick={() => handleClickOpenUpdate(i)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <span>{message.author}</span>
                  {' - '}
                  <span>{dayjs.unix(parseInt(message.creation)/1000000).format('LLLL')}</span>
                </p>
                <div dangerouslySetInnerHTML={{ __html: content }}>
                </div>
              </li>
            )
          })}
        </ul>
        <div ref={scrollEl} />
      </div>
    </div>


  )
})
