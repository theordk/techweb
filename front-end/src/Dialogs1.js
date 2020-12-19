import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Avatar, Button, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Context from './Context'
import { useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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

export function ChannelModal(props) {
  const classes = useStyles();
  const styles = useStylesBis(useTheme())
  const helperTestClasses = helperTextStyles();
  const [channelName, setChannelName] = React.useState('')
  const [friendsList, setFriendsList] = React.useState('')
  const {
    oauth, setChannels
  } = React.useContext(Context)

  const handleSubmit = async (e) => {
    let listWithoutSpaces = friendsList.replace(/ /g, '')
    const finalFriendsList = listWithoutSpaces.split(',')
    finalFriendsList.push(`${oauth.email}`)
    props.onChange(e.target.value)
    if (channelName != '') {
      e.preventDefault()
      await axios.post(`http://localhost:3001/channels/`, {
        name: `${channelName}`,
        list: `${finalFriendsList}`, chanAdmin: `${oauth.email}`
      }, {
        headers: {
          'Authorization': `Bearer ${oauth.access_token}`
        },
      }
      ).then(function (response) {
        console.log(response);
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


export function Profile(props) {
  const classes = useStyles();
  const styles = useStylesBis(useTheme())
  const [open, setOpen] = React.useState(false);
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    oauth, setChannels
  } = React.useContext(Context)

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  return (
    <Paper className={classes.paperstyleProfile}>
      <Typography className={classes.title}>My Profile</Typography>
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
                Avatar
                      <Avatar
                  size={64}
                  icon="user"
                >
                </Avatar>
                <div>
                  <button type="button" onClick={handleOpenModal}>
                    react-transition-group
                  </button>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleCloseModal}
                    onOk={handleOk}
                    /* onCancel={handleCancel} */
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <div className={classes.paper}>
                        <h2 id="transition-modal-title">Transition modal</h2>
                        <p id="transition-modal-description">react-transition-group animates me.</p>
                      </div>
                    </Fade>
                  </Modal>
                </div>
              </Typography>
            </div>
          )}
        </form>
      </div>
    </Paper>
  );
}