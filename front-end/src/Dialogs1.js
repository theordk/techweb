import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Context from './Context'

const useStyles = makeStyles((theme) => ({
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
}));


export function BasicTextFields(props) {
  const classes = useStyles();
  const [channelName, setChannelName] = React.useState('')
  const [friendsList, setFriendsList] = React.useState('')
  const {
    oauth, setChannels
  } = React.useContext(Context)

  const handleSubmit = async (e) => {
    let listWithoutSpaces = friendsList.replace(/ /g,'')
    const finalFriendsList = listWithoutSpaces.split(',')
    finalFriendsList.push(`${oauth.email}`)
    props.onChange(e.target.value)
    if (channelName != '') {
      e.preventDefault()
      await axios.post(`http://localhost:3001/channels/`, {
        name: `${channelName}`,
        list: `${finalFriendsList}`
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
    <div className={classes.root}>
      <span><h2>Welcome on the channel creation form</h2></span>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Box className={classes.root}>
          <TextField required id="channelName" name="Channel name" variant="outlined" label="Channel name" onChange={(event) => setChannelName(event.target.value)} />
        </Box>
        <Box className={classes.root}>
          <TextField  id="addFriends" name="Add Friends" variant="outlined" label="Add Friends" onChange={(event) => setFriendsList(event.target.value)} />
        </Box>
        <Box className={classes.root}>
          <Button type="submit" style={{ justifyContent: 'center' }}>Valider</Button>
        </Box>
      </form>
    </div>
  );
}

