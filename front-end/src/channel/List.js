import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState, useContext } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
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
    marginLeft: '1%',
    //position: "fixed" ,
    
  },
  list: {
    /* position: 'absolute' */
  }
})

export default forwardRef(({
  channel,
  messages,
  onScrollDown,
  fetchMessages
}, ref) => {
  const [newMessage, setNewMessage] = useState("Ttete")
  const [openUpdate, setOpenUpdate] = useState({})

  const handleClickOpenUpdate = (i) => {
    setOpenUpdate(prev => Boolean(!prev[i]) ? {...prev, [i]:true} : {...prev, [i]: false})
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
                  <button onClick={() => deleteMessage(message.creation, message.channelId)}>Delete message</button>
                  <button onClick={() => handleClickOpenUpdate(i) }>Change message</button>
                  <Dialog open={openUpdate[i]} onClose={(i) => handleCloseUpdate} css={styles.icon}>
                    <form autoComplete="off" onSubmit={() => handleSubmit(message.creation, message.channelId)}>
                      <input type="text" label="Change your message" onChange={(event) => setNewMessage(event.target.value)} />
                      <button type="button" onClick={handleCloseUpdate}>Cancel</button>
                      <button type="submit">update message</button>
                    </form>
                  </Dialog>
                </div>
                : null
              }
              <p>
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
