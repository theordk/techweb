import { useEffect } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { duration, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Context from './Context'
import Typography from '@material-ui/core/Typography';
import { ReactComponent as ChannelIcon } from './icons/channel.svg';
import { ReactComponent as FriendsIcon } from './icons/friends.svg';
import { ReactComponent as SettingsIcon } from './icons/settings.svg';
import { makeStyles } from '@material-ui/core/styles';
import users from './icons/users.png';
import message from './icons/message.png';
import { Particles } from 'react-particles-js';
import React from 'react';
import { useContext } from 'react'
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import { ChannelModal, ManageAccount } from './Dialogs1.js';
/* import Bail from './Latest' */

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
    //maxWidth: '36ch',
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
    /* position: 'relative',
    justifyContent: 'center',
    zIndex: '4', */
    textAlign: "center",
    fontWeight: "bold",
    fontSize: '150%'
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
  const styles = useStyles(useTheme())
  const styles2 = useStyles2(useTheme())
  const [openChannel, setOpenChannel] = React.useState(false)
  const [openFriends, setOpenFriends] = React.useState(false)
  const [openSettings, setOpenSettings] = React.useState(false)
  const [channelsNames2, setChannelsNames2] = React.useState([])
  const [channelsIds2, setChannelsIds2] = React.useState([])
  const [lastMessageContent2, setLastMessageContent2] = React.useState([])
  const [lastMessageAuthor2, setLastMessageAuthor2] = React.useState([])

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
        const channelsNames = []
        const channelsIds = []
      const lastMessageContent = []
        const lastMessageAuthor = []
          
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
    
          channelsIds.forEach(async (element) => {
              const { data: message } = await axios.request(`http://localhost:3001/channels/${element}/messages`)
              if (message.length === 0) {
                  lastMessageContent.push(" - No messages yet")
                  lastMessageAuthor.push("Nobody talked yet")
              }
              message.forEach((el, i, message) => {
                  if (i === message.length - 1) {
                      if (el.content.length >= 47) lastMessageContent.push(" - " + el.content.substring(0, 47) + "...")
                      else lastMessageContent.push(" - " + el.content)
                      let auth = el.author.split('@')[0]
                      if (auth.legnth >= 16) lastMessageAuthor.push(auth.substring(0, 13) + "...")
                      else lastMessageAuthor.push(auth)
                  }
              })
          })
          console.log(lastMessageContent)
          setChannelsNames2(channelsNames)
          setChannelsIds2(channelsIds)
          setLastMessageAuthor2(lastMessageAuthor)
          setLastMessageContent2(lastMessageContent)
    }
    fetchLatest();
  }, []);
  
        
  

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
            <ManageAccount onChange={handleCloseSettings} />
          </Dialog>
        </div>
      </div>
      <div css={styles.card} >
        <List className={styles2.root}>
          <Typography color="inherit" className={styles2.title}>
            Latest Messages
        </Typography>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={styles2.inline}
                    color="textPrimary"
                  >
                    Ali Connors
              </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
        <p>
          {console.log(lastMessageContent2)}
        </p>
      </div>
    </div>

  );
}
