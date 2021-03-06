import { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import React from 'react';
import { useContext } from 'react'
import { Particles } from 'react-particles-js';
import CryptoJS from 'crypto-js'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Local
import { ChannelModal, ManageAccount } from './Dialogs1.js';
import Context from './Context'
import users from './icons/users.png';
import message from './icons/message.png';
import { ReactComponent as ChannelIcon } from './icons/channel.svg';
import { ReactComponent as FriendsIcon } from './icons/friends.svg';
import { ReactComponent as SettingsIcon } from './icons/settings.svg';
// Layout
import { useTheme, makeStyles, Button, Typography, Dialog, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
// Avatars
import AvatarPic1 from './pics/1.jpeg'
import AvatarPic2 from './pics/2.jpg'
import AvatarPic3 from './pics/3.jpg'
import AvatarPic4 from './pics/4.jpg'
import AvatarPic5 from './pics/5.jpg'

const particuleParams = {
  background: {
    "particles": {
      "number": {
        "value": 40,
        "density": {
          "enable": true,
          "value_area": 650,
        }
      },
      "line_linked": {
        "enable": false,
        "opacity": "0.5"
      },
      "move": {
        "speed": 1,
        "out_mode": "out"
      },
      "shape": {
        "type": [
          "images",
        ],
        "images": [
          {
            "src": users,
            "height": 20,
            "width": 23
          },
          {
            "src": message,
            "height": 20,
            "width": 23
          }
        ]
      },
      "color": {
        "value": "#CCC"
      },
      "size": {
        "value": 30,
        "random": false,
        "anim": {
          "enable": true,
          "speed": 4,
          "size_min": 10,
          "sync": false
        }
      },
      "event": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        }
      }
    },
    "retina_detect": false
  }
}

const useStyles2 = makeStyles((theme) => ({
  container: {
    marginLeft: '1%',
    marginTop: '2%',
    marginBottom: '2%',
    position: 'abosulte',
    float: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  root: {
    width: '100%',
    minWidth: '50ch',
    height: '60%',
    marginTop: '20%',
    marginLeft: '45%',
    borderRadius: '5px',
    maxHeight: '60%',
    overflow: 'scroll',
    backgroundColor: theme.palette.secondary.dark,
  },
  inline: {
    display: 'inline',
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: '150%'
  },
  listItem: {
    '&:hover': {
      background: 'rgba(255,255,255,.05)',
    },
  }
}))

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    background: 'linear-gradient(to bottom, #4A94C3, #187CB7)',
  },
  particles: {
    zIndex: '1',
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  card: {
    position: 'relative',
    zIndex: '2',
    textAlign: 'center',
    float: 'left',
  },
  icon: {
    position: 'relative',
    zIndex: '3',
    fill: '122A42',
    opacity: "5",
    height: '100%',
    width: '100%'
  },
  title: {
    position: 'relative',
    justifyContent: 'center',
    zIndex: '4',
  },
  dialog: {
    height: '100%',
    width: '100%'
  }
})

export default () => {
  const {
    oauth
  } = useContext(Context)
  const history = useHistory();
  const styles = useStyles(useTheme())
  const styles2 = useStyles2(useTheme())
  const [openChannel, setOpenChannel] = React.useState(false)
  const [openFriends, setOpenFriends] = React.useState(false)
  const [openSettings, setOpenSettings] = React.useState(false)
  const [latestMessages, setLastMessages] = React.useState([])

  const handleClickOpenChannel = () => {
    setOpenChannel(true);
  };
  const handleCloseChannel = () => {
    setOpenChannel(false);
  };
  const handleClickOpenFriends = () => {
    setOpenFriends(true);
  };

  const handleCloseFriends = () => {
    setOpenFriends(false);
  };
  const handleClickOpenSettings = () => {
    setOpenSettings(true);
  };
  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  useEffect(() => {
    async function fetchLatest() {
      var channelsNames = []
      var channelsIds = []
      const lastMessageContent = []
      const lastMessageAuthor = []

      const md5 = CryptoJS.MD5(`${oauth.email}`)
      try{
          await axios.get(`https://www.gravatar.com/avatar/${md5}?d=404`).then(() => {
          setimgSrc(`https://www.gravatar.com/avatar/${md5}?d=404`)
          axios.put(`http://localhost:3001/users/${oauth.email}`, {
           gravatar: `https://www.gravatar.com/avatar/${md5}?d=404`,
       })
         })
      }catch (error) {
       /* try{
          const {data: gravatar } = axios.get(`http://localhost:3001/users/${oauth.email}`)
          setimgSrc(gravatar.gravatar)
        }catch (error){
          await axios.put(`http://localhost:3001/users/${oauth.email}`, {
          gravatar: ``,
      })
      setimgSrc('')
        } */
      }

      const { data: channels } = await axios.get('http://localhost:3001/channels', {
        headers: {
          'Authorization': `Bearer ${oauth.access_token}`
        },
        params: {
          user: `${oauth.email}`
        },
      })
      channels.forEach(element => {
        channelsNames.push(element.name)
        channelsIds.push(element.id)
      });

      for (let y = 0; y < channelsIds.length; y++) {
        const { data: message } = await axios.request(`http://localhost:3001/channels/${channelsIds[y]}/messages`)
        if (message.length === 0) {
          lastMessageContent.push(" - No messages yet")
          lastMessageAuthor.push("Nobody talked yet")
        }
        else {
          for (let i = 0; i < message.length; i++) {
            if (i === message.length - 1) {
              if (message[i].content.length >= 47) lastMessageContent.push(" - " + message[i].content.substring(0, 47) + "...")
              else lastMessageContent.push(" - " + message[i].content)
              let auth = message[i].author.split('@')[0]
              if (auth.legnth >= 16) lastMessageAuthor.push(auth.substring(0, 13) + "...")
              else lastMessageAuthor.push(auth)
            }
          }
        }
      }
      const finalArray = []
      for (let i = 0; i < channelsIds.length; i++) {
        var message = {
          channelId: channelsIds[i],
          channelName: channelsNames[i],
          content: lastMessageContent[i],
          author: lastMessageAuthor[i]
        }
        finalArray.push(message)
      }
      setLastMessages(finalArray)
    }
    fetchLatest();
  }, []);

  const [imgSrc, setimgSrc] = React.useState('')
  const change = (data) => {
    setimgSrc(data)
  }

  return (
    <div css={styles.root}>
      <Particles css={styles.particles} params={particuleParams.background} />
      <div className={styles2.container}>
        <div css={styles.card}>
          <Button onClick={handleClickOpenChannel}>
            <ChannelIcon css={styles.icon} /><br />
            <Typography color="textPrimary" >
              Create Channel
            </Typography>
          </Button>
        </div>
        <div css={styles.card} >
          <Button onClick={handleClickOpenFriends}>
            <FriendsIcon css={styles.icon} />
            <Typography color="textPrimary">
              Invite friends
            </Typography>
          </Button>
        </div>
        <div css={styles.card}>
          <Button onClick={handleClickOpenSettings}>
            <SettingsIcon css={styles.icon} />
            <Typography color="textPrimary">
              Manage Account
            </Typography>
          </Button>
          <Dialog open={openChannel} onClose={handleCloseChannel} css={styles.icon}>
            <ChannelModal onChange={handleCloseChannel} />
          </Dialog>
          <Dialog open={openFriends} onClose={handleCloseFriends} css={styles.icon}>
            <Button>
              Friends
            </Button>
          </Dialog>
          <Dialog open={openSettings} onClose={handleCloseSettings} css={styles.dialog}>
            <ManageAccount onChange={handleCloseSettings} change={change} imgSrc={imgSrc} />
          </Dialog>
        </div>
      </div>
      <div css={styles.card} >
        <List className={styles2.root}>
          <Typography color="inherit" className={styles2.title}>
            Latest Messages
        </Typography>
          {latestMessages.map((message, i) => {
            return (
              <div>
                <ListItem key={i} className={styles2.listItem} alignItems="flex-start"
                  onClick={(e) => {
                    e.preventDefault()
                    history.push(`/channels/${message.channelId}`)
                  }}>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText key={i}
                    primary={message.channelName}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={styles2.inline}
                          color="textPrimary"
                        >
                          {message.author}
                        </Typography>
                        {message.content}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            )
          })}
        </List>
      </div>
    </div>
  );
}
