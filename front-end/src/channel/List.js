import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState, useContext } from 'react'
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
import axios from 'axios';
import Context from './../Context'
import Dialog from '@material-ui/core/Dialog';
dayjs.extend(calendar)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  calendar: {
    sameElse: 'DD/MM/YYYY hh:mm A'
  }
})

const useStylesBis = makeStyles((theme) => ({
  root: {
    alignContent: 'center',
    alignItems: 'center',
    //width:'18%',
    margin: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(1),
      width: '25vh',
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
<<<<<<< HEAD
  title: {
    marginLeft: '1%',
    //position: "fixed" ,
    
  },
  list: {
    /* position: 'absolute' */
=======
  /*   title: {
      marginLeft: '10px',
      position: "fixed",
    },
    list: {
      marginTop: '70px'
    } */
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
>>>>>>> f4674d6eea72003a07945849397427e9381b18f7
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
  const [newMessage, setNewMessage] = useState("Ttete")
  const [openUpdate, setOpenUpdate] = useState({})

  const handleClickOpenUpdate = (i) => {
    setOpenUpdate(prev => Boolean(!prev[i]) ? { ...prev, [i]: true } : { ...prev, [i]: false })
  }
  const handleCloseUpdate = () => {

    setOpenUpdate(false)
  };
  const handleSubmit = async (creation, channelId) => {
    console.log(creation)
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
    console.log(creation)
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
  const { oauth } = useContext(Context)
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
<<<<<<< HEAD
                    <form autoComplete="off" onSubmit={() => handleSubmit(message.creation, message.channelId)}>
                      <input type="text" label="Change your message" onChange={(event) => setNewMessage(event.target.value)} />
                      <button type="button" onClick={handleCloseUpdate}>Cancel</button>
                      <button type="submit">update message</button>
                    </form>
=======
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
>>>>>>> f4674d6eea72003a07945849397427e9381b18f7
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
                <span>{dayjs().calendar(message.creation)}</span>
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
