import { } from 'react';
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
import {BasicTextFields} from './Dialogs1.js'

const particuleParams = {
  background: {
    "particles": {
      "number": {
        "value": 40,
        "density": {
          "enable": true,
          "value_area": 800,
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
    height:'100%',
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
          <BasicTextFields openSettings={openSettings} onChange={handleCloseSettings} />
            
          </Dialog>
          <Dialog open={openFriends} onClose={handleCloseFriends} css={styles.icon}>
            <Button>
              Friends
            </Button>
          </Dialog>
          <Dialog open={openSettings} onClose={handleCloseSettings} css={styles.dialog}>
          <Button>
              Settings
            </Button>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
