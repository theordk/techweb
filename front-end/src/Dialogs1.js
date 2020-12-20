import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import Avatar from 'react-avatar';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import BackupIcon from '@material-ui/icons/Backup';
import Dialog from '@material-ui/core/Dialog';
// Local
import Context from './Context'
import AvatarPic1 from './pics/1.jpeg'
import AvatarPic2 from './pics/2.jpg'
import AvatarPic3 from './pics/3.jpg'
import AvatarPic4 from './pics/4.jpg'
import AvatarPic5 from './pics/5.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: '3px',
    //width:'18%',
    margin: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(1),
      width: '25vh',
    },
  },
  paperstyleChannel: {
    background: theme.palette.primary.main,
    /* borderRadius: '10px', */
    border: "1px solid white",
    textAlign: "center",
    padding: '20px',
    fontSize: '150%',
    fontWeight: "bold",
    color: "white",
  },
  paperstyleProfile: {
    background: theme.palette.primary.main,
    border: "1px solid white",
    float: "left",
    padding: '20px',
    fontSize: '150%',
    fontWeight: "bold",
    color: "white",
  },
  title: {
    textAlign: "center",
    marginBottom: '15px',
    fontSize: '100%',
    fontWeight: "bold",
    color: "white",
  },
  input: {
    color: "white"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  gravatar: {
    round: "true",
    size: '30px'
  }
}));

const useStylesBis = (theme) => ({
  root: {
    flex: '1 1 auto',
    background: theme.palette.secondary.main,
    /* backgroundColor: '#1C7EB8', */
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div': {
      margin: `${theme.spacing(2)}`,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    '& fieldset': {
      border: 'none',
      '& label': {
        marginBottom: theme.spacing(0.5),
        display: 'block',
      },
    },
  },
  margin: {
    marginLeft: '50px',
    marginRight: '50px',
    marginBottom: '20px',
    marginTop: '20px',
  },
  avatars: {
    margin: 5
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

const helperTextStyles = makeStyles(theme => ({
  root: {
    margin: 4,
    color: "white"
  },
  error: {
    "&.MuiFormHelperText-root.Mui-error": {
      color: "white"
    }
  }
}));

function randomColor() {
  let hex = Math.floor(Math.random() * 0xFFFFFF);
  let color = "#" + hex.toString(16);
  return color;
}

export function ChannelModal(props) {
  const classes = useStyles();
  const styles = useStylesBis(useTheme())
  const helperTestClasses = helperTextStyles();
  const [channelName, setChannelName] = React.useState('')
  const [friendsList, setFriendsList] = React.useState('')
  const {
    oauth, setChannels, setChosenAv, chosenAv
  } = React.useContext(Context)
  const chanAdmin = [`${oauth.email}`]
  const handleSubmit = async (e) => {
    let listWithoutSpaces = friendsList.replace(/ /g, '')
    const finalFriendsList = listWithoutSpaces.split(',')
    finalFriendsList.push(`${oauth.email}`)
    props.onChange(e.target.value)
    if (channelName != '') {
      e.preventDefault()
      await axios.post(`http://localhost:3001/channels/`, {
        name: `${channelName}`,
        list: `${finalFriendsList}`, chanAdmin: `${chanAdmin}`
      }, {
        headers: {
          'Authorization': `Bearer ${oauth.access_token}`
        },
      }
      ).then(function (response) {
      })
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
    else {
      e.preventDefault()
      alert("Please ")
    }
  }

  return (
    <Paper className={classes.paperstyleChannel}>
      <Typography className={classes.title}>Create a new channel</Typography>
      <div css={styles.margin}>
        <form className={classes.container} autoComplete="off" onSubmit={handleSubmit}>
          <Box className={classes.root}>
            <CssTextField
              className={classes.margin}
              label="Name Channel"
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
              onChange={(event) => setChannelName(event.target.value)}
            />
          </Box>
          <Box className={classes.root}>
            <CssTextField
              className={classes.margin}
              label="Add Friends"
              variant="outlined"
              id="custom-css-outlined-input"
              color="inherit"
              helperText="Seperate friends email by , "
              InputProps={{
                classes: {
                  input: classes.input,
                },
                inputMode: "numeric"
              }}
              InputLabelProps={{
                style: { color: '#fff' },
              }}
              FormHelperTextProps={{ classes: helperTestClasses }}
              onChange={(event) => setFriendsList(event.target.value)}
            />
            <Typography variant="subtitle1"></Typography>
          </Box>
          <Box className={classes.root}>
            <Button type="submit" color="inherit">Validate</Button>
          </Box>
        </form>
      </div>
    </Paper>
  );
};

export function ManageAccount(props) {
  const classes = useStyles();
  const styles = useStylesBis(useTheme())
  const [open, setOpen] = React.useState(false);
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [chooseAvatar, setChooseAvatar] = React.useState(false);
  const {
    oauth, setChannels, chosenAv
  } = React.useContext(Context);

  const changeSrc = (data) => {
    console.log(typeof (change))
    props.change(data)

  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickOpenChooseAvatar = () => {
    setChooseAvatar(true);
  };
  const handleClickCloseChooseAvatar = () => {
    setChooseAvatar(false);
  };

  return (
    <Paper className={classes.paperstyleProfile}>
      <Typography className={classes.title}>Manage Account</Typography>
      <div css={styles.margin}>
        <form className={classes.container} autoComplete="off" /* onSubmit={handleSubmit} */>
          {auth && (
            <div>
              <Typography onClick={handleClose}>
                Email :
                      {
                  oauth ?
                    <span>
                      {' ' + oauth.email}
                    </span>
                    :
                    <span>new user</span>
                }
              </Typography> <br></br>
              <Typography onClick={handleClose}>
                Avatar :
                      {
                  oauth ?
                    <span>
                      <Avatar
                        /* src={props.imgSrc} */
                        email={oauth.email}
                        size="80"
                        round={true}
                        style={{
                          marginLeft: 15
                        }}
                      />
                    </span>
                    :
                    <Avatar
                      size={60}
                      round={true}
                      style={{
                        backgroundColor: randomColor()
                      }}
                    >
                    </Avatar>
                }
                <IconButton
                  aria-label="upload"
                  color="inherit"
                  onClick={() => handleClickOpenChooseAvatar()}
                >
                  <BackupIcon />
                </IconButton>
                Upload another Avatar
              </Typography>
              <Dialog open={chooseAvatar} onClose={handleClickCloseChooseAvatar} css={styles.dialog}>
                <ManageAvatar changeSrc={changeSrc} onChange={handleClickCloseChooseAvatar} />
              </Dialog>
            </div>
          )}
        </form>
      </div>
    </Paper>
  );
}

export function ManageAvatar(props) {
  const classes = useStyles();
  const styles = useStylesBis(useTheme())
  const [open, setOpen] = React.useState(false);
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [chooseAvatar, setChooseAvatar] = React.useState(false);
  const {
    oauth, setChannels, setChosenAv
  } = React.useContext(Context);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickOpenChooseAvatar = () => {
    setChooseAvatar(true);
  };
  const handleClickCloseChooseAvatar = (avatar, nb) => {


    const av = `${avatar}`
    //props.changeSrc(`${av}`)
    axios.put(`http://localhost:3001/users/${oauth.email}`, {
      gravatar: `${av}`,
    })


  };

  return (
    <Paper className={classes.paperstyleProfile}>
      <Typography className={classes.title}>Choose an avatar</Typography>
      <div css={styles.avatars}>
        <Box>
          <Avatar size="60" name="A" src={AvatarPic1} round={true} style={{ margin: 15 }} />
          <Button color="inherit" onClick={() => handleClickCloseChooseAvatar({ AvatarPic1 }, 1)}>Select</Button>
        </Box>
        <Box>
          <Avatar size="60" name="B" src={AvatarPic2} round={true} style={{ margin: 15 }} />
          <Button color="inherit" onClick={() => handleClickCloseChooseAvatar({ AvatarPic2 }, 2)}>Select</Button>
        </Box>
        <Box>
          <Avatar size="60" name="A" src={AvatarPic3} round={true} style={{ margin: 15 }} />
          <Button color="inherit" onClick={() => handleClickCloseChooseAvatar(AvatarPic3, 3)}>Select</Button>
        </Box>
        <Box>
          <Avatar size="60" name="A" src={AvatarPic4} round={true} style={{ margin: 15 }} />
          <Button color="inherit" onClick={() => handleClickCloseChooseAvatar({ AvatarPic4 }, 4)}>Select</Button>
        </Box>
        <Box>
          <Avatar size="60" name="A" src={AvatarPic5} round={true} style={{ margin: 15 }} />
          <Button color="inherit" onClick={() => handleClickCloseChooseAvatar({ AvatarPic5 }, 5)}>Select</Button>
        </Box>
      </div>
    </Paper>
  );
}