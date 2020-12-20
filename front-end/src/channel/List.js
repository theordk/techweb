import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Local
import Context from './../Context'
// Layout
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import { Tooltip, TextField, Button, Paper, Box, Dialog } from '@material-ui/core';
// import Icon from "@material-ui/core/Icon"
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// Markdown
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
// Time
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
var LocalizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(LocalizedFormat)
dayjs.extend(calendar)

const useStylesUI = makeStyles((theme) => ({
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
  },
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
  },
  icons: {
    display: "flex",
    float: "right"
  },
  iconsBis: {
    display: "flex",
    float: "right",
    position: "relative"
  },
  buttons: {
    display: "flex",
  },
  buttonsChoice: {
    display: "flex",
    marginLeft: '20px'
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
  const styles = useStyles(useTheme())
  const classes = useStylesUI();
  const history = useHistory()
  const { oauth, setChannels } = useContext(Context)
  const [newMessage, setNewMessage] = useState('')
  const [openUpdate, setOpenUpdate] = useState({})
  const [admins, setAdmins] = useState('')
  const [openAdmin, setOpenAdmin] = useState(false)
  const [chanUsers, setChanUsers] = useState('')
  const [friends, setFriends] = useState('')
  const [openFriends, setOpenFriends] = useState(false)
  const [name, setName] = useState('')
  const [openName, setOpenName] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

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
      setChanUsers(toString(channel.list).replace(/,/g, ' - '))
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
    fetch()
    let chanU = listWithoutSpaces + "," + channel.list
    chanU = chanU.replace(/,/g, ' - ')
    setChanUsers(chanU)
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
    await axios.delete(`http://localhost:3001/channels/${channel.id}`, {
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

  return (
    <div css={styles.root} ref={rootEl}>
      {channel.chanAdmin.includes(`${oauth.email}`) ?
        <div>
          <h1 css={styles.title}>Messages for {channel.name}
            <div css={styles.iconsBis}>
              <Tooltip title="Rename Channel">
                <IconButton
                  aria-label="Rename Channel"
                  color="inherit"
                  onClick={() => setOpenName(true)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Admin">
                <IconButton
                  aria-label="Add Admin"
                  color="inherit"
                  onClick={() => setOpenAdmin(true)}
                >
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Channel">
                <IconButton
                  aria-label="Delete Channel"
                  color="inherit"
                  onClick={() => setOpenDelete(true)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <div css={styles.iconsBis} >
                <Tooltip title="Add Users">
                  <IconButton
                    aria-label="Add Users"
                    color="inherit"
                    onClick={() => setOpenFriends(true)}
                  >
                    <GroupAddIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </h1>
          <p css={styles.title}>Users : {channel.list.replace(/,/g, ' - ')}</p>
        </div>
        :
        <div>
          <h1 css={styles.title}>Messages for {channel.name}
            <div css={styles.iconsBis} >
              <Tooltip title="Add Users">
                <IconButton
                  aria-label="Add Users"
                  color="inherit"
                  onClick={() => setOpenFriends(true)}
                >
                  <GroupAddIcon />
                </IconButton>
              </Tooltip>
            </div>
          </h1>
          <p css={styles.title}>Users : {channel.list.replace(/,/g, ' - ')}</p>
        </div>
      }
      <Dialog open={openAdmin} onClose={() => setOpenAdmin(false)} css={styles.icon}>
        <Paper className={classes.paperstyle}>
          Add Admins
          <div css={styles.margin}>
            <form autoComplete="off" onSubmit={addAdmins}>
              <Box className={classes.root}>
                <CssTextField
                  className={classes.margin}
                  label="Name A, Name B, ..."
                  type="text"
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
                  onChange={(event) => setAdmins(event.target.value)}
                />
              </Box>
              <div css={styles.buttons}>
                <Box className={classes.root}>
                  <Button type="button" color="inherit" onClick={() => setOpenAdmin(false)}>Cancel</Button>
                </Box>
                <Box className={classes.root}>
                  <Button type="submit" color="inherit">Confirm</Button>
                </Box>
              </div>
            </form>
          </div>
        </Paper>
      </Dialog>
      <Dialog open={openFriends} onClose={() => setOpenFriends(false)} css={styles.icon}>
        <Paper className={classes.paperstyle}>
          Add Friends
          <div css={styles.margin}>
            <form autoComplete="off" onSubmit={addFriends}>
              <Box className={classes.root}>
                <CssTextField
                  className={classes.margin}
                  label="Name A, Name B, ..."
                  type="text"
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
                  onChange={(event) => setFriends(event.target.value)}
                />
              </Box>
              <div css={styles.buttons}>
                <Box className={classes.root}>
                  <Button type="button" color="inherit" onClick={() => setOpenFriends(false)} >Cancel</Button>
                </Box>
                <Box className={classes.root}>
                  <Button type="submit" color="inherit">Confirm</Button>
                </Box>
              </div>
            </form>
          </div>
        </Paper>
      </Dialog>
      <Dialog open={openName} onClose={() => setOpenName(false)} css={styles.icon}>
        <Paper className={classes.paperstyle}>
          Change channel's name
          <div css={styles.margin}>
            <form autoComplete="off" onSubmit={newName}>
              <Box className={classes.root}>
                <CssTextField
                  className={classes.margin}
                  label="New name"
                  type="text"
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
                  onChange={(event) => setName(event.target.value)}
                />
              </Box>
              <div css={styles.buttons}>
                <Box className={classes.root}>
                  <Button type="button" color="inherit" onClick={() => setOpenName(false)}>Cancel</Button>
                </Box>
                <Box className={classes.root}>
                  <Button type="submit" color="inherit">Confirm</Button>
                </Box>
              </div>
            </form>
          </div>
        </Paper>
      </Dialog>
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)} css={styles.icon}>
        <Paper className={classes.paperstyle}>
          Delete the channel
          <div css={styles.margin}>
            <form autoComplete="off" onSubmit={deleteChannel}>
              <div css={styles.buttons}>
                <Box className={classes.root}>
                  <Button type="button" color="inherit" onClick={() => setOpenDelete(false)}>Cancel</Button>
                </Box>
                <Box className={classes.root}>
                  <Button type="submit" color="inherit">Confirm</Button>
                </Box>
              </div>
            </form>
          </div>
        </Paper>
      </Dialog>
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
                {`${oauth.email}` === message.author ?
                  <div>
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
                  </div>
                  : null
                }
                {channel.chanAdmin.includes(`${oauth.email}`) && message.author !== `${oauth.email}` ?
                  <div>
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
                    </div>
                  </div>
                  : null
                }
                <p>
                  <span>{message.author}</span>
                  {' - '}
                  <span>{dayjs.unix(parseInt(message.creation) / 1000000).format('LLLL')}</span>
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
