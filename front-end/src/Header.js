import './App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChatIcon from '@material-ui/icons/Chat';

/* const styles = {
  header: {
    height: '60px',
    backgroundColor: 'rgba(255,255,255,.3)',
    flexShrink: 0,
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
} */

const useStyles = makeStyles({
  titleStyles: {
    color: "white",
    fontSize: "40px",
    //backgroundColor: "#303030",
    //borderRadius: '10px'
  }
});

export default () => {
  const classes = useStyles();
  return (
    <Typography  className={classes.titleStyles} align="center">
      Welcome on MyChat <ChatIcon fontSize="large"/>
    </Typography>  
  );
}

